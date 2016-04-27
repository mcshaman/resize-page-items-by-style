var gulp = require('gulp'),
	concat = require('gulp-concat'),
	version = require('gulp-version-filename');

gulp.task('default', function() {
	
	return gulp.src([
		'./lib/header.js',
		'./lib/getancestor.js',
		'./lib/getrulerunit.js',
		'./lib/getpageitemsbyobjectstyle.js',
		'./lib/getpageitemsize.js',
		'./lib/setpageitemsize.js',
		'./lib/getunitvalue.js',
		'./lib/layoutinterface.js',
		'./lib/paletteshow.js',
		'./lib/edittextblur.js',
		'./lib/radioclick.js',
		'./lib/resizebuttonclick.js',
		'./lib/addeventlisteners.js',
		'./lib/procedural.js'
		
	])
		.pipe(concat('Resize page items by style.js'))
		.pipe(version())
		.pipe(gulp.dest(''));
	
});