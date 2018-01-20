var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass')

gulp.task('sass', function(){
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError()))
        .pipe(gulp.dest('./dist/'))
})