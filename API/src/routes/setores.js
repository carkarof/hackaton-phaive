/** Referencias */
let express = require('express');
let router = express.Router();
let controller = require('../controllers/SetoresController');
const auth = require("../../config/AuthJwt")();

/** 
 * Rotas Vinculadas aos seus repectivos metodos no controller
 */
router.post("/",controller.CadastrarSetor);
router.put("/:id",controller.AtualizarSetor);
router.get("/all/:id",controller.ListarSetores);
router.get("/:id",controller.BuscarSetor);
router.post("/setores-empresas",controller.ListarSetoresEmpresas);
router.delete("/:id",controller.DesativarSetor);

module.exports = router;