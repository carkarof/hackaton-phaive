/**Area de imports */
const model = require('../models/UsuarioInstituicoes')();
const model_rl = require('../models/RlInstituicoesUsuarios')();
const model_rl_permissoes = require('../models/RlUsuarioPermissoes')();
const model_u_master = require('../models/UsuarioMaster')();
const sequelize = require('../../config/Databases');
const encMd5 = require('md5');

/**
 * Metodo para cadastrar um setor
 */
exports.CadastrarUsuario = (req,res,next)=>{
    //VERIFICA SE EXISTE NA TABELA USUARIO MASTER
    model_u_master.findAll({
        where:{
            email:req.body.email
        }
    }).then(response=>{
        if(response.length > 0){
            return res.status(200).json({"success":false,
            "message":"e-mail ja cadastrado na plataforma",
            "data":""}); 
        }else{


                  /** Verificar se o usuario ja possui cadastro na instituicao */
    sequelize.query(`select * from sp_verificar_usuario_cadastrado('${req.body.email}')`).then(data=>{
        //sem e-mailcadastrado
         if(data[1].rowCount != 0){
            return res.status(200).json({"success":false,
            "message":"e-mail ja cadastrado na plataforma",
            "data":""}); 
         }else{
             /** Remove as chave nao necessaria na tabela usuarios_instituicoes */
             let usuario = req.body
             usuario.senha = encMd5(usuario.senha)
             sequelize.transaction(t=>{
         
                return  model.create({
                    "nome":usuario.nome,
                    "email":usuario.email,
                    "funcao":usuario.funcao,
                    "senha":usuario.senha,
                    "id_setor":usuario.id_setor,
                    "ativo":usuario.ativo,
                },{transaction:t}).then(usuario=>{
                    let temp = []
                    id_usuario = usuario.id_usuario
                    for(i=0;i<req.body.instituicoes_vinculadas.length;i++){
                      if(req.body.instituicoes_vinculadas[i] !== req.body.instituicao_selecionada){
                            temp.push({
                                id_usuario:id_usuario,
                                id_instituicao:req.body.instituicoes_vinculadas[i],
                                principal:false
                            })
                     }
                    }

                    //** Insere a empresa principal do usuario */
                    temp.push({
                        id_usuario:id_usuario,
                        id_instituicao: req.body.instituicao_selecionada,
                        principal:true
                    })
                   
                    /** Insere as instituicoes */
                    return model_rl.bulkCreate(temp,{transaction:t}).then(data=>{
                        let temp_permissoes = []
                        for(i=0;i<req.body.permissoes.length;i++){
                            temp_permissoes.push({
                                id_usuario:id_usuario,
                                id_permissao:req.body.permissoes[i]
                            })
                        }
                        /** Insere as permissoes */
                        return model_rl_permissoes.bulkCreate(temp_permissoes,{transaction:t});
                    })      
                })
            }).then(result =>{
                return res.status(200).json({"success":true,
                "message":"Usuario criado com sucesso.",
                "data":""}); 
            }).catch(error =>{
                console.log(error)
                return res.status(500).json({"success":false,
                "message":"Falha interna de servidor.",
                "data":error}); 
            })
             
         }
    }).catch(error =>{
        return res.status(500).json({
            "success":false,
            "message":"Falha interna de servidor.",
            "data":""}); 
    })

        }
    })
    


}

/**
 * Metodo para listar todos os usuarios de acordo a instituicao
 */
exports.ListarUsuarios = (req,res,next)=>{
     
     sequelize.query(`select * from sp_obter_lista_usuarios_instituicao(${req.params.id})`).then(data=>{

        return res.status(200).json({
            "success":true,
            "message":"",
            "data":data[0]}); 

     }).catch(error=>{
        return res.status(500).json({
            "success":false,
            "message":"Falha interna de servidor.",
            "data":error}); 
     })


}

/**
 * Metodo para buscar um setor em especifico
 */
