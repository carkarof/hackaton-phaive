const Sequelize = require('sequelize');
const sequelize = require('../../config/Databases');

const Model = Sequelize.Model;

class RlUsuariosPermissoes extends Model{}

module.exports = () => {
    RlUsuariosPermissoes.init({
       id_usuario:{
           type:Sequelize.BIGINT,
           allowNull:false,
           primaryKey:true
       },
       id_permissao:{
        type:Sequelize.BIGINT,
        allowNull:false,
        primaryKey:true
      }
    },{
        sequelize,
        modelName:"rl_usuarios_permissoes",
        freezeTableName:true,
        timestamps:false,
        force:false
    }
    )
    RlUsuariosPermissoes.sync()
    return RlUsuariosPermissoes
}