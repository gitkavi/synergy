const db = require("../models");

module.exports = {

    findAll: (req, res) => {
        db.Project
            .findAll(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log(err));
    },

    findbyId: (req,res) =>{
        console.log("Inside project Controller: ", req.params.id);
        db.Project.findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => console.log(err));
    },
    findbyUserId:(req,res) => {
        db.Project.findAll({
            where:{
                UserId:req.params.id
            },
        }).then(dbModel => {
            res.json(dbModel)})
        .catch(err => console.log(err));
    },
    create: (req, res) => {
        console.log("Create Project called");
        db.Project.create(req.body)
        .then(dbModel => {
            console.log(dbModel);
            res.json(dbModel)})
        .catch(err => console.log(err));
    },

    update: (req, res) => {
        console.log("inside update project controller:",req.body);
        db.Project.update( req.body, {
            where:{
                id:req.params.id
            }
        }).then(dbModel => res.json(dbModel))
        .catch(err => console.log(err));
    },

    remove: (req, res) => {
        db.Project
            .destroy({
                where:{
                    id:req.params.id
                }
            }).then(dbModel => dbModel.remove())
            .catch(err=>cosole.log(err));
    }
};
