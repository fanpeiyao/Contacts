var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
 var fse = require('fs-extra');
var connect = require('gulp-connect');


//public clean
gulp.task('clean', function () {
    fse.emptyDirSync('dist');
});

//load assets
gulp.task("assets",function(){
    gulp.src([
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-aria/angular-aria.js',
        'node_modules/angular-material/angular-material.js',
        'node_modules/angular-material/angular-material-mocks.js',
        'node_modules/material-design-lite/material.min.js'
    ])
        .pipe(concat('angular.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
    gulp.src([
        'node_modules/angular-material/*.css',
        'node_modules/material-design-lite/*.css'
    ])
        .pipe(gulp.dest('dist/assets/styles'));

});

//copy files
gulp.task('copy',function(){
    gulp.src('src/server/*.php').pipe(gulp.dest('dist/server'));
    gulp.src('src/server/rescource/*').pipe(gulp.dest('dist/server/rescource'));
    gulp.src('src/resource/*').pipe(gulp.dest('dist/resource'));
    gulp.src('src/resource/images/*').pipe(gulp.dest('dist/resource/images'));
    gulp.src('src/scripts/*').pipe(gulp.dest('dist/scripts'));
    gulp.src('src/style/*').pipe(gulp.dest('dist/style'));
    gulp.src('src/*.html').pipe(gulp.dest('dist'));

});

gulp.task('watch', function () {
    gulp.watch(['src/*.html','src/resource/*','src/server/*','src/scripts/*','src/style/*'], ['copy','reload']);
});
gulp.task('reload',function () {
    gulp.src('dist').pipe(connect.reload())
});
gulp.task('connect',['dev'],function(){
    connect.server({
        root: 'dist',
        livereload:true
    })
});

gulp.task('dev',['clean', 'assets', 'copy']);
gulp.task('build-dev',['connect','watch']);

gulp.task('build',['clean', 'assets', 'copy']);
gulp.task('default',['build']);