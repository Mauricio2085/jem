const express = require('express');
const aplication = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const rutaRegistros = require('./routes/registros');
const rutaVistas = require('./routes/vistas');

aplication.set('view engine', 'ejs')
aplication.use(bodyParser.json());
aplication.use(bodyParser.urlencoded( {extended: true }));
aplication.use(session({ secret: 'token-muy-secreto', resave: true, saveUninitialized: true }));
aplication.use(flash())
aplication.use(express.static('public'))

aplication.use(rutaRegistros);
aplication.use(rutaVistas);
                        
                              
aplication.listen(8080, function(){
    console.log('Servidor iniciado')
});