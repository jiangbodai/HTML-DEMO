const gulp = require("gulp");


/**
 * 管理.html文件
 */
gulp.task("copy-html", function () {
    return gulp.src("index.html")
        .pipe(gulp.dest("dist/"))
        .pipe(connect.reload());
})

/**
 *  管理静态文件
 */
gulp.task("images",function () {
    // 将img文件下当前目录下的jpg图片移动到dist/images文件夹下
    // return gulp.src("img/*.jpg").pipe(gulp.dest("dist/images"));
    // 将img文件下当前目录下的jpg、png图片移动到dist/images文件夹下
    // return gulp.src("img/*.(jpg,png)").pipe(gulp.dest("dist/images"));
    // 将img文件夹子目录的图片移动到dist/images下
    // return gulp.src("img/*/*").pipe(gulp.dest("dist/images"));
    return gulp.src("img/**/*")
        .pipe(gulp.dest("dist/images"))
        .pipe(connect.reload());
})


/**
 * 将多个文件一起移动
 */
gulp.task("data",function () {
    return gulp.src(["json/*.json","xml/*.xml","!xml/02.xml"])
        .pipe(gulp.dest("dist/data"))
        .pipe(connect.reload());
})

/**
 * 一次执行多个任务
 */
gulp.task("build",["copy-html","images","data"],function () {
    console.log("任务执行完毕");
})




/**
 * 编译scss文件为css
 */
const sass = require("gulp-sass");
/**
 * 压缩css
 */
const minifycss = require("gulp-minify-css");
/**
 * 重命名
 */
const rename = require("gulp-rename");

/**
 * 将scss文件编译成css文件存储到dist/css下
 */
gulp.task("sass", function () {
    return gulp.src("stylesheet/index.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(minifycss())
        .pipe(rename("index.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})


/**
 * 合并文件
 */
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

gulp.task("scripts", function () {
    return gulp.src("js/javascript/*.js")
        .pipe(concat("index.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify())
        .pipe(rename("index.min.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
})


/**
 * 监听文件发生变化，执行对应的方法更新数据
 */
gulp.task("watch", function () {
    gulp.watch("index.html",["copy-html"]);
    gulp.watch("img/**/*",["images"]);
    gulp.watch("json/*.json\",\"xml/*.xml\",\"!xml/02.xml",["data"]);
    gulp.watch("stylesheet/index.scss",["sass"]);
    gulp.watch("js/javascript/*.js",["scripts"]);
})


const connect = require("gulp-connect");
gulp.task("server", function () {
    connect.server({
        root: "dist",
        port: 8888,
        livereload: true
    })
})

/**
 * 同时自动监听和启动服务
 */
gulp.task("default",["watch","server"],function () {
    console.log("启动完成");
});




























