const Sequelize = require('sequelize');
const sequelize = require('../../config/Databases');

const Model = Sequelize.Model;

class SetoresIcones extends Model{}

module.exports = () => {
    SetoresIcones.init({
       id_icone:{
           type:Sequelize.BIGINT,
           allowNull:false,
           primaryKey:true,
           autoIncrement:true
       },
       descricao:{
           type:Sequelize.STRING(200),
           allowNull:false,
       }
    },{
        sequelize,
        modelName:"setores_icone",
        freezeTableName:true,
        timestamps:false,
        force:false
    }
    )
    SetoresIcones.sync()
    return SetoresIcones
}