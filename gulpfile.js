const { src, dest, series, watch } = require(`gulp`),
htmlValidator = require('gulp-html'),
htmlCompressor = require('gulp-htmlmin'),
cssCleaner = require ('gulp-clean-css');

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
