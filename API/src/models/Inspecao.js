const Sequelize = require('sequelize');
const sequelize = require('../../config/Databases');

const Model = Sequelize.Model;

class inspecoes extends Model{}

module.exports = () => {
    inspecoes.init({
    IdInspecao:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    IdEntidade:{
        type:Sequelize.BIGINT,
        allowNull:false
    },
    Fotos:{
        type:Sequelize.STRING(200),
        allowNull:false
    },
    DtRetorno:{
        type:Sequelize.DATE,
        allowNull:false
    },
    DtInspecao:{
        type:Sequelize.DATE,
        allowNull:false
    },
    Anotacoes:{
        type:Sequelize.STRING(1000),
        allowNull:false
    },
    Relatorio:{
        type:Sequelize.STRING(1000),
        allowNull:false
    },
    Status:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }    
},{
    sequelize,
    modelName:"Inspecao",
    freezeTableName:true,
    timestamps:false,
    force:false
})
inspecoes.sync();
 return inspecoes
}