var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var changed = require("gulp-changed");
var imagemin = require("gulp-imagemin");
var sass = require('gulp-sass')(require('sass'));
var minHTML = require('gulp-htmlmin');
var version = require('gulp-version-number');
var copy = require('gulp-copy');

var scripts = {
  dev: {
    javascript: {
      files: [
        "node_modules/@popperjs/core/dist/umd/popper.js",
        "node_modules/bootstrap/dist/js/bootstrap.js",
        "node_modules/moment/min/moment-with-locales.min.js",
        "components/scripts/script.js",
        "components/scripts/addServiceWorker.js"
      ],
      serviceWorker: [
        'components/scripts/service-worker.js'
      ]
    }
  },
  live: {
    javascript: {
      files: [
        "build/develompent/js/scripts.js"
      ],
      serviceWorker: [
        'build/develompent/service-worker.js'
      ]
    }
  }
}

var imgSrc = 'build/develompent/img/**/*';
var imgDest = 'build/productive/img';

var styles = {
  dev: {
    scss: {
      light: [
        'components/scss/light.scss',
        'components/scss/font-lato.scss',
        'components/scss/custom.scss'
      ],
      dark: [
        'components/scss/dark.scss',
        'components/scss/font-lato.scss',
        'components/scss/custom.scss'
      ]
    }
  },
  live: {
    css: {
      light: [
        'build/develompent/css/style.css'
      ],
      dark: [
        'build/develompent/css/style-dark.css'
      ]
    }
  }
}


function bundleJsFiles() {
  return gulp.src(scripts.dev.javascript.files)
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("build/develompent/js"));
}

function createServiceWorker() {
  return gulp.src(scripts.dev.javascript.serviceWorker)
    .pipe(concat("service-worker.js"))
    .pipe(gulp.dest("build/develompent/"));
}

function compileLightScss() {
  return gulp.src(styles.dev.scss.light)
    .pipe(sass())
    .pipe(concat("style.css"))
    .pipe(gulp.dest('build/develompent/css'));
}

function compileDarkScss() {
  return gulp.src(styles.dev.scss.dark)
    .pipe(sass())
    .pipe(concat("style-dark.css"))
    .pipe(gulp.dest('build/develompent/css'));
}

function copyManifestToDev() {
  return gulp.src(['components/manifest/manifest.json'])
    .pipe(copy('build/develompent', {
      prefix: 2
    }))
}

function compressJsFiles() {
  return gulp.src(scripts.live.javascript.files)
    .pipe(uglify())
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("build/productive/js"));
}

function compressServiceWorker() {
  return gulp.src(scripts.live.javascript.serviceWorker)
    .pipe(uglify())
    .pipe(concat("service-worker.js"))
    .pipe(gulp.dest("build/productive/"));
}

function compressLightCss() {
  return gulp.src(styles.live.css.light)
    .pipe(cleanCSS())
    .pipe(concat("style.css"))
    .pipe(gulp.dest('build/productive/css'));
}

function compressDarkCss() {
  return gulp.src(styles.live.css.dark)
    .pipe(cleanCSS())
    .pipe(concat("style-dark.css"))
    .pipe(gulp.dest('build/productive/css'));
}

function compressHTML() {
  return gulp.src('build/develompent/index.html')
    .pipe(minHTML({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build/productive/'));
}

var staticFiles = [
  'build/develompent/manifest.json',
  'build/develompent/favicon.ico',
  'build/develompent/icon.png',
  'build/develompent/tile.png',
  'build/develompent/fonts/*'
];


function copyStaticToLive() {
  return gulp.src(staticFiles)
    .pipe(copy('build/productive', {
      prefix: 2
    }));
}

function compressImages() {
  return gulp.src(imgSrc)
    .pipe(changed(imgDest))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDest));
}

function watch() {
  gulp.watch(scripts.dev.javascript.files, bundleJsFiles);
  gulp.watch(scripts.dev.javascript.serviceWorker, createServiceWorker);
  gulp.watch(styles.dev.scss.light, compileLightScss);
  gulp.watch(styles.dev.scss.dark, compileDarkScss);
}

var dev = gulp.series(gulp.parallel(compileDarkScss, compileLightScss, bundleJsFiles, createServiceWorker, copyManifestToDev));
var live = gulp.series(gulp.parallel(compressJsFiles, compressServiceWorker, compressLightCss, compressDarkCss, compressHTML, compressImages, copyStaticToLive));

exports.watch = watch;
exports.buildDev = dev;
exports.buildLive = live;