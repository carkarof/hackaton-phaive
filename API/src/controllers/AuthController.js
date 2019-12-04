/** Referencias */
let jwt_simple = require('jwt-simple')
let config = require('../../config/JwtConfig')
const model_usuario_master = require('../models/UsuarioMaster')();
const model_usuario_instituicao = require('../models/UsuarioInstituicoes')();
const model_rl_usuario_permissoes = require('../models/RlUsuarioPermissoes')();
const model_rl_instituicao_usuarios = require('../models/RlInstituicoesUsuarios')();
const encMd5 = require('md5');
const sequelize = require('../../config/Databases');


exports.post = (req,res,next)=>{ 
  
 try{
    model_usuario_master.findOne({
        where:{
            email:req.body.email,
            senha:encMd5(req.body.senha),
            ativo:true
        }
    }).then(data=>{
         if(data != null){
            /** Se cair aqui sera o usuario master do sistema */

            let token_content = {
                id_usuario:data.id_usuario,
                email:data.email,
                master:true,
                acesso_admin:false
            }

            let payload = {
                token:jwt_simple.encode(token_content,config.jwtSecret),
                id_usuario: data.id_usuario,
                nome:data.nome,
                foto_perfil:data.foto_perfil,
                master:true,
                acesso_admin:false
            }
            
            res.status(200).json({
                "success":true,
                "message":"",
                "data":payload
            })
         }else{

             model_usuario_instituicao.findOne({
                where:{
                    email:req.body.email,
                    senha:encMd5(req.body.senha),
                    ativo:true
                }
             }).then(data=>{
                 if(data != null){
                      /** Se cair aqui e um usuario comum do sistema */
                        let payload = {
                            id_usuario: data.id_usuario,
                            nome:data.nome,
                            master:false,
                            token:"",
                            acesso_admin:false,
                            meta:null
                        }

                        payload.email = data.email

                        let id_usuario = data.id_usuario
                        
                        let usuario = {permissoes:[],instituicoes_vinculadas:[]}
                
                        sequelize.query(`select * from sp_obter_permissoes_usuarios(${id_usuario},'COMPLETO')`)
                        .then(data=>{
                            
                            usuario.permissoes = data[0]
                            sequelize.query(`select * from sp_obter_instituicoes_vinculadas_usuario(${id_usuario})`).then(data=>{
                                usuario.instituicoes_vinculadas = data[0]
                                payload.meta = usuario

                                /** verifica se o usuario tem acesso a alguma permissao administrativa */
                                sequelize.query(`select * from sp_obter_permissoes_usuarios(${id_usuario},'ADMIN')`).then(data=>{

                                    if(data[1].rowCount > 0){
                                        payload.acesso_admin = true
                                    }
                                    
                                    payload.token = jwt_simple.encode(payload,config.jwtSecret)

                                    return res.status(200).json({
                                        "success":true,
                                        "message":"",
                                        "data":payload
                                    }); 


                                })

                                
                            })
                        })

                 }else{
                    res.status(200).json({
                        "success":false,
                        "message":"credencias não encontradas, tente novamente.",
                        "data":""
                    })
                 }
             })


         }

    }).catch(error =>{
        return res.status(500).json({
            "success":false,
            "message":"Falha interna de servidor.",
        }); 
    })
}catch(e){
    return res.status(400).json({
        "success":false,
        "message":"Requisição incorreta no servidor.",
    }); 
}

}

exports.test = (req,res,next)=>{
    res.send("ok")
}