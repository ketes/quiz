
var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');


// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

var DATABASE_PROTOCOL = url[1];
var DATABASE_DIALECT  = url[1];
var DATABASE_USER     = url[2];
var DATABASE_PASSWORD = url[3];
var DATABASE_HOST     = url[4];
var DATABASE_PORT     = url[5];
var DATABASE_NAME     = url[6];

var DATABASE_STORAGE  = process.env.DATABASE_STORAGE;


// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DATABASE_NAME, 
							  DATABASE_USER, 
							  DATABASE_PASSWORD, 
				              { dialect:  DATABASE_DIALECT, 
				                protocol: DATABASE_PROTOCOL, 
				                port:     DATABASE_PORT,
				                host:     DATABASE_HOST,
				                storage:  DATABASE_STORAGE,   // solo local (.env)
				                omitNull: true                // solo Postgres
				              });


// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Importar la definicion de la tabla Comments de comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

// Relaciones entre modelos
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);




exports.Quiz = Quiz; // exportar definici�n de tabla Quiz
exports.Comment = Comment; // exportar definici�n de tabla Comments