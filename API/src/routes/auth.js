/** Referencias */
let express = require('express');
let router = express.Router();
let controller = require('../controllers/AuthController');
let auth = require('../../config/AuthJwt')();
let vr_autorizacao = require('../../config/AutorizationMiddleware');


/** 
 * Rotas Vinculadas aos seus repectivos metodos no controller
 */



router.post("/",controller.post);

router.get("/teste",auth.authenticate(),vr_autorizacao,controller.test)

module.exports = router;