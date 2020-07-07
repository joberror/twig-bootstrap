'use strict';

//Load required node modules
const Fiber = require('fibers');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();

//Sass compiler
plugins.sass.compiler = require('sass');

// Directory Environment
let
    // Asset development directory /assets-dev/
    assetsDev = 'assets-dev',
    // Asset Production directory /assets-prod/
    assetsProd = 'assets-prod',
    // Script source
    SRC_JS_DEV = assetsDev + '/js/*.js',
    DEST_JS_PROD = assetsProd + '/js/',
    // Styles
    SRC_SCSS_DEV = assetsDev + '/scss/*.scss',
    SRC_SCSS_EXT_DEV = assetsDev + '/scss/**/*',
    SRC_CSS_DEV = assetsDev + '/css/*.css',
    DEST_PG_CSS_DEV = assetsDev + '/css/pg/',
    SRC_PG_CSS_DEV = assetsDev + '/css/pg/*.css',
    DEST_CSS_PROD = assetsProd + '/css/',
    // Image and svg
    SRC_IMG_DEV = assetsDev + '/img/*',
    DEST_IMG_PROD = assetsProd + '/img/',
    SRC_SVG_DEV = assetsDev + '/svg/*.svg',
    DEST_SVG_PROD = assetsProd + '/svg/',
    // Template folder
    SRC_TWIG_TPL = 'templates/**/*';


// Minify Scripts using Terser toplevel,drop_console=true,sequences=false,ecma=6.
// All minified scripts goes to: /assets-prod/js/ folder with a .min suffix file name.
let minifyJS = () =>
    gulp.src(SRC_JS_DEV)
    .pipe(plugins.newer(DEST_JS_PROD))
    .pipe(plugins.terserJs({
        compress: {
            toplevel: true,
            ecma: 6,
            // drop_console: true,
            sequences: false
        }
    }))
    .pipe(plugins.rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(DEST_JS_PROD));

// Purge CSS using node css-purge modules into the directory: /assets-dev/css/pg/
let cssPurge = () =>
    gulp.src(SRC_CSS_DEV)
    .pipe(plugins.cssPurge({
        trim: true,
        shorten: true,
        verbose: true
    }))
    .pipe(gulp.dest(DEST_PG_CSS_DEV));

// Minify Styles using Clean CSS Node.
// All minified scripts goes to: /assets-prod/css/ folder with a .min suffix file name.
let minifyCSS = () =>
    gulp.src(SRC_PG_CSS_DEV)
    .pipe(plugins.cleanCss({
        debug: true
    }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize} ~ ${details.stats.minifiedSize}`);
    }))
    .pipe(plugins.rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(DEST_CSS_PROD))
    .pipe(browserSync.stream());

// Process .scss files in the directory: /assets-dev/scss/ using node Sass modules.
let convertScss = () =>
    gulp.src(SRC_SCSS_DEV)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
        fiber: Fiber,
        errLogToConsole: true
    }))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(SRC_CSS_DEV));

// Minify images
let minifyImages = () =>
    gulp.src(SRC_IMG_DEV)
    .pipe(plugins.newer(DEST_IMG_PROD))
    .pipe(plugins.image({
        optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
        pngquant: ['--speed=1', '--force', 256],
        zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
        jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
        mozjpeg: ['-optimize', '-progressive'],
        guetzli: ['--quality', 85]
    }))
    .pipe(gulp.dest(DEST_IMG_PROD));

// Minify SVG in the directory /assets-dev/svg/ and save it to /assets-prod/svg/
let minifySVG = () =>
    gulp.src(SRC_SVG_DEV)
    .pipe(plugins.newer(DEST_SVG_PROD))
    .pipe(plugins.image({
        svgo: [
            '--enable', 'cleanupIDs', 'convertShapeToPath',
            'convertEllipseToCircle', 'removeStyleElement', 'removeDimensions',
            'mergePaths', 'collapseGroups', 'cleanupListOfValues', 'removeUnusedNS',
            'removeEmptyContainers'
        ]
    }))
    .pipe(gulp.dest(DEST_SVG_PROD));

// Set up BrowserSync server
// Reloads the browser after every save on files edit.
let reload = (done) => {
    browserSync.reload();
    done();
};
// Initialize BrowserSync with default config
let serve = (done) => {
    browserSync.init({
        // TODO: Define the web host eg:
        // eg 'http://localhost/myweb' or 'http://myweb.test'
        proxy: ''
    });

    done();
};

// Export all modules
exports.minifyJS = minifyJS;
exports.convertScss = convertScss;
exports.cssPurge = cssPurge;
exports.minifyCSS = minifyCSS;
exports.minifyImages = minifyImages;
exports.minifySVG = minifySVG;

// Watch task and perform routine task
let watch = (done) => {
    // Watch and process CSS
    gulp.watch(SRC_SCSS_EXT_DEV, gulp.series(convertScss, cssPurge, minifyCSS, reload));
    // Watch and minify Javascript
    gulp.watch(SRC_JS_DEV, gulp.series(minifyJS, reload));
    // Watch and minify JPG and PNG
    gulp.watch(SRC_IMG_DEV, minifyImages);
    // Watch and minify SVG
    gulp.watch(SRC_SVG_DEV, minifySVG);
    // Watch Twig files
    gulp.watch(SRC_TWIG_TPL, reload);
    done();
};

exports.watch = watch;
exports.default = gulp.series(serve, exports.watch);