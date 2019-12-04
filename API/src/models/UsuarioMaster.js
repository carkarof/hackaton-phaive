const Sequelize = require('sequelize');
const sequelize = require('../../config/Databases');

const Model = Sequelize.Model;

class UsuarioMaster extends Model{}

module.exports = () => {
  UsuarioMaster.init({
    id_usuario:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    nome:{
        type:Sequelize.STRING(200),
        allowNull:false
    },
    email:{
        type:Sequelize.STRING(100),
        allowNull:false
    },
    senha:{
        type:Sequelize.STRING(255),
        allowNull:false
    },
    telefone:{
        type:Sequelize.STRING(20),
        allowNull:false
    },
    ativo:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    data_cadastro:{
        type:Sequelize.DATE,
        allowNull:false,
    },
    foto_perfil:{
        type:Sequelize.STRING(200),
        allowNull:true
    }
},{
    sequelize,
    modelName:"usuario_master",
    freezeTableName:true,
    timestamps:false,
    force:false
})
 UsuarioMaster.sync();
 return UsuarioMaster
}