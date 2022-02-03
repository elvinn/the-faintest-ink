import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import del from 'del';

const DEST = 'docs/.vitepress/dist';

function compressImages() {
	return gulp.src('docs/**/*.{png,jpg,jpg,gif}')
		.pipe(imagemin())
		.pipe(gulp.dest(DEST));
};

function copySiteMap() {
	return gulp.src('./sitemap.xml')
		.pipe(gulp.dest(DEST));
}

function clean() {
	return del('**/.DS_Store');
}

export default gulp.parallel(compressImages, copySiteMap, clean);