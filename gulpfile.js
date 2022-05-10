const { src, dest, series, watch } = require(`gulp`),
browserSync = require('browser-sync'),
htmlValidator = require('gulp-html'),
htmlCompressor = require('gulp-htmlmin'),
cssCleaner = require ('gulp-clean-css'),
jsCompressor = require('gulp-uglify'),
babel = require('gulp-babel'),
gulpStyleLint = require('gulp-stylelint'),
gulpESLint = require('gulp-eslint'),
refresh = browserSync.reload;

let htmlValidate = () => {
    return src('*.html').pipe(htmlValidator())
    .pipe(gulp.dest('valid'));
}

let htmlCompress = () => {
    return src('*.html')
    .pipe(htmlCompressor())
    .pipe(gulp.dest('prod'));
}

let cssClean = () => {
    return src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('prod/css'));
}

let transpileDev = () => {
    return src('js/*.js')
    .pipe(babel())
    .pipe(jsCompressor())
    .pipe(gulp.dest('new/js'));
}

let transpileProd = () => {
    return src('js/*.js')
    .pipe(babel())
    .pipe(jsCompressor())
    .pipe(gulp.dest('prod/js'));
}

let transpileImgProd = () => {
    return src('img/*.jpg')
    .pipe(gulp.dest('prod/img'));
}

let cssLinter = () => {
    return src('css/style.css')
    .pipe(gulpStylelint({reporters:
        [{formatter: 'string', console: true}]}))
    .pipe(gulp.dest('lcss'));
}

let serve = () => {
    browserSync({
        browser: 'default',
        server: {baseDir: `new`}
    });

    gulp.watch('js/*.js', series(gulpESLint, transpileDev))
        gulp.on('change', refresh);

    gulp.watch('css/*.css', cssLinter)
        gulp.on('change', refresh);

    gulp.watch('*.html', validateHTML)
        gulp.on('change', refresh);
};

