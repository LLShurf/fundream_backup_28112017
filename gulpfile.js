var gulp 				 = require('gulp'),
		sass 				 = require('gulp-sass'),
		browserSync  = require('browser-sync'),
		gutil        = require('gulp-util' ),
		concat 			 = require('gulp-concat'),
		uglify 			 = require('gulp-uglifyjs'),
		cssnano 		 = require('gulp-cssnano'),
		rename 			 = require('gulp-rename'),
		del 				 = require('del'),
		notify       = require("gulp-notify"),
		ftp          = require('vinyl-ftp'),
		rsync        = require('gulp-rsync'),
		cleanCSS     = require('gulp-clean-css'),
		autoprefixer = require('gulp-autoprefixer'),
		imagemin 		 = require('gulp-imagemin'),
		pngquant 		 = require('imagemin-pngquant'),
		cache 			 = require('gulp-cache'),
		gcmq 				 = require('gulp-group-css-media-queries'),
		smartgrid 	 = require('smart-grid');

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

/* It's principal settings in smart grid project */
var settings = {
    outputStyle: 'sass', /* less || scss || sass || styl */
    filename: '_smart-grid',
    columns: 12, /* number of grid columns */
    offset: "30px", /* gutter width px || % */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
    		xl: {
    			'width': '1500px',
    			'fields': '30px'
    		},
        lg: {
            'width': '1100px', /* -> @media (max-width: 1100px) */
            'fields': '30px' /* side fields */
        },
        md: {
            'width': '960px',
            'fields': '15px'
        },
        sm: {
            'width': '780px',
            'fields': '15px'
        },
        xs: {
            'width': '560px',
            'fields': '15px'
        },
        xls: {
            'width': '400px',
            'fields': '15px'
        }
        /* 
        We can create any quantity of break points.

        some_name: {
            some_width: 'Npx',
            some_offset: 'N(px|%)'
        }
        */
    }
};

smartgrid('app/sass/', settings);

gulp.task('group', function () {
    gulp.src('app/css/main.min.css')
        .pipe(gcmq())
        .pipe(gulp.dest('app/css'));
});

gulp.task('jslibs', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/migrate/jquery-migrate-1.2.1.min.js',
		'app/libs/masked-input/dist/jquery.maskedinput.min.js',
		'app/libs/fotorama-4.6.4/fotorama.js',
		'app/libs/slick-1.8.0/slick/slick.min.js',
		'app/js/wow.min.js',
		])
	.pipe(concat('libs.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('csslibs', ['sass'], function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['sync', 'csslibs', 'jslibs'], function(){
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('clearCache', function(){
	return cache.clearAll();
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'jslibs'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess',
		'app/*.php',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/main.min.css',
		'app/css/animate.css',
		'app/css/devmade.css',
		'app/css/fontssheet.css',
		'app/css/libs.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/libs.min.js',
		'app/js/common.js',
		'app/js/formSender.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/css/fonts/**/*',
		]).pipe(gulp.dest('dist/css/fonts'));

	var buildMainFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'bocharni.ftp.ukraine.com.ua',
		user:      'bocharni_ftp',
		password:  'KettaryHunter11',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/bocharnikov.space/www'));

});

gulp.task('deploy_dev', function() {

	var conn = ftp.create({
		host:      'bocharni.ftp.ukraine.com.ua',
		user:      'bocharni_ftp',
		password:  'KettaryHunter11',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/bocharnikov.space/www/_dev'));

});

gulp.task('rsync', function() {
	return gulp.src('dist/**')
	.pipe(rsync({
		root: 'dist/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		archive: true,
		silent: false,
		compress: true
	}));
});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
