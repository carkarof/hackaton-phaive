let config = require("./JwtConfig");
let jwt_simple = require("jwt-simple")

function VerificarAutorizacao(req,res,next){
     
     let headers = req.headers
     let token = req.headers.authorization.split(" ")
     let token_payload = jwt_simple.decode(token[1],config.jwtSecret)
     //SE FOR O MASTER E CONCENDIDA AUTORIZACAO FULL
     if(token_payload.master){
         return next()
     }else{
        // //SE NAO FOR VERIFICAR SE O MESMO TEM ACESSO A FUNCIONALIDADE 
        // let permissoes = token_payload.meta.permissoes
        // let auth = false 
        // permissoes.map((item)=>{
            
        // })
        
        // res.send(token_payload)

        return res.status(401).json({
            auth:false,
            message:"nao foi permitido acessar teste recurso."
        })

     }

}

module.exports = VerificarAutorizacao