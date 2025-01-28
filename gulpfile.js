const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
//Función compila sass
function css( done ){
	src('src/scss/app.scss')//Identificar archivo
		.pipe( sass() )//Compliar sass
		.pipe(dest('build/css'))//Guardar en ubicación
	done();
}
function cssbuild( done ){
	src('build/css/app.css')
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(purgecss({
			content: ['*.html']
		}))
		.pipe(dest('build/css'));
	done();
}
//Imagenes
function imagenes( done ){
	src('src/img/**/*')
		.pipe( imagemin({optimizationLevel: 3}) )
		.pipe(dest('build/img'));
	done();
}

//Función para tomar cambios
function dev( done ){
	watch('src/scss/**/*.scss', css);
	done();
}
exports.css = css;
exports.imagenes = imagenes;
exports.dev = dev; //gulp dev
exports.default = series(imagenes, css, dev); //gulp
exports.cssbuild = series(cssbuild); //gulp cssbuild