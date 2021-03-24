const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    entry: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        referencese: {
            model: 'user',
            key: 'id'
        },
    },
    journal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'journal',
            key: 'id'
        },
    },
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments'

});

module.exports = Comments;