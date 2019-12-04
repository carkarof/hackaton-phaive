/** Referencias */
let express = require('express');
let router = express.Router();
let controller = require('../controllers/SetoresIconesController');
let auth = require('../../config/AuthJwt')();
let vr_autorizacao = require('../../config/AutorizationMiddleware');


/** 
 * Rotas Vinculadas aos seus repectivos metodos no controller
 */



router.get("/",controller.ListarIcones);

module.exports = router;