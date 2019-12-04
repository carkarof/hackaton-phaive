const Sequelize = require('sequelize');
const sequelize = require('../../config/Databases');

const Model = Sequelize.Model;

class Instituicoes extends Model{}

module.exports = () => {
    Instituicoes.init({
    id_instituicao:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    nome:{
        type:Sequelize.STRING(200),
        allowNull:false
    },
    endereco:{
        type:Sequelize.STRING(800),
        allowNull:false
    },
    info_adicional:{
        type:Sequelize.STRING(2000),
        allowNull:false
    },
    foto_capa_desktop:{
        type:Sequelize.STRING(1000),
        allowNull:false
    },
    foto_perfil_totem:{
        type:Sequelize.STRING(1000),
        allowNull:false
    },
    foto_capa_totem:{
        type:Sequelize.STRING(1000),
        allowNull:false
    },
    id_usuario:{
        type:Sequelize.BIGINT,
        allowNull:false
    },
    data_cadastro:{
        type:Sequelize.DATE,
        allowNull:false
    },
    logo_empresa:{
        type:Sequelize.STRING(200),
        allowNull:false
    },
},{
    sequelize,
    modelName:"instituicoes",
    freezeTableName:true,
    timestamps:false,
    force:false
})
Instituicoes.sync();
 return Instituicoes
}