// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var sass = require('gulp-sass');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var historyApiFallback = require('connect-history-api-fallback');

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

gulp.task('styles', function() {
    gulp.src('./src/css/**/*')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('./build/css/'))
        .pipe(reload({
            stream: true
        }));
    gulp.src('./node_modules/bulma/css/bulma.min.css')
        .pipe(gulp.dest('./build/css'))
        .pipe(reload({
            stream: true
        }));
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

gulp.task('statics', function() {
    return gulp.src(['./src/**/*.html', './src/robots.txt'])
        .pipe(gulp.dest('./build/'))
        .pipe(reload({
            stream: true
        }));
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

gulp.task('redirects', function() {
    return gulp.src('./_redirects')
        .pipe(gulp.dest('./build/'));
});

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
                from: /\/video\/.*/, to: '/index.html'
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

gulp.task('debug', ['images', 'styles', 'statics', 'browser-sync'], function() {
    gutil.log('Gulp is running - debug');
    gulp.watch('./src/img/**/*', ['images']);
    gulp.watch('./src/css/**/*', ['styles']);
    gulp.watch('./src/**/*.html', ['statics']);
    return buildScript('wonderland.js', true);
});

gulp.task('live', ['images', 'styles', 'statics', 'redirects'], function() {
    gutil.log('Gulp is running - live');
    return buildScript('wonderland.js', false);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
