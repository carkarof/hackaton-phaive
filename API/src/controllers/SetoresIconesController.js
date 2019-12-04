const sequelize = require("../../config/Databases")
const model = require('../models/SetoresIcones')();

exports.ListarIcones = (req,res,next)=>{
    
     model.findAll().then(data=>{
        return res.status(200).json({
            "success":true,
            "message":"",
            "data":data
        })
     }).catch(error =>{
        return res.status(400).json({
            "success":false,
            "message":"Falha ao obter icones dos setores.",
            "data":""
        })
     })

}