/** Referencias */
let express = require('express');
let router = express.Router();
let controller = require('../controllers/PermissoesController');

/** 
 * Rotas Vinculadas aos seus repectivos metodos no controller
 */
router.get("/",/**auth.authenticate()**/controller.ListarPermissoes);
module.exports = router;