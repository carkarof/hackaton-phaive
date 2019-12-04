/**Area de imports */
const model = require('../models/Inspecao')();
const sequelize = require('../../config/Databases');

/**
 * Metodo para cadastrar um setor
 */
exports.CadastrarInspecao = (req,res,next)=>{
    model.create(req.body).then(result=>{
            return res.status(200).json({"success":true,
            "message":"Setor criado com sucesso.",
            "data":""}); 
    }).catch(error =>{
        return res.status(500).json({
            "success":false,
            "message":"Falha interna de servidor.",
            "data":""}); 
    })
}

/**
 * Metodo para listar todos as inspecoes de acordo a instituicao
 */
exports.ListarInspecao = (req,res,next)=>{
     sequelize.query(`select * from (${req.params.id})`).then(data=>{
        return res.status(200).json({"success":true,
            "message":"",
            "data":data[0]}); 
     }).catch(error =>{
        return res.status(500).json({
            "success":false,
            "message":"Falha interna de servidor.",
            "data":""}); 
     })
}

/**
 * Metodo para buscar uma inspecao em especifico
 */
exports.BuscarInspecao = (req,res,next)=>{
    model.findOne({
        where:{
            idinspecao:req.params.id
        }
    }).then(data=>{
        //OBTER QUEM TEM NOTIFICACOES
        sequelize.query(`select * from OBTER_USUARIOS_NOTIFICACAO(${data.id_instituicao},${data.id_setor})`).then(result=>{
            

            return res.status(200).json({"success":true,
            "message":"",
            "data":data,
            "notificacoes":result[0]
        }); 

        }).catch(error =>{
            return res.status(500).json({
                "success":false,
                "message":"Falha interna de servidor.",
                "data":""}); 
        })
    
       
    }).catch(error=>{
        return res.status(500).json({
            "success":false,
            "message":"Falha interna de servidor.",
            "data":""}); 
    })
}
/**
 * Metodo para atualizar uma inspecao
 */
exports.AtualizarInspecao = (req,res,next)=>{

     model.update(req.body,{
         where:{
             id_setor:req.params.id
         }
     }).then(result=>{
        let notificar = req.body.notificacoes;
        for(i=0; i <notificar.length;i++){
            sequelize.query(`update usuario_instituicoes set receber_notificacao = ${notificar[i].notificar}  where id_usuario = ${notificar[i].id_usuario}`)
        }
        return res.status(200).json({"success":true,
        "message":"Setor atualizado com sucesso.",
        "data":""}); 


     }).catch(error =>{
        return res.status(500).json({
            "success":false,
            "message":"Falha interna de servidor.",
            "data":""}); 
     })
}

