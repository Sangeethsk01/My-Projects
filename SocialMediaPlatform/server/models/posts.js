module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define("posts",{
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return posts;
}