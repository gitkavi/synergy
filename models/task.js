module.exports = function(sequelize, DataTypes){
    const Task = sequelize.define("Task", {
        taskname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1]
            }
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        status: {
            type: DataTypes.STRING,
            allowNull:false,
            
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },{
        timestamps:false
    });

    Task.associate = function(models){
        Task.belongsTo(models.User,{
            foreignKey:{
                allowNull:false
            }
        });

        Task.belongsTo(models.Project,{
            foreignKey:{
                allowNull:false
            }
        });
    };

    return Task;
}