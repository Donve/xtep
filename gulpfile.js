var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');

gulp.task('js',function(){
	gulp.src('./src/js/*.js').pipe(concat('.min')).pipe(uglify())
	gulp.dest('./dist/js')
})
gulp.task('sass',function(){
	gulp.src('./src/sass/*.scss').pipe(sass()).pipe(concat('.min')).pipe(cssnano())
	gulp.dest('./dist/css')
})
gulp.task('img',function(){
	gulp.src('./src/img/*.*').pipe(imagemin())
	gulp.dest('./dist/img')
})
gulp.task('default',function(){
	gulp.watch('./src/js/*.js',['js'])
	gulp.watch('./src/sass/*.scss',['sass'])
})