const Sequelize = require('sequelize');
const sequelize = require('../../config/Databases');

const Model = Sequelize.Model;

class RlSetoresTotem extends Model{}

module.exports = () => {
    RlSetoresTotem.init({
       id_totem:{
           type:Sequelize.BIGINT,
           allowNull:false,
           primaryKey:true,
           autoIncrement:true
       },
       id_setor:{
           type:Sequelize.BIGINT,
           allowNull:false,
       },
       id_instituicao:{
        type:Sequelize.BIGINT,
        allowNull:false,
       }
    },{
        sequelize,
        modelName:"rl_setores_totem",
        freezeTableName:true,
        timestamps:false,
        force:false
    }
    )
    RlSetoresTotem.sync()
    return RlSetoresTotem
}