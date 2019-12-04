const Sequelize = require('sequelize');
const sequelize = require('../../config/Databases');

const Model = Sequelize.Model;

class Permissoes extends Model{}

module.exports = () => {
    Permissoes.init({
       id_permissao:{
           type:Sequelize.BIGINT,
           allowNull:false,
           primaryKey:true,
           autoIncrement:true
       },
       descricao:{
           type:Sequelize.STRING(200),
           allowNull:false,
       },
       tipo_permissao:{
        type:Sequelize.STRING(200),
        allowNull:false,
       },
       descricao_permissao:{
           type:Sequelize.STRING(150),
           allowNull:false
       }
    },{
        sequelize,
        modelName:"permissoes",
        freezeTableName:true,
        timestamps:false,
        force:false
    }
    )
    Permissoes.sync()
    return Permissoes
}