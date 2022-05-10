const { src, dest, series, watch } = require(`gulp`),
htmlValidator = require('gulp-html'),
htmlCompressor = require('gulp-htmlmin'),
cssCleaner = require ('gulp-clean-css'),
jsCompressor = require('gulp-uglify'),
babel = require('gulp-babel'),
gulpStyleLint = require('gulp-stylelint');


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
    .pipe(gulp.dest('transpiles'));
}

let transpileProd = () => {
    return src('img/*')
    .pipe(gulp.dest('prod/img'));
}

let cssLinter = () => {
    return src('css/style.css')
    .pipe(gulpStylelint({
        reporters: [{formatter: 'string', console: true}]}))
    .pipe(gulp.dest('lcss'));
}
