/**
 * Instancia sequelizer
 */
const Sequelize  = require('sequelize');
/**
 * Configuracoes de banco de dados
 */
const config_sequelize = new Sequelize('phaive','root','',{    
    dialect:'mysql'
})


module.exports = config_sequelize;