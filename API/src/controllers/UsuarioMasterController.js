/**Area de imports */
const model = require('../models/UsuarioMaster')();
const encMd5 = require('md5');

/** Inserir Usuario */
exports.CadastrarUsuario = (req,res,next)=>{
  
   model.findOne({
       where:{
           email:req.body.email
       }
   }).then(result =>{
       if(result == null){
        /**Cria o usuario*/

        //se tiver foto o sistema faz o upload
        if(req.files != null){    
            let random = Math.random()*10000;
            req.files.foto_perfil.mv("./public/imagens/avatars/"+random+"_"+req.files.foto_perfil.name)
            req.body.foto_perfil = random+"_"+req.files.foto_perfil.name
          }

           req.body.senha = encMd5(req.body.senha)
           model.create(req.body).then(result=>{
            return res.status(200).json({"success":true,
            "message":"Usuário admin criado com sucesso.",
            "data":""}); 

        }).catch(error=>{
           return res.status(500).json({
               "success":false,
               "message":"Falha interna de servidor.",
               "data":""}); 
        });
       }else{
            return res.status(200).json({"success":false,
            "message":"Usuário ja cadastrado no sistema.",
            "data":""}); 
       }
   })

}

/** Obter Usuarios */
exports.ListarUsuarios = (req,res,next)=>{
    model.findAll().then(data=>{
        return res.status(200).json({
            "success":true,
            "message":"",
             data:data
        })
    }).catch(error =>{
        return res.status(500).json({
            "success":false,
            "message":"Falha interna de servidor.",
            "data":""
        })
    });
}

/** Obter Usuarios */
exports.BuscarUsuario = (req,res,next)=>{
     model.findAll({
         where:{
             id_usuario:req.params.id
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
 * Atualizar Usuarios
 */
exports.AtualizarUsuario = (req,res,next)=>{
    //verifica se o usuario informado ja existe
    model.findOne({
        where:{
            email:req.body.email,
            id_usuario:parseInt(req.params.id)
        }
    }).then(data =>{
        //se existir atualiza
        if(data != null){
            model.update(req.body,{
                where:{
                    email:req.body.email,
                    id_usuario:req.params.id
                }
            }).then(result =>{
                return res.status(200).json({
                    "success":true,
                    "message":"Usuario atualizado com sucesso.",
                    "data":""})
            }).catch(error =>{
                return res.status(500).json({
                    "success":true,
                    "message":"Falha ao atualizar usuario.",
                    "data":""})
             })
        }else{
            //caso nao existe verificar se a nova informação pode ser cadastrada
            model.findAll({
                where:{
                    email:req.body.email
                }
            }).then(result=>{
                //email ja cadastrado
                if(result != null){
                    return res.status(200).json({"success":false,
                    "message":"Usuário ja cadastrado no sistema.",
                    "data":""}); 
                }else{
                    //cadastra o usuario normalmente
                    model.update(req.body,{
                        where:{
                            email:req.body.email,
                            id_usuario:req.params.id
                        }
                    }).then(result =>{
                        return res.status(200).json({
                            "success":true,
                            "message":"Usuario atualizado com sucesso.",
                            "data":""})
                    }).catch(error =>{
                        return res.status(500).json({
                            "success":true,
                            "message":"Falha ao atualizar usuario.",
                            "data":""})
                     })
                }
            })
        }
    })
}

/**
 * Delete Usuarios(Desativa do sistema)
 */
exports.DeletarUsuario = (req,res,next)=>{
    model.update({
        ativo:false
    },{
        where:{
            id_usuario: req.params.id
        }
    }).then(response=>{
        return res.status(200).json({
            "success":true,
            "message":"Usuário desativado com sucesso.",
            "data":""})
    })
}