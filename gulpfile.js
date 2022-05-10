const { src, dest, series, watch } = require(`gulp`),
htmlValidator = require('gulp-html'),
htmlCompressor = require('gulp-htmlmin'),
cssCleaner = require ('gulp-clean-css'),
jsCompressor = require('gulp-uglify'),
babel = require('gulp-babel');


let htmlValidate = () => {
    return src('*.html').pipe(htmlValidator())
    .pipe(gulp.dest('valid'));
}

let htmlCompress = () => {
    return src('*.html')
    .pipe(htmlCompressor())
    .pipe(dest('prod'));
}

let cssClean = () => {
    return src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest('prod/css'));
}

let transpileDev = () => {
    return src('js/*.js')
    .pipe(babel())
    .pipe(jsCompressor())
    .pipe(gulp.dest('transpiles'));
}
