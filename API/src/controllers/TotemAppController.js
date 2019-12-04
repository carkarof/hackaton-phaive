const sequelize = require("../../config/Databases")

exports.AuthTotem = (req,res,next)=>{
    sequelize.query(`select codigo_config from totem where codigo_config = '${req.body.ident}'`).then(result=>{
        if(result[1].rowCount == 1){
            return res.status(200).json({
                "success":true,
                "message":"",
                "data":{"ident":req.body.ident}
            })
        }else{
            return res.status(400).json({
                "success":false,
                "message":"Codigo de confirmação nao encontrado, tente novamante ou  confira os dados no painel administrativo.",
                "data":""
            })
        }
    })
}

exports.GetEmpresasTotem = (req,res,next)=>{
        
     sequelize.query(`
            select
            i.id_instituicao,
            i.nome,
            i.foto_perfil_totem,
            i.foto_capa_totem,
            rl_it.principal
        from
            instituicoes i
        join rl_instituicoes_totem rl_it on
            i.id_instituicao = rl_it.id_instituicao
        join totem t on
            t.id_totem = rl_it.id_totem
        where
            t.codigo_config = '${req.body.ident}' order by rl_it.ordem ASC
     `).then(result=>{
          
        if(result[1].rowCount > 0){
            return res.status(200).json({
                "success":true,
                "message":"",
                "data":result[0]
            })
        }else{
            return res.status(400).json({
                "success":false,
                "message":"Não há empresas vinculadas a este totem, acesse o painel administrativo para efetuar o cadastro.",
                "data":""
            })
        }



     }).catch(error =>{
        return res.status(500).json({
            "success":false,
            "message":"Falha interna de servidor,tente novamente ou contate o nosso suporte.",
            "data":""
        })
     })
}



exports.GetSetoresEmpresa = (req,res,next)=>{
        
    sequelize.query(`
    select
	s.id_setor,
	s.nome,
	si.descricao as icone	
from
	instituicoes i
join rl_instituicoes_totem rl_it on
	i.id_instituicao = rl_it.id_instituicao
join totem t on
	t.id_totem = rl_it.id_totem
join rl_setores_totem rl_st on rl_st.id_totem = t.id_totem
join setores s on s.id_setor = rl_st.id_setor and s.id_instituicao = i.id_instituicao
join setores_icone si on si.id_icone = s.id_icone
where
	t.codigo_config = '${req.body.ident}' and I.id_instituicao = ${req.body.id_instituicao}
    `).then(result=>{
         
       if(result[1].rowCount > 0){
           return res.status(200).json({
               "success":true,
               "message":"",
               "data":result[0]
           })
       }else{
           return res.status(400).json({
               "success":false,
               "message":"Não há setores vinculados a este totem, acesse o painel administrativo para efetuar o cadastro.",
               "data":""
           })
       }



    }).catch(error =>{
       return res.status(500).json({
           "success":false,
           "message":"Falha interna de servidor,tente novamente ou contate o nosso suporte.",
           "data":""
       })
    })
}