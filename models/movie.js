module.exports = function (sequelize, DataTypes) {
    var Movie = sequelize.define("Movie", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_path: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Movie.associate = function (models) {
        Movie.hasMany(models.Post, {
            foreignKey: {
                allowNull: false
            }
        });
        Movie.belongsToMany(models.User, { through: models.UserMovie });
    };
    
    return Movie;
};