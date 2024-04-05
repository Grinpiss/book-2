const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Таск для компиляции Sass в CSS
gulp.task('sass', function() {
  return gulp.src("app/scss/*.scss") // Исходные файлы Sass
      .pipe(sass()) // Компилируем Sass в CSS
      .pipe(gulp.dest("app/css")) // Сохраняем скомпилированный CSS
      .pipe(browserSync.stream()); // Обновляем страницу при изменении CSS
});

// Таск для отслеживания изменений в файлах Sass
gulp.task('watch', function() {
  // Инициализируем BrowserSync
  browserSync.init({
    server: {
      baseDir: "./app" // Папка, которую мы хотим сервером
    }
  });

  // Отслеживаем изменения в файлах Sass и вызываем таск для их компиляции
  gulp.watch("app/scss/*.scss", gulp.series('sass'));
  // Перезагружаем страницу при изменении HTML файлов
  gulp.watch("app/*.html").on('change', browserSync.reload);
});