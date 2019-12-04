const Sequelize = require('sequelize');
const sequelize = require('../../config/Databases');

const Model = Sequelize.Model;

class RlInstituicoesTotem extends Model{}

module.exports = () => {
    RlInstituicoesTotem.init({
       id_totem:{
           type:Sequelize.BIGINT,
           allowNull:false,
           primaryKey:true,
           autoIncrement:true
       },
       id_instituicao:{
           type:Sequelize.BIGINT,
           allowNull:false,
           primaryKey:true
       },
       principal:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
       },
       ordem:{
           type:Sequelize.BIGINT,
           allowNull:false
       }
    },{
        sequelize,
        modelName:"rl_instituicoes_totem",
        freezeTableName:true,
        timestamps:false,
        force:false
    }
    )
    RlInstituicoesTotem.sync()
    return RlInstituicoesTotem
}