import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import del from 'del';

function compressImages() {
	return gulp.src('docs/**/*.{png,jpg,jpg,gif}')
		.pipe(imagemin())
		.pipe(gulp.dest('docs/.vitepress/dist'));
};

function clean() {
	return del('**/.DS_Store');
}

export default gulp.parallel(compressImages, clean);