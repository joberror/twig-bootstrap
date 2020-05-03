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
    assetsProd = 'assets-prod';

// Minify Scripts using Terser toplevel,drop_console=true,sequences=false,ecma=6.
// All minified scripts goes to: /assets-prod/js/ folder with a .min suffix file name.
let minifyJS = () =>
    gulp.src([assetsDev + '/js/*.js'])
        .pipe(plugins.terserJs({
            compress: {
                toplevel: true,
                ecma: 6,
                // drop_console: true,
                sequences: false
            }
        }))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest(assetsProd + '/js/'));

// Purge CSS using node css-purge modules into the directory: /assets-dev/css/pg/
let cssPurge = () =>
    gulp.src(assetsDev + '/css/*.css')
        .pipe(plugins.cssPurge({
            trim: true,
            shorten: true,
            verbose: true
        }))
        .pipe(gulp.dest(assetsDev + '/css/pg/'));

// Minify Styles using Clean CSS Node.
// All minified scripts goes to: /assets-prod/css/ folder with a .min suffix file name.
let minifyCSS = () =>
    gulp.src(assetsDev + '/css/pg/*.css')
        //.pipe(purgeCSS)
        .pipe(plugins.cleanCss({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize} ~ ${details.stats.minifiedSize}`);
        }))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest(assetsProd + '/css/'));

// Process .scss files in the directory: /assets-dev/scss/ using node Sass modules.
let convertScss = () =>
    gulp.src(assetsDev + '/scss/*.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({fiber: Fiber, errLogToConsole: true}))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(assetsDev + '/css/'));

// Minify images
let minifyImages = () =>
    gulp.src(assetsDev + '/img/*')
        .pipe(plugins.image({
            optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
            pngquant: ['--speed=1', '--force', 256],
            zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
            jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
            mozjpeg: ['-optimize', '-progressive'],
            guetzli: ['--quality', 85]
        }))
        .pipe(gulp.dest(assetsProd + '/img/'));

// Minify SVG in the directory /assets-dev/svg/ and save it to /assets-prod/svg/
let minifySVG = () =>
    gulp.src(assetsDev + '/svg/*.svg')
        .pipe(plugins.image({
            svgo:
                [
                    '--enable', 'cleanupIDs', 'convertShapeToPath',
                    'convertEllipseToCircle', 'removeStyleElement', 'removeDimensions',
                    'mergePaths', 'collapseGroups', 'cleanupListOfValues', 'removeUnusedNS',
                    'removeEmptyContainers'
                ]
        }))
        .pipe(gulp.dest(assetsProd + '/svg/'));

// Set up BrowserSync server
// Reloads the browser after every save on files edit.
let reload = (done) => {
    browserSync.reload();
    done();
};
// Initialise BrowserSync with default config
let serve = (done) => {
    browserSync.init({
        // TODO: Define the proxy host eg:
        // Local development: 'http://localhost/mydev'
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
    gulp.watch(assetsDev + '/scss/**/*', gulp.series(convertScss, cssPurge, minifyCSS, reload));
    // Watch and minify Javascript
    gulp.watch(assetsDev + '/js/*.js', gulp.series(minifyJS, reload));
    // Watch and minify JPG and PNG
    gulp.watch(assetsDev + '/img/*', minifyImages);
    // Watch and minify SVG
    gulp.watch(assetsDev + '/svg/*', minifySVG);
    // Watch Twig files
    gulp.watch('templates/**/*', reload);
    done();
};

exports.watch = watch;
exports.default = gulp.series(serve, exports.watch);