const sequelize = require("../../config/Databases")
const OneSignal = require('onesignal-node')

/**
 * Contem todo o sistema de notificacao em tempo real da aplicacao
 */
module.exports = (servidor)=>{
     let socket_server = require('socket.io')(servidor)
     

     var sendNotification = function(data) {
        var headers = {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Basic M2YyYWRiMzAtMjA5Yy00ZTBiLWIzZGYtNmMwN2I2NTliZmJm"
        };
        
        var options = {
          host: "onesignal.com",
          port: 443,
          path: "/api/v1/notifications",
          method: "POST",
          headers: headers
        };
        
        var https = require('https');
        var req = https.request(options, function(res) {  
          res.on('data', function(data) {
            console.log("Response:");
            console.log(JSON.parse(data));
          });
        });
        
        req.on('error', function(e) {
          console.log("ERROR:");
          console.log(e);
        });
        
        req.write(JSON.stringify(data));
        req.end();
      };
      
    //   var message = { 
    //     app_id: "9c803710-31ad-454d-85ae-ba1f31c5ec28",
    //     contents: {"en": `${mensagem}`},
    //     included_segments: ["All"]
    //   }; 
                            
         
      
     socket_server.on("connection",function(socket){
        
        /**Registrar totem */
        socket.on("RegistrarTotemOnline",(ident)=>{
            sequelize.query(`UPDATE totem set socket_id='${socket.id}',id_status=1 WHERE codigo_config='${ident}'`)
         })        

        /** Registrar Usuario */
         socket.on("RegistrarUsuarioOnline",(id_usuario)=>{
             console.log("registro usuario")
             sequelize.query(`UPDATE usuario_instituicoes set socket_id='${socket.id}' WHERE id_usuario = ${id_usuario}`)
         })

         /** Registrar Usuario celular */
         socket.on("RegistrarUsuarioCelular",(payload)=>{
            console.log('device:',payload)
            sequelize.query(`
                UPDATE usuario_instituicoes set socket_id_onesignal='${payload.id_onesignal}' WHERE id_usuario = '${payload.id_usuario}'
            `)
            
         });
         
        /** Enviar notificação para o celular. */
         socket.on("NotificarUsuarioCelular",(payload)=>{                                      
            sequelize.query(`	
            select
                u.nome,
                u.socket_id_onesignal,
                s.nome
            from
                usuario_instituicoes u
            join rl_instituicoes_usuarios rl_i on
                u.id_usuario = rl_i.id_usuario
            join instituicoes i on
                i.id_instituicao = rl_i.id_instituicao
            join setores s on s.id_setor = u.id_setor
            where i.id_instituicao = ${payload.id_instituicao} and u.id_setor = ${payload.id_setor} and u.socket_id_onesignal is not null and u.receber_notificacao = true`).then(result=>{              
               if(result[1].rowCount == 0){
                socket_server.to(socket.id).emit("NotificarSemFuncionarios")                                        
                }else{
                    result[0].map((user)=>{                        
                        let nome =payload.mensagem.nome;
                        let mensagem = payload.mensagem.texto;
                        var message = { 
                            app_id: "9c803710-31ad-454d-85ae-ba1f31c5ec28",
                            language:'Portuguese',
                            headings:{"en":`${nome} está na recepção`},
                            contents: {"en": `${mensagem}`},
                            included_segments: ["All"]
                          }; 
                        payload.mensagem.photo = payload.photo 
                        
                        sendNotification(message)                     
                    })
                }
            })
         })

         /** Enviar notificação para o usuario. */
         socket.on("NotificaUsuariosSetor",(payload)=>{              
            sequelize.query(`	
                    select
                        u.nome,
                        u.socket_id,
                        s.nome
                    from
                        usuario_instituicoes u
                    join rl_instituicoes_usuarios rl_i on
                        u.id_usuario = rl_i.id_usuario
                    join instituicoes i on
                        i.id_instituicao = rl_i.id_instituicao
                    join setores s on s.id_setor = u.id_setor
                    where i.id_instituicao = ${payload.id_instituicao} and u.id_setor = ${payload.id_setor} and u.socket_id is not null and u.receber_notificacao = true`).then(result=>{
                       if(result[1].rowCount == 0){

                        socket_server.to(socket.id).emit("NotificarSemFuncionarios")                        

                        }else{
                            result[0].map((user)=>{
                                payload.mensagem.photo = payload.photo                               
                                socket_server.to(user.socket_id).emit("ReceberNotificacoes",payload.mensagem)
                            })
                        }
                    })

         })

         socket.on("disconnect",()=>{
            sequelize.query(`UPDATE totem set socket_id=NULL,id_status=2 WHERE socket_id='${socket.id}'`)
            sequelize.query(`UPDATE usuario_instituicoes set socket_id=NULL WHERE socket_id = '${socket.id}'`)
         })

     })

}