//bibliotecas 
let express = require('express');
let body_parser = require('body-parser');
let cors = require('cors');
let fileUpload = require('express-fileupload')

/** Configurações do servidor - Middlewares */
let app = express();

/** Processamento de Contente type
 * application/json e x-www-form-url-encoded
 */
app.use(body_parser.urlencoded({extended:true,limit:"10mb"}))
app.use(body_parser.json())
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

/**
 * Configuração de CORS 
 */
app.use(cors());

/**
 * Referencia e configuração de rotas 
 */
 const router_prefix = '/api/v1'

 
 const inspecoes = require('../src/routes/inspecao')
 
 /** Registro das rotas */

 app.use(router_prefix+"/inspecoes",inspecoes)

 
 /**
  * Pastas estaticas entregues ao cliente
  */
 app.use(express.static("./public"));

 module.exports = app;

