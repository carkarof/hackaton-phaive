/**Arquivo de configurações servidor*/
const server = require('./config/Server');
const db = require('./config/Databases');
const socket_server = require('./src/socket-server/socket');
const fs = require('fs');
const https = require('https');

// const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.hermesagent.com/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/api.hermesagent.com/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/api.hermesagent.com/chain.pem', 'utf8');

// const credentials = {
//         key: privateKey,
//         cert: certificate,
//         ca: ca
// };

// const servidor = https.createServer(credentials,server);
// servidor.listen(3000,()=>{console.log('servidor ok')})
// socket_server(servidor)

const servidor = server.listen(process.env.PORT || 3000,()=>{
        console.log('Servidor OK');
    })

    socket_server(servidor)
