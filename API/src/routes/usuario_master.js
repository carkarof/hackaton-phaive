/** Referencias */
let express = require('express');
let router = express.Router();
let controller = require('../controllers/UsuarioMasterController');

/** 
 * Rotas Vinculadas aos seus repectivos metodos no controller
 */
router.post("/"/**auth.authenticate()**/,controller.CadastrarUsuario);
router.put("/:id"/**auth.authenticate()**/,controller.AtualizarUsuario);
router.delete("/:id"/**auth.authenticate()**/,controller.DeletarUsuario);
router.get("/",/**auth.authenticate()**/controller.ListarUsuarios);
router.get("/:id",/**auth.authenticate()**/controller.BuscarUsuario);

module.exports = router;