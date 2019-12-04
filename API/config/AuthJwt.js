const passport = require('passport')
const passport_jwt = require('passport-jwt')
const config = require('./JwtConfig');
const extract_jwt = passport_jwt.ExtractJwt
const strategy = passport_jwt.Strategy
const params = {
    secretOrKey:config.jwtSecret,
    jwtFromRequest:extract_jwt.fromAuthHeaderAsBearerToken()
}

const sequelize = require("../config/Databases")

module.exports = function(){

    let Strategy = new strategy(params,function(payload,done){
      
        //logica para autenticacao
      sequelize.query(`select * from sp_verificar_usuario_existe(${payload.id_usuario},'${payload.email}')`).then(data=>{
           if(data[1].rowCount == 1){
               
              //verificar as permissoes do usuario 
            
               return done(null,payload)
           
           
           
            }else{
               const error = {auth:false,message:"Falha ao autenticar usuario."}
               return done(JSON.stringify(error),null)
           }
      })



    });

    passport.use(Strategy)

    return {
        initialize:function(){
            return passport.initialize()
        },
        authenticate:function(){
            return passport.authenticate("jwt",config.jwtSession)
        }
    }

}
