const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
let reload = browserSync.reload;
const autoprefix = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const imageminGuetzli = require("imagemin-guetzli");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const svgSprite = require("gulp-svg-sprite");
const gzip = require("gulp-gzip");
const gutil = require("gulp-util");
const ftp = require("vinyl-ftp");
const concat = require("gulp-concat");

// FTP config
var user = "concertoyd"; /*process.env.FTP_USER;*/
var password = "VzZCMfqA7mD8"; /*process.env.FTP_PWD;*/
var host = "ftp.concerto.space";
var port = 21;
var localFilesGlob = ["./dist/**/*"];
var remoteFolder = "/www/communales/";

// Connect to FTP
function getFtpConnection() {
  return ftp.create({
    host,
    port,
    user,
    password,
    parallel: 5,
    log: gutil.log
  });
}

gulp.task("removeDirectory", function() {
  const conn = getFtpConnection();
  conn.rmdir(remoteFolder, function(error) {
    console.log(error);
  });
});

gulp.task("upload", ["package"], function() {
  const conn = getFtpConnection();
  conn.rmdir(remoteFolder, function(error) {
    console.log(error);
  });
  return gulp
    .src("./dist/**/*")
    .pipe(conn.newer(remoteFolder))
    .pipe(conn.dest(remoteFolder));
});

gulp.task("sass", function() {
  return gulp
    .src("scss/**/*.scss")
    .pipe(sass())
    .on("error", function(error) {
      console.log(error.toString());
      this.emit("end");
    })
    .pipe(autoprefix())
    .pipe(cleanCSS())
    .pipe(gulp.dest("css"))
    .pipe(gzip())
    .pipe(gulp.dest("css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("babel", function() {
  return gulp
    .src("src/js/*.js")
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .on("error", function(error) {
      console.log(error.toString());
      this.emit("end");
    })
    .pipe(uglify())
    .pipe(gulp.dest("js"))
    .pipe(gzip())
    .pipe(gulp.dest("js"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("concat", ["babel"], function() {
  return gulp
    .src([
      "js/siema.min.js",
      "js/awesomplete.js",
      "js/functions.js",
      "js/youtube.js",
      "js/main.js"
    ])
    .pipe(concat("bundle.js"))
    .pipe(gulp.dest("js"))
    .pipe(gzip())
    .pipe(gulp.dest("js"));
});

gulp.task("watch", ["browserSync", "sass", "babel"], function() {
  gulp.watch("scss/**/*.scss", ["sass"]);
  gulp.watch("src/js/*.js", ["babel"]);
  gulp.watch("*.html", reload);
  gulp.watch("*.php", reload);
});

gulp.task("browserSync", function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("imagemin", ["guetzli"], function() {
  gulp
    .src("assets/img/**/*.{gif,svg,mp4}")
    .pipe(imagemin())
    .on("error", function(error) {
      console.log(error.toString());
      this.emit("end");
    })
    .pipe(gulp.dest("dist/assets/img"));
});

gulp.task("guetzli", function() {
  gulp
    .src("assets/img/**/*.{jpg, png}")
    .pipe(imagemin([imageminGuetzli()]))
    .pipe(gulp.dest("dist/assets/img"));
});

gulp.task("package", ["imagemin", "sass", "concat"], function() {
  gulp.src("css/*.{css,gz}").pipe(gulp.dest("dist/css"));
  gulp
    .src([
      "js/bundle.js",
      "js/bundle.gz",
      "js/twitter.js",
      "js/twitter.gz",
      "js/safari-font-fix.js",
      "js/safari-font-fix.gz"
    ])
    .pipe(gulp.dest("dist/js"));
  // gulp.src("font").pipe(gulp.dest("dist/font"));
  gulp.src("*.{html,php}").pipe(gulp.dest("dist"));
  gulp.src("favicons/*").pipe(gulp.dest("dist/favicons"));
});
