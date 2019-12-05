let express = require('express');
let router = express.Router();
let controller = require('../controllers/InspecaoController');
// let auth = require('../../config/AuthJwt')();

/** 
 * Rotas Vinculadas aos seus repectivos metodos no controller
 */
router.post("/",controller.CadastrarInspecao);
router.put("/:id",controller.AtualizarInspecao);
router.get("/all/:id",controller.ListarInspecao);
router.get("/:id",controller.BuscarInspecao);

module.exports = router;