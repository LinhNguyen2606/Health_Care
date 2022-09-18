'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Conversation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Conversation.init(
        {
            doctorId: DataTypes.INTEGER,
            patientId: DataTypes.INTEGER,
        },

        {
            sequelize,
            modelName: 'Conversation',
            timestamps: true,
        },
    );
    return Conversation;
};
