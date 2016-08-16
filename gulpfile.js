// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var gulpif = require('gulp-if');
var clean = require('gulp-clean');
var concatCss = require('gulp-concat-css');
var merge = require('merge-stream');
var autoprefixer = require('gulp-autoprefixer');
var jest = require('gulp-jest');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var historyApiFallback = require('connect-history-api-fallback');

var argv = require('yargs').argv;
var env = argv.env ? argv.env : 'dev';
var configSrc   = './env/config.json.' + env;

var redirects_src;
if (env == 'prod') {
    redirects_src = './env/prod/_redirects';
} else if (env == 'stage') {
    redirects_src = './env/stage/_redirects';
} else if (env == 'test') { // testymctestface
    redirects_src = './env/test/_redirects';
} else {
    redirects_src = './env/dev/_redirects';
}

var staticsSrc = ['./src/**/*.html', './src/robots.txt', './src/*.ico'];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
        }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function buildStyle(isUglified) {
    gutil.log('buildStyle');
    var fontAwesomeStream = gulp.src('./node_modules/font-awesome/css/font-awesome.min.css');
    var hintCssStream = gulp.src('./node_modules/hint.css/hint.min.css');
    var sassStream = gulp.src('./src/css/neon/**/*')
        .pipe(sass()) // Using gulp-sass
    ;
    var xxStream = gulp.src('./src/css/xx/**/*')
        .pipe(sass())
    ;
    var mergedStream = merge(fontAwesomeStream,/* sassStream, hintCssStream,*/ xxStream)
    // var mergedStream = merge(fontAwesomeStream, sassStream, hintCssStream, xxStream)
        .pipe(concatCss('wonderland.css', {
            rebaseUrls: false
        }))
        .pipe(gulpif(isUglified, uglifycss({
            uglyComments: true
        })))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1% in US']
        }))
        .pipe(gulp.dest('./build/css/'))
        .pipe(reload({
            stream: true
        }))
    ;
    return mergedStream;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

gulp.task('stylesDebug', function() {
    gutil.log('stylesDebug');
    buildStyle(false);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

gulp.task('stylesLive', function() {
    gutil.log('stylesLive');
    buildStyle(true);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

gulp.task('statics', function() {
    return gulp.src(staticsSrc)
        .pipe(gulp.dest('./build/'))
        .pipe(reload({
            stream: true
        }));
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

gulp.task('clipboardJs', function() {
    return gulp.src('./node_modules/clipboard/dist/clipboard.min.js')
        .pipe(gulp.dest('./build/js/'))
        .pipe(reload({
            stream: true
        }));
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

gulp.task('config',['clean:config'] ,function() {
    return gulp.src(configSrc)
        .pipe(rename('config.json'))
        .pipe(gulp.dest('./env'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('clean:config', function() {
      return gulp.src('./env/config.json', {read: false})
        .pipe(clean());
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

gulp.task('redirects', function() {
    return gulp.src(redirects_src)
        .pipe(gulp.dest('./build/'));
});

gulp.task('fonts', function() {
    var fontAwesome = gulp.src('node_modules/font-awesome/fonts/*');

    var fonts = gulp.src('./src/fonts/*');

    return merge(fontAwesome, fonts)
        .pipe(gulp.dest('./build/fonts/'));
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

gulp.task('images', function() {
    gulp.src('./src/img/**')
        .pipe(gulp.dest('./build/img/'))
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./build/"
        },
        middleware: [historyApiFallback({
            // https://github.com/bripkens/connect-history-api-fallback#rewrites
            rewrites: [
                {
                    from: /\/video\/.*/,
                    to: '/index.html'
                },
                {
                    from: /\/account\/confirm\/.*/,
                    to: '/index.html'
                },
                {
                    from: /\/user\/reset\/token\/.*/,
                    to: '/index.html'
                },
                {
                    from: /\/share\/.*/,
                    to: '/index.html'
                }
            ]
        })],
        ghostMode: false
    });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function buildScript(file, watch) {

    var props = {
        entries: ['./src/js/' + file],
        debug : true,
        cache: {},
        packageCache: {},
        transform: [
            babelify.configure({
                compact: true,
                presets : ['es2015', 'react', 'stage-0']
            })
        ]
    };

    // watchify() if watch requested, otherwise run browserify() once
    var bundler = watch ? watchify(browserify(props)) : browserify(props);

    function rebundle() {
        var stream = bundler.bundle();
        return stream
            .on('error', handleErrors)
            .pipe(source(file))
            .pipe(buffer())
            .pipe(gulpif(!watch, uglify()))
            .pipe(gulp.dest('./build/js/'))
            .pipe(reload({ stream: true }))
    }

    // listen for an update and run rebundle
    bundler.on('update', function() {
        rebundle();
        gutil.log('Rebundle...');
    });

    // run it once the first time buildScript is called
    return rebundle();
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

gulp.task('default', null, function() {
    gutil.log('Gulp is running - default');
    gutil.log('Please use debug OR live.');
});

gulp.task('debug', ['images', 'stylesDebug', 'clipboardJs', 'fonts', 'statics', 'config', 'browser-sync'], function() {
    gutil.log('Gulp is running - debug');
    gutil.log('ENVIRONMENT: ' + env);
    gulp.watch('./src/img/**/*', ['images']);
    gulp.watch('./src/css/**/*', ['stylesDebug']);
    gulp.watch(staticsSrc, ['statics']);
    gulp.watch(configSrc, ['config']);
    return buildScript('wonderland.js', true);
});

gulp.task('live', ['images', 'stylesLive', 'clipboardJs', 'fonts', 'statics', 'config', 'redirects'], function() {
    gutil.log('Gulp is running - live');
    gutil.log('ENVIRONMENT: ' + env);
    return buildScript('wonderland.js', false);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/* TODO: Get this to work. For now, runnings tests can be done by: npm test

gulp.task('jest', function() {
    return gulp.src('__tests__').pipe(jest({
        unmockedModulePathPatterns: [
            "node_modules/react"
        ],
        testDirectoryName: "spec",
        testPathIgnorePatterns: [
            "node_modules"
        ],
        moduleFileExtensions: [
            "js",
            "json",
            "react"
        ]
    }));
});
*/
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
