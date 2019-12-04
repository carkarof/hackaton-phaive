const Sequelize = require('sequelize');
const sequelize = require('../../config/Databases');

const Model = Sequelize.Model;

class UsuarioIntituicoes extends Model{}

module.exports = () => {
    UsuarioIntituicoes.init({
       id_usuario:{
           type:Sequelize.BIGINT,
           allowNull:false,
           primaryKey:true,
           autoIncrement:true
       },
       nome:{
           type:Sequelize.STRING(200),
           allowNull:false,
       },
       email:{
        type:Sequelize.STRING(200),
        allowNull:false,
       },
       funcao:{
        type:Sequelize.STRING(100),
        allowNull:false,
       },
       senha:{
        type:Sequelize.STRING(200),
        allowNull:false,
       },
       id_setor:{
        type:Sequelize.BIGINT,
        allowNull:false,
       },
       ativo:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
       },
    },{
        sequelize,
        modelName:"usuario_instituicoes",
        freezeTableName:true,
        timestamps:false,
        force:false
    }
    )
    UsuarioIntituicoes.sync()
    return UsuarioIntituicoes
}