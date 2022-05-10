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
    .pipe(dest('new/validate'));
}

let htmlCompress = () => {
    return src('*.html')
    .pipe(htmlCompressor())
    .pipe(dest('prod'));
}

let cssClean = () => {
    return src('css/*.css')
    .pipe(cssCleaner({compatibility: 'ie8'}))
    .pipe(dest('prod/css'));
}

let transpileDev = () => {
    return src('js/*.js')
    .pipe(babel())
    .pipe(jsCompressor())
    .pipe(dest('new/js'));
}

let transpileProd = () => {
    return src('js/*.js')
    .pipe(babel())
    .pipe(jsCompressor())
    .pipe(dest('prod/js'));
}

let transpileImgProd = () => {
    return src('img/*.jpg')
    .pipe(dest('prod/img'));
}

let cssLinter = () => {
    return src('css/style.css')
    .pipe(gulpStylelint({reporters:
        [{formatter: 'string', console: true}]}))
    .pipe(dest('lcss'));
}

let jsLinter = () => {
    return src('js/*.js')
    .pipe(gulpESLint())
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

    gulp.watch('*.html', htmlValidate)
        gulp.on('change', refresh);
};

exports.htmlValidate = htmlValidate;
exports.htmlCompress = htmlCompress;
exports.cssLinter = cssLinter;
exports.cssClean = cssClean;
exports.gulpESLint = gulpESLint;
exports.transpileDev = transpileDev;
exports.transpileImgProd = transpileImgProd;
exports.transpileProd = transpileProd;
exports.serve = series(htmlValidate, cssLinter, jsLinter, transpileDev, serve);
exports.build = series(htmlCompress, cssClean, transpileProd, transpileImgProd);
