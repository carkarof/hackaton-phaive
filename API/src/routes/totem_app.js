/** Referencias */
let express = require('express');
let router = express.Router();
let controller = require('../controllers/TotemAppController');
const auth = require("../../config/AuthJwt")();

/** 
 * Rotas Vinculadas aos seus repectivos metodos no controller
 */
router.post("/auth",controller.AuthTotem);
router.post("/instituicoes",controller.GetEmpresasTotem);
router.post("/setores",controller.GetSetoresEmpresa);

module.exports = router;