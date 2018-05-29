module.exports = function (sequelize, DataTypes) {
    const Comment = sequelize.define("Comment", {
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    Comment.associate = function(models) {
        Comment.belongsTo(models.Task, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Comment;
}