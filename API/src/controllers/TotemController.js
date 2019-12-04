const sequelize = require('../../config/Databases');
const model_totem = require('../models/Totem')();
const model_rl_setores_totem = require('../models/RlSetoresTotem')();
const model_rl_instituicoes_totem = require('../models/RlInstituicoesTotem')();

exports.ListarTotems = (req,res,next)=>{
    sequelize.query(`select * from sp_obter_totens('${req.params.id}')`)
    .then(result=>{
        return res.status(200).json({
            "success":true,
            "message":"",
            "data":result[0],
            "error":""
        }); 
    }).catch(error =>{
        return res.status(500).json({
            "success":false,
            "message":"Falha interna de servidor.",
            "data":"",
            "error":error
        }); 
    })
}
//METODO PARA CADASTRAR NOVO TOTEM
exports.CadastrarTotem = (req,res,next)=>{
       let instituicoes_vinculadas = req.body.instituicoes_vinculadas
       let departamentos = req.body.departaments
       delete req.body.instituicoes_vinculadas
       delete req.body.departaments 
       let totem = req.body

       sequelize.transaction(t=>{
          //INSERE O TOTEM
          return model_totem.create(totem,{transaction:t}).then(data=>{
              //INSERE OS SETORES
              let deps = []
              departamentos.map((value,index)=>{
                  deps.push({
                      id_totem:data.id_totem,
                      id_setor:value.id_setor,
                      id_instituicao:value.id_inst
                  })
              })
              return model_rl_setores_totem.bulkCreate(deps,{transaction:t}).then(data2=>{
                    //INSERE VINCULO DAS EMPRESAS
                    let companys = []
                    instituicoes_vinculadas.map((value,index)=>{
                        companys.push({
                            id_totem:data.id_totem,
                            id_instituicao:value.id,
                            principal:value.principal,
                            ordem:index+1
                        })
                    })
            
                  return model_rl_instituicoes_totem.bulkCreate(companys,{transaction:t})

              })

          })

       }).then(result =>{
            return res.status(200).json({"success":true,
            "message":"Totem criado com sucesso.",
            "data":""}); 
        }).catch(error =>{
            console.log(error)
            return res.status(500).json({"success":false,
            "message":"Falha interna de servidor.",
            "data":error}); 
        })


}

exports.buscarTotem = (req,res,next) => {
    let retorno = {}
    model_totem.findOne({
        where:{
            id_totem:req.params.id
        }
    }).then(data=>{
        retorno.geral = data
        return sequelize.query(`select rl_it.id_instituicao from rl_instituicoes_totem rl_it join totem t on rl_it.id_totem = T.id_totem
        join instituicoes i on i.id_instituicao = rl_it.id_instituicao where t.id_totem = ${req.params.id}`).then(data2=>{
           
            retorno.instituicoes_vinculadas = data2[0]
           sequelize.query(`select s.id_setor,s.nome as nome_setor,i.nome as nome_inst,i.id_instituicao,si.descricao as icone 
           from setores s join setores_icone si
           on s.id_icone = si.id_icone join instituicoes i on i.id_instituicao = s.id_instituicao 
           join rl_setores_totem rl_st on rl_st.id_setor = s.id_setor join totem t on t.id_totem = rl_st.id_totem
           where t.id_totem =${req.params.id}`).then(data3=>{
            retorno.setores = data3[0]
            return res.status(200).json({"success":true,
            "message":"",
            "data":retorno});

           })
             
        })
        
    })
}

exports.AtualizarTotem = (req,res,next)=>{
    let instituicoes_vinculadas = req.body.instituicoes_vinculadas
    let departamentos = req.body.departaments
    delete req.body.instituicoes_vinculadas
    delete req.body.departaments 
    let totem = req.body

    sequelize.transaction(t=>{

        return model_totem.update(req.body,{where:{
            id_totem:req.params.id
        },transaction:t}).then(data=>{
            //DELETE RL_SETORES_TOTEM
            return model_rl_setores_totem.destroy({where:{
                id_totem: req.params.id
            },transaction:t}).then(data=>{
                //INSERE OS SETORES
              let deps = []
              departamentos.map((value,index)=>{
                  deps.push({
                      id_totem:req.params.id,
                      id_setor:value.id_setor,
                      id_instituicao:value.id_instituicao
                  })
              })
              return model_rl_setores_totem.bulkCreate(deps,{transaction:t}).then(data2=>{
                   return model_rl_instituicoes_totem.destroy({where:{
                      id_totem:req.params.id
                   },transaction:t}).then(data=>{
                        //INSERE VINCULO DAS EMPRESAS
                    let companys = []
                    instituicoes_vinculadas.map((value,index)=>{
                        companys.push({
                            id_totem:req.params.id,
                            id_instituicao:value.id,
                            principal:value.principal,
                            ordem:index+1
                        })
                    })
                    return model_rl_instituicoes_totem.bulkCreate(companys,{transaction:t})
                   })
            
              })

            })
        })


    }).then(result =>{
        return res.status(200).json({"success":true,
        "message":"Totem atualizado com sucesso.",
        "data":""}); 
    }).catch(error =>{
        console.log(error)
        return res.status(500).json({"success":false,
        "message":"Falha interna de servidor.",
        "data":error}); 
    })


}