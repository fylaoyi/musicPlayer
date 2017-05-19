var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
//转换html文件
gulp.task('html', function() {
    gulp.src('./src/index.html')
        .pipe(connect.reload())//对服务器进行监听
        .pipe(gulp.dest('./dist'))
})
//转换css文件并预编译
gulp.task('css', function() {
    gulp.src('./src/css/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'))
})
//转换js文件
gulp.task('js', function(){
    gulp.src('./src/js/*.js')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist/js'))
})
//监听任务
gulp.task('watch', function() {
    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/css/*.less', ['css']);
    gulp.watch('./src/css/*.js', ['js']);
})
gulp.task('server', function() {
    connect.server({
        livereload : true
    });
})
gulp.task('default', ['html', 'watch', 'server', 'css', 'js']);//触发任务

