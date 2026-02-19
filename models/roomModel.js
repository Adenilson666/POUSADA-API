
'use strict';

module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        type: {
            type: DataTypes.ENUM('single', 'double', 'suite'),
            allowNull: false
        },

        price_per_night: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },

    }, {
        tableName: 'rooms',
        underscored: true,
        timestamps: true
    });

    Room.associate = function(models) {
        Room.hasMany(models.Reservation, { foreignKey: 'room_id', as: 'reservations' });
    };

    return Room;
};