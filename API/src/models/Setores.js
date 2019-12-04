const Sequelize = require('sequelize');
const sequelize = require('../../config/Databases');

const Model = Sequelize.Model;

class Setores extends Model{}

module.exports = () => {
    Setores.init({
       id_setor:{
           type:Sequelize.BIGINT,
           allowNull:false,
           primaryKey:true,
           autoIncrement:true
       },
       nome:{
           type:Sequelize.STRING(200),
           allowNull:false,
       },
       info_adicionais:{
        type:Sequelize.STRING(200),
        allowNull:false,
       },
       id_instituicao:{
        type:Sequelize.BIGINT,
        allowNull:false,
       },
       id_icone:{
        type:Sequelize.BIGINT,
        allowNull:false,
       },
       ativo:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
       }
    },{
        sequelize,
        modelName:"setores",
        freezeTableName:true,
        timestamps:false,
        force:false
    }
    )
    Setores.sync()
    return Setores
}