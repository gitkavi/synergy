const db = require("../models");
// const router = require("express").Router();

module.exports = {
    findAll: (req, res) => {
        db.Task
            .findAll(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log(err));
    },

    findbyId:(req,res) =>{
        db.Task.findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => console.log(err));
    },

    findbyUserId:(req,res) => {
        db.Task.findAll({
            where:{
                UserId:req.params.id,
                dueDate: {
                    gte: new Date()
                }
            },
            include:[db.Project]
        }).then(dbModel => {
            console.log(dbModel);
            res.json(dbModel)})
        .catch(err => console.log(err));
    },

    findbyProjectId:(req,res) => {
        console.log("inside findbyProjectId: ", req.params.id);
        db.Task.findAll({
            where:{
                ProjectId:req.params.id
            },
            include:[db.Project]
        }).then(dbModel => {
            res.json(dbModel)})
        .catch(err => console.log(err));
    },

    create:(req, res) => {
        db.Task.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => console.log(err));
    },

    update: (req, res) => {
        db.Task.update( req.body, {
            where:{
                id:req.params.id
            }
        }).then(dbModel => res.json(dbModel))
        .catch(err => console.log(err));
    },

    remove: (req, res) => {
        db.Task
            .destroy({
                where:{
                    id:req.params.id
                }
            }).then(dbModel => dbModel.remove())
            .catch(err=>cosole.log(err));
    }
};
