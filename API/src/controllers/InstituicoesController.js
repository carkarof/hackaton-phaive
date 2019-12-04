/**Area de imports */
const model = require('../models/Instituicoes')();
const fs = require('fs');
const sequelize = require("../../config/Databases")


/** Inserir Instituicao */
exports.CadastrarInstituicao = (req,res,next)=>{

    let random = Math.random()*10000
    let capa_desktop = req.files.foto_capa_desktop == undefined ? null : req.files.foto_capa_desktop.name
    let capa_totem = req.files.foto_capa_totem == undefined ? null : req.files.foto_capa_totem.name
    let capa_perfil_totem = req.files.foto_perfil_totem == undefined ? null : req.files.foto_perfil_totem.name
    let logo_empresa = req.files.logo_empresa == undefined ? null:req.files.logo_empresa.name
    //** Opcional */
    if(logo_empresa != null){
        req.files.foto_capa_desktop.mv("./public/imagens/instituicoes/"+random+"_"+logo_empresa,(error)=>{   
        })
        req.body.logo_empresa = random+"_"+logo_empresa;
    }

    if(capa_desktop !== null){
        req.files.foto_capa_desktop.mv("./public/imagens/instituicoes/"+random+"_"+capa_desktop,(error)=>{   
        })
        req.body.foto_capa_desktop = random+"_"+capa_desktop;
    }else{
        return res.status(400).json({
            "success":false,
            "message":"Preencha todos os campos corretamente para continuar.",
            "data":""
        })
    }

    if(capa_totem !== null){
        req.files.foto_capa_totem.mv("./public/imagens/instituicoes/"+random+"_"+capa_totem,(error)=>{
        })
        req.body.foto_capa_totem = random+"_"+capa_totem;
    }else{
        return res.status(400).json({
            "success":false,
            "message":"Preencha todos os campos corretamente para continuar.",
            "data":""
        })
    }

    if(capa_perfil_totem != null){
        req.files.foto_perfil_totem.mv("./public/imagens/instituicoes/"+random+"_"+capa_perfil_totem,(error)=>{
        })
        req.body.foto_perfil_totem = random+"_"+capa_perfil_totem;
    }else{
        return res.status(400).json({
            "success":false,
            "message":"Preencha todos os campos corretamente para continuar.",
            "data":""
        })
    }
    
   
    model.create(req.body).then(result=>{
        return res.status(203).json({
            "success":true,
            "message":"Instituição cadastada com sucesso.",
             data:""
        })
    }).catch(error => {
        return res.status(500).json({
            "success":false,
            "message":"Falha interna de servidor.",
            "data":""
        })
    })
 
}

/** Listar Institucoes de acordo com o admin Logado */
exports.ListarInstitucoes = (req,res,next)=>{
    sequelize.query(`SELECT * from public.obter_instituicoes_por_usuario_master(${req.params.id})`).then(data=>{
        return res.status(200).json({
            "success":true,
            "message":"",
             data:data[0]
        })
    }).catch(error =>{
        return res.status(500).json({
            "success":false,
            "message":"Falha interna de servidor.",
            "data":""
        })
    });
}

/** Obter Instituicao pelo codigo */
exports.BuscarInstituicao = (req,res,next)=>{
     model.findAll({
         where:{
             id_instituicao:req.params.id
         }
     }).then(data=>{
        return res.status(200).json({
            "success":true,
            "message":"",
            "data":data})
        }).catch(error=>{
            return res.status(500).json({
                "success":false,
                "message":error,
                "data":""
            })
        })
}

/**
 * Atualizar Instituicao
 */
exports.AtualizarInstituicao = (req,res,next)=>{

    /** Deletar imagens anteriores */
    model.findOne({
        where:{
            id_instituicao: req.params.id
        },
        attributes:[
            'foto_capa_desktop',
            'foto_perfil_totem',
            'foto_capa_totem',
            'logo_empresa'
        ]
    }).then(data=>{
       if(req.files != null){
        let random = Math.random()*10000
        let capa_desktop = req.files.hasOwnProperty("foto_capa_desktop") ? req.files.foto_capa_desktop.name : false
        let capa_totem = req.files.hasOwnProperty("foto_capa_totem") ? req.files.foto_capa_totem.name : false
        let capa_perfil_totem = req.files.hasOwnProperty("foto_perfil_totem")? req.files.foto_perfil_totem.name : false
        let logo_empresa = req.files.hasOwnProperty("logo_empresa") ? req.files.logo_empresa.name : false

    
        //** Opcional */
        if(logo_empresa !== false){
            fs.unlink("./public/imagens/instituicoes/"+data.logo_empresa,(error)=>{});
            req.files.logo_empresa.mv("./public/imagens/instituicoes/"+random+"_"+logo_empresa,(error)=>{
                  
            })
            Object.assign(req.body,{logo_empresa:random+"_"+logo_empresa})
        }

        if(capa_desktop !== false){
            fs.unlink("./public/imagens/instituicoes/"+data.foto_capa_desktop,(error)=>{});
            req.files.foto_capa_desktop.mv("./public/imagens/instituicoes/"+random+"_"+capa_desktop,(error)=>{   
            })
            req.body.foto_capa_desktop = random+"_"+capa_desktop;
        }
    
        if(capa_totem !== false){
            fs.unlink("./public/imagens/instituicoes/"+data.foto_capa_totem,(error)=>{});
            req.files.foto_capa_totem.mv("./public/imagens/instituicoes/"+random+"_"+capa_totem,(error)=>{
            })
            req.body.foto_capa_totem = random+"_"+capa_totem;
        }
    
        if(capa_perfil_totem != false){
            fs.unlink("./public/imagens/instituicoes/"+data.foto_perfil_totem,(error)=>{});
            req.files.foto_perfil_totem.mv("./public/imagens/instituicoes/"+random+"_"+capa_perfil_totem,(error)=>{
            })
            req.body.foto_perfil_totem = random+"_"+capa_perfil_totem;
        }
    }

        model.update(req.body,{
            where:{
                id_instituicao:req.params.id
            }
        }).then(result=>{
            return res.status(200).json({
                "success":true,
                "message":"Instituição atualizado com sucesso.",
                 data:""
            })
        }).catch(error => {
            return res.status(500).json({
                "success":false,
                "message":"Falha interna de servidor.",
                "data":""
            })
        })


    })
    
    
    
    
  
}

