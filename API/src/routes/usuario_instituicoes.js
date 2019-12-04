/** Referencias */
let express = require('express');
let router = express.Router();
let controller = require('../controllers/UsuarioInstituicoes');

/** 
 * Rotas Vinculadas aos seus repectivos metodos no controller
 */
 router.post("/"/**auth.authenticate()**/,controller.CadastrarUsuario);
 router.put("/:id"/**auth.authenticate()**/,controller.AtualizarUsuario);
 router.get("/all/:id",/**auth.authenticate()**/controller.ListarUsuarios);
 router.get("/:id",/**auth.authenticate()**/controller.BuscarUsuario);
 router.delete("/:id",/**auth.authenticate()**/controller.DesativarUsuario);
 router.get("/usuario-setores/:id_setor/:id_instituicao",/**auth.authenticate()**/controller.ObterUsuarioBySetor);

module.exports = router;