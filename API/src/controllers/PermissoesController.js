/**Area de imports */
const model = require('../models/Permissoes')();

/**
 * Metodo para listar todas as permissoes do sistema
 */
exports.ListarPermissoes = (req,res,next)=>{
     model.findAll().then(data=>{
        return res.status(200).json({"success":true,
            "message":"",
            "data":data}); 
     }).catch(error =>{
        return res.status(500).json({
            "success":false,
            "message":"Falha interna de servidor.",
            "data":""}); 
     })
}

