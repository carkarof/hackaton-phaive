const Sequelize = require('sequelize');
const sequelize = require('../../config/Databases');

const Model = Sequelize.Model;

class RlInstituicoesUsuarios extends Model{}

module.exports = () => {
    RlInstituicoesUsuarios.init({
       id_usuario:{
           type:Sequelize.BIGINT,
           allowNull:false,
           primaryKey:true
       },
       id_instituicao:{
        type:Sequelize.BIGINT,
        allowNull:false,
        primaryKey:true
      },
      principal:{
        type:Sequelize.BOOLEAN,
        allowNull:false
      }
    },{
        sequelize,
        modelName:"rl_instituicoes_usuarios",
        freezeTableName:true,
        timestamps:false,
        force:false
    }
    )
    RlInstituicoesUsuarios.sync()
    return RlInstituicoesUsuarios
}