module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_path: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Post.associate = function (models) {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Post.belongsTo(models.Movie, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
};