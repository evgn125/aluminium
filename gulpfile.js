"use strict";

var gulp = require("gulp"),
  autoprefixer = require("autoprefixer"),
  combineMq = require("gulp-combine-mq"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  htmlmin = require("gulp-htmlmin"),
  imagemin = require("gulp-imagemin"),
  plumber = require("gulp-plumber"),
  postcss = require("gulp-postcss"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  uglify = require("gulp-uglify"),
  uncss = require("postcss-uncss");

gulp.task("style", function () {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
        "last 50 versions"
      ]
      })
    ]))
    .pipe(gulp.dest("css"))
});

gulp.task("img", function () {
  return gulp.src("img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
    imagemin.gifsicle({
        interlaced: true
      }),
    imagemin.jpegtran({
        progressive: true
      }),
    imagemin.optipng({
        optimizationLevel: 7
      })
]))
    .pipe(gulp.dest("build/img"))
});

gulp.task("js", function () {
  return gulp.src(["js/script.js"])
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(uglify())
    .pipe(gulp.dest("js"));
});

gulp.task("css", function () {
  var plugins = [
    uncss({
      html: ["index.html"]
    }),
    ];
  return gulp.src(["css/bootstrap.css", "css/style.css"])
    .pipe(concat("style.min.css"))
    .pipe(postcss(plugins))
    .pipe(combineMq())
    .pipe(cssmin())
    .pipe(gulp.dest("css"));
});

gulp.task("min", ["js", "css"]);

gulp.task("ht", function () {
  return gulp.src("index.html")
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      preserveLineBreaks: true
    }))
    .pipe(gulp.dest(""));
});

gulp.task("default", ["style"], function () {
  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
});
