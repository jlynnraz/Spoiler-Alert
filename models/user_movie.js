module.exports = function (sequelize, DataTypes) {
    var UserMovie = sequelize.define("UserMovie", {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });
    
    return UserMovie;
};