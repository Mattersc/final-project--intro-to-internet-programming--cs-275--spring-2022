const { src, dest, series, watch } = require(`gulp`),
htmlValidator = require('gulp-html'),
htmlCompressor = require('gulp-htmlmin');

let htmlValidate = () => {
    return src('*.html').pipe(htmlValidator())
    .pipe(gulp.dest('valid'));
}

let htmlCompress = () => {
    return src('*.html')
    .pipe(htmlCompressor())
    .pipe(dest('prod'));
}
