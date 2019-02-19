const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const gulp = require('gulp');
const webpack = require('webpack');
const { argv } = require('yargs');

const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const defaultTasks = [];

const BUILD_DIR = path.join(__dirname, argv.output || 'dist');
const DATA_HTML_DIR = path.join(__dirname, 'data', 'html');

gulp.task('build:clean', done => rimraf(BUILD_DIR, () => mkdirp(BUILD_DIR, done)));

gulp.task('copy:data', () => gulp.src(['package.json']).pipe(gulp.dest(BUILD_DIR)));

gulp.task('copy:html', () => {
    console.log(`=> copy:html from ${DATA_HTML_DIR} to ${BUILD_DIR}`);
    gulp.src(`${DATA_HTML_DIR}/**.html`).pipe(gulp.dest(BUILD_DIR));
});

gulp.task('default', ['build:clean', 'copy:data', 'copy:html'], () => gulp.src('src/index.ts')
    .pipe(webpackStream(webpackConfig, webpack))
    .on('error', () => {
        setTimeout(() => process.exit(1), 1000);
    })// Recover from errors
    .pipe(gulp.dest(BUILD_DIR))
);

