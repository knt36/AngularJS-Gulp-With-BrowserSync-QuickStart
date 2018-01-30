var srcFiles = './app/'
var distFiles = './dist/'
var node_modules = './node_modules/'

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
        .pipe(gulp.dest('./dist/'));
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

gulp.task('cssNode_Modules', function(){
    return gulp.src(node_modules + '**/*.css')
        .pipe(gulp.dest(node_modules));
})

gulp.task('all',function(){
    return gulp.src(srcFiles + '**/!(*.html | *.js | *.css | *.scss)')
})

gulp.task('serve', function(){
    browserSync.init({
        host:'localhost',
        server: {
            baseDir: distFiles,
            routes:{
                "/node_modules" : "node_modules"
            }
        },
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