var srcFiles = './app/'
var distFiles = './dist/'

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sequence = require('gulp-sequence'),
    browserSync = require('browser-sync').create()

gulp.task('sass', function(){
    return gulp.src(srcFiles + '**/*.scss')
        .pipe(sass().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest('./dist/'))
})

gulp.task('html',function(){
    return gulp.src(srcFiles + '**/*.html')
        .pipe(gulp.dest(distFiles));
})

gulp.task('javascript', function(){
    return gulp.src(srcFiles + '**/*.js')
        .pipe(gulp.dest(distFiles))
})

gulp.task('css', function(){
    return gulp.src(srcFiles + '**/*.css')
        .pipe(gulp.dest(distFiles))
})

gulp.task('all',function(){
    return gulp.src(srcFiles + '**/!(*.html | *.js | *.css | *.scss)')
})

gulp.task('serve', function(){
    browserSync.init({
        host:'localhost',
        server:distFiles,
        open:false
    })

    sequence(['sass','css','html','javascript'],'all', function(){
        gulp.watch(srcFiles + '**/*').on('change', function(){
            sequence(['sass','css','html','javascript'],'all', function(){
                browserSync.reload();
            })
        })
    })
})

gulp.task('build', function(){
    sequence(['sass','css','html','javascript'],'all')
})