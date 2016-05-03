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

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var historyApiFallback = require('connect-history-api-fallback');

var argv = require('yargs').argv;
var env = argv.env ? argv.env : 'dev';
var configSrc   = './env/config.json.' + env;

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
    gulp.src('./src/css/**/*')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulpif(isUglified, uglifycss()))
        .pipe(gulp.dest('./build/css/'))
        .pipe(reload({
            stream: true
        }))
    ;
    gulp.src('./node_modules/bulma/css/bulma.min.css')
        .pipe(gulp.dest('./build/css'))
        .pipe(reload({
            stream: true
        }))
    ;
    gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('./build/css'))
        .pipe(reload({
            stream: true
        }))
    ;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

gulp.task('stylesDebug', function() {
    buildStyle(false);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

gulp.task('stylesLive', function() {
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

gulp.task('webfontJs', function() {
    return gulp.src('./src/js/vendor/google.webfont.js')
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
    return gulp.src('./_redirects')
        .pipe(gulp.dest('./build/'));
});

gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
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
            rewrites: [{
                from: /\/video\/.*/, to: '/index.html',
                from: /\/account\/confirm\/.*/, to: '/index.html'
            }]
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
        transform:  [babelify.configure({ stage : 0 })]
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

gulp.task('debug', ['images', 'stylesDebug', 'clipboardJs', 'webfontJs', 'fonts', 'statics', 'config', 'browser-sync'], function() {
    gutil.log('Gulp is running - debug');
    gutil.log('ENVIRONMENT: ' + env);
    gulp.watch('./src/img/**/*', ['images']);
    gulp.watch('./src/css/**/*', ['stylesDebug']);
    gulp.watch(staticsSrc, ['statics']);
    gulp.watch(configSrc, ['config']);
    return buildScript('wonderland.js', true);
});

gulp.task('live', ['images', 'stylesLive', 'clipboardJs', 'webfontJs', 'fonts', 'statics', 'config', 'redirects'], function() {
    gutil.log('Gulp is running - live');
    gutil.log('ENVIRONMENT: ' + env);
    return buildScript('wonderland.js', false);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
