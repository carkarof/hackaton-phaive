const Sequelize = require('sequelize');
const sequelize = require('../../config/Databases');


const Model = Sequelize.Model;

class Totem extends Model{}

module.exports = () => {
    Totem.init({
       id_totem:{
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
       codigo_config:{
        type:Sequelize.STRING(100),
        allowNull:false,
       },
       id_status:{
        type:Sequelize.BIGINT,
        allowNull:false,
       }
    },{
        sequelize,
        modelName:"totem",
        freezeTableName:true,
        timestamps:false,
        force:false
    }
    )
    Totem.sync()
    return Totem
}