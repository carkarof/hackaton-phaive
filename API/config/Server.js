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

 const auth_router = require('../src/routes/auth')
 const usuario_master = require('../src/routes/usuario_master')
 const instituicoes = require('../src/routes/instituicoes')
 const setores = require('../src/routes/setores')
 const setores_icones = require('../src/routes/setores_icones')
 const usuarios_instituicoes = require('../src/routes/usuario_instituicoes')
 const permissoes = require('../src/routes/permissoes')
 const totem = require('../src/routes/totem')
 const totem_app = require('../src/routes/totem_app')
 
 /** Registro das rotas */
 app.use(router_prefix+"/auth",auth_router)
 app.use(router_prefix+"/usuarios-admin",usuario_master)
 app.use(router_prefix+"/instituicoes",instituicoes)
 app.use(router_prefix+"/setores",setores)
 app.use(router_prefix+"/setores-icones",setores_icones)
 app.use(router_prefix+"/usuario-instituicoes",usuarios_instituicoes)
 app.use(router_prefix+"/permissoes",permissoes)
 app.use(router_prefix+"/totem",totem)
 app.use(router_prefix+"/totem-app",totem_app)

 /**
  * Ativar Passport e Middleware de Rotas JWT
 */
 const auth = require("../config/AuthJwt")();
 app.use(auth.initialize())

 /**
  * Pastas estaticas entregues ao cliente
  */
 app.use(express.static("./public"));

 module.exports = app;

