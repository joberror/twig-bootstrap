
# Twig Bootstrap 🛩

Get up to speed with a new Twig web development project

 ![Version](https://img.shields.io/github/package-json/v/joberror/twig-bootstrap?color=green) ![License: GNU General Public License (GPL)](https://img.shields.io/github/license/joberror/twig-bootstrap) ![Dev Dependencies](https://img.shields.io/david/dev/joberror/twig-bootstrap?style=flat-square) ![Twitter: @iamjoberror](https://img.shields.io/twitter/follow/iamjoberror?style=social)

## Features

* Extended Twig template
* Twig Auto-loader
* Php Path setup
* Web structure to compliment
  * Development mode
  * Production mode
* Gulp task setup for
  * [Terser](https://github.com/terser/terser) - Minify JS files.
  * [Sass](https://github.com/sass/sass), [CleanCSS](https://github.com/scniro/gulp-clean-css) and [CSS Purge](https://github.com/rbtech/gulp-css-purge) - Process and minify styles.
  * [Gulp image](https://github.com/1000ch/gulp-image) - Minify images and svg.
  * [Browser Sync](https://github.com/BrowserSync/browser-sync) - Sync and auto-reload browser in `Development` mode.
* [Workbox](https://developers.google.com/web/tools/workbox) - Browser cache services.
* Sass Mixins (not activated) - [Family.css](https://lukyvj.github.io/family.scss/), [Sass-Mq](https://github.com/sass-mq/sass-mq), [KF-Sass](https://keyfram.milesalan.com/), [RFS](https://github.com/twbs/rfs), [Brand Colors](https://github.com/reimertz/brand-colors) and custom mixins.
* Custom Javascript ES6 modules.

### Requirements

* Node
* PHP + Composer
* Any of VS Code, PhpStorm, Atom, Sublime, etc.

### Installation

    //shell command

    > git clone https://github.com/joberror/twig-bootstrap.git

    > cd twig-bootstrap

    > npm install

    > composer install

### Getting started

* Search for all **TODO** comments in project files and follow the guidelines
* Folders
  * `template` includes twig templates.
  * `vendor` will include Twig and other packages after `composer install` is initiated.
  * `node-modules` will include all Node packages defined in `package.json` after `npm install` is initiated.
  * `asset-dev` is the `Development` asset folder which will include all assets.
  * `asset-prod` is where all processed assets files will be stored and ready for production.
  * `includes` is the default php include folder. Twig and path setup are located here.
* Inline comments are available as a guide in each file.

### Author

* Website:  [iamjoberror.com](https://iamjoberror.com)
* Twitter:  [@iamjoberror](https://twitter.com/iamjoberror)
* Github:   [@joberror](https://github.com/joberror)
* LinkedIn: [@joberror](https://linkedin.com/in/joberror)

### Show your support

Give a ⭐️ if this project helped you!
