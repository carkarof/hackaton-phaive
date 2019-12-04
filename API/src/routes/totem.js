/** Referencias */
let express = require('express');
let router = express.Router();
let controller = require('../controllers/TotemController');
const auth = require("../../config/AuthJwt")();

/** 
 * Rotas Vinculadas aos seus repectivos metodos no controller
 */
router.post("/",controller.CadastrarTotem);
router.put("/:id",controller.AtualizarTotem);
router.get("/all/:id",controller.ListarTotems);
router.get("/:id",controller.buscarTotem);
// router.delete("/:id",controller.DesativarSetor);

module.exports = router;