exports.BuscarUsuario = (req,res,next)=>{
     model.findOne({
         where:{
             id_usuario:req.params.id
         }
     }).then(data=>{
        let usuario = {geral:"",permissoes:[],instituicoes_vinculadas:[]}
        usuario.geral = data

        model_rl_permissoes.findAll({
             where:{
                 id_usuario:req.params.id
             }
        }).then(data=>{
            
            usuario.permissoes = data
            model_rl.findAll({
                where:{
                    id_usuario:req.params.id
                }
            }).then(data=>{
                usuario.instituicoes_vinculadas = data
                return res.status(200).json({
                    "success":true,
                    "message":"",
                    "data":usuario}); 
            })
        })

     }).catch(error=>{
        return res.status(500).json({
            "success":false,
            "message":"Falha interna de servidor.",
            "data":""}); 
     })
}
/**
 * Metodo para atualizar um setor
 */
exports.AtualizarUsuario = (req,res,next)=>{
    
       //VERIFICA SE EXISTE NA TABELA USUARIO MASTER
       model_u_master.findAll({
            where:{
                email:req.body.email
            }
      }).then(response=>{
            if(response.length > 0){
                return res.status(200).json({"success":false,
                "message":"e-mail ja cadastrado na plataforma",
                "data":""}); 
            }
        })
    
    /** Verificar se o usuario a ser atualizado ja esta cadastrado
     * se tiver ele atualiza
    */
    model.findOne({
        where:{
            id_usuario:req.params.id,
            email:req.body.email
        }
    }).then(data=>{
        if(data !== null){
            /** Se existir com email e id atualiza se nao faz outra verificacao */
            let usuario = req.body
            usuario.senha = usuario.senha.length == 32 ? usuario.senha : encMd5(usuario.senha)
            sequelize.transaction(t=>{
        
               return  model.update({
                   "nome":usuario.nome,
                   "email":usuario.email,
                   "funcao":usuario.funcao,
                   "senha":usuario.senha,
                   "id_setor":usuario.id_setor,
                   "ativo":usuario.ativo,
               },{where:{id_usuario:req.params.id},transaction:t}).then(usuario=>{
                   let temp = []
                   id_usuario = req.params.id
                   for(i=0;i<req.body.instituicoes_vinculadas.length;i++){
                        if(req.body.instituicoes_vinculadas[i] !== req.body.instituicao_selecionada){ 
                            temp.push({
                                id_usuario:id_usuario,
                                id_instituicao:req.body.instituicoes_vinculadas[i],
                                principal:false
                            })
                        }
                   }

                    //** Insere a empresa principal do usuario */
                    temp.push({
                        id_usuario:id_usuario,
                        id_instituicao: req.body.instituicao_selecionada,
                        principal:true
                    })

                   /** Deleta as instituicoes */
                  return model_rl.destroy({
                       where:{
                           id_usuario:req.params.id
                       },transaction:t
                   }).then(data=>{
                       /** Depois de deletar as instituicoes */
                       return model_rl.bulkCreate(temp,{transaction:t}).then(data=>{
                        let temp_permissoes = []
                        for(i=0;i<req.body.permissoes.length;i++){
                            temp_permissoes.push({
                                id_usuario:id_usuario,
                                id_permissao:req.body.permissoes[i]
                            })
                        }

                        return model_rl_permissoes.destroy({
                            where:{
                                id_usuario:req.params.id
                            },transaction:t
                        }).then(data=>{
                             /** Insere as permissoes */
                            return model_rl_permissoes.bulkCreate(temp_permissoes,{transaction:t});
                        })
                   })
               })
           }).then(result =>{
               return res.status(200).json({"success":true,
               "message":"Usuario atualizado com sucesso.",
               "data":""}); 
           }).catch(error =>{
               return res.status(500).json({"success":false,
               "message":"Falha interna de servidor.",
               "data":error}); 
           })
        }) 
    }else{
         /** Caso id e email nao sejam iguais verificar se email ja existe na plataforma */
         sequelize.query(`select * from sp_verificar_usuario_cadastrado('${req.body.email}')`).then(data=>{
            //sem e-mailcadastrado
             if(data[1].rowCount != 0){
                return res.status(200).json({"success":false,
                "message":"e-mail ja cadastrado na plataforma",
                "data":""}); 
             }else{
                    
                            /** Se existir com email e id atualiza se nao faz outra verificacao */
                        let usuario = req.body
                        usuario.senha = usuario.senha.length == 32 ? usuario.senha : encMd5(usuario.senha)
                        sequelize.transaction(t=>{

                            return  model.update({
                                "nome":usuario.nome,
                                "email":usuario.email,
                                "funcao":usuario.funcao,
                                "senha":usuario.senha,
                                "id_setor":usuario.id_setor,
                                "ativo":usuario.ativo,
                            },{where:{id_usuario:req.params.id},transaction:t}).then(usuario=>{
                                let temp = []
                                id_usuario = req.params.id
                                for(i=0;i<req.body.instituicoes_vinculadas.length;i++){
                                    temp.push({
                                        id_usuario:id_usuario,
                                        id_instituicao:req.body.instituicoes_vinculadas[i],
                                        principal:false
                                    })
                                }
             
                                 //** Insere a empresa principal do usuario */
                                 temp.push({
                                     id_usuario:id_usuario,
                                     id_instituicao: req.body.instituicao_selecionada,
                                     principal:true
                                 })
                                 console.log(temp)
             
                                /** Deleta as instituicoes */
                               return model_rl.destroy({
                                    where:{
                                        id_usuario:req.params.id
                                    },transaction:t
                                }).then(data=>{
                                    /** Depois de deletar as instituicoes */
                                    return model_rl.bulkCreate(temp,{transaction:t}).then(data=>{
                                     let temp_permissoes = []
                                     for(i=0;i<req.body.permissoes.length;i++){
                                         temp_permissoes.push({
                                             id_usuario:id_usuario,
                                             id_permissao:req.body.permissoes[i]
                                         })
                                     }
             
                                     return model_rl_permissoes.destroy({
                                         where:{
                                             id_usuario:req.params.id
                                         },transaction:t
                                     }).then(data=>{
                                          /** Insere as permissoes */
                                         return model_rl_permissoes.bulkCreate(temp_permissoes,{transaction:t});
                                     })
                                })
                            })

                    
                       
                        }).then(result =>{
                            return res.status(200).json({"success":true,
                            "message":"Usuario atualizado com sucesso.",
                            "data":""}); 
                        }).catch(error =>{
                            return res.status(500).json({"success":false,
                            "message":"Falha interna de servidor.",
                            "data":error}); 
                        })
                    }) 
                  
             }
        
        });

    }
})
}
/** 
 * Metodo par desativar um usuario
 */
exports.DesativarUsuario = (req,res,next)=>{
     model.update({"ativo":false},{
         where:{
             id_usuario:req.params.id
         }
     }).then(result=>{
        return res.status(200).json({"success":true,
        "message":"Usuario desativado com sucesso.",
        "data":""}); 
     }).catch(error =>{
        return res.status(500).json({
            "success":false,
            "message":"Falha interna de servidor.",
            "data":""}); 
     })
}

/**
 * Obter usuarios por setor e instituicao
 */

 exports.ObterUsuarioBySetor = (req,res,next)=>{
     console.log(req.params)
     sequelize.query(`select * from obter_funcionarios_por_setor_e_instituicao(${req.params.id_setor},${req.params.id_instituicao})`).then(data=>{
        return res.status(200).json({"success":true,
        "message":"",
        "data":data[0]}); 
     }).catch(error=>{
        return res.status(500).json({"success":false,
        "message":"Falha interna de servidor",
        "data":""}); 
     })
 }