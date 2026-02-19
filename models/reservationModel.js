'use strict';

module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        room_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        check_in: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        check_out: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
            allowNull: false,
            defaultValue: 'pending'
        }
    }, {
        tableName: 'reservations',
        underscored: true,
        timestamps: true
    });

    Reservation.associate = function(models) {
        Reservation.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        Reservation.belongsTo(models.Room, { foreignKey: 'room_id', as: 'room' });
    };

    return Reservation;
};