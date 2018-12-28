var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');

gulp.task('js',function(){
	gulp.src('./src/js/*.js')
	//.pipe(uglify())
	.pipe(concat('index.min.js'))
	.pipe(gulp.dest('./dist/js'))
})
gulp.task('sass',function(){
	gulp.src('./src/sass/*.scss')
	.pipe(sass())
	//.pipe(cssnano())
	.pipe(rename({"suffix":".min"}))
	
	.pipe(gulp.dest('./dist/css'))
})
gulp.task('imagemin',function(){
	gulp.src('./src/img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/img'))
})
gulp.task('default',function(){
	gulp.watch('./src/js/*.js',['js'])
	gulp.watch('./src/sass/*.scss',['sass'])
	gulp.watch('./src/img/*',['img'])
	
})