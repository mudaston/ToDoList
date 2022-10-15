const gulp = require('gulp')
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
// const webp = require('gulp-webp');
/*const devip = require('dev-ip');*/



/*gulp.task("imgsWebp", function () {
    return gulp.src("src/img/!**!/!*.{jpg,jpeg,png}")
        // Конвертирует изображение в webp и сжимает его.
        .pipe(webp({
            quality: 100
        }))
        // Выгрузка.
        .pipe(gulp.dest('src/img/compressed'))
});*/

// Static server
gulp.task('server', function() {
    browserSync.init({
        /*proxy: "http://localhost/LearnJavaScriptAndReact/src/",*/
        server: {
            baseDir: "src"
        },
        notify: false/*,
        host: devip()*/
    });
});

const codeStyle = 'scss';

gulp.task('styles', function(){
    return gulp.src(`src/${codeStyle}/**/*.+(scss|sass)`)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer({
            grid: true,
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    gulp.watch(`src/${codeStyle}/**/*.+(scss|sass)`, gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change", browserSync.reload);
    // gulp.watch("src/**/*.php").on("change", browserSync.reload);
    gulp.watch("src/js/*.js").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'/*, 'imgsWebp'*/));

