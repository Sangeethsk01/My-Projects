module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users",{
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }); 


    Users.associate = (models) => {
        // Association with Posts
        Users.hasMany(models.posts, {
            onDelete: "cascade",
        });

        // Association with Likes
        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        });

        // Association with Comments
        Users.hasMany(models.Comments, {
            onDelete: "cascade",
        });
    };


    return Users;
};