module.exports = function(sequelize, DataTypes){
    const Project = sequelize.define("Project", {
        projectname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1]
            }
        }      
    },{
        timestamps:false
    });

    Project.associate = function(models){
        Project.belongsTo(models.User,{
            foreignKey:{
                allowNull:false
            }
        });
    };

    return Project;
}