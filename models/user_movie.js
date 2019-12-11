module.exports = function (sequelize, DataTypes) {
    var UserMovie = sequelize.define("UserMovie", {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        // like:{
        //     boolean:DataTypes.false,
        //     allowNull:true
        // }
    });
    
    return UserMovie;
};