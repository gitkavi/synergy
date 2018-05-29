const db = require('../models')

module.exports = {
    findAll: (req, res)=>{
        db.Comment
            .findAll(req.query)
            .then(dbComment=>res.json(dbComment))
            .catch(err=>console.log(err))
    },
    findByTaskId: (req, res)=>{
        db.Comment
            .findAll({
                where:{
                    TaskId: req.params.id
                }
            })
            .then(dbComment=>res.json(dbComment))
            .catch(err=>console.log(err))
    },
    create: (req, res) => {
        db.Comment.create(req.body)
            .then(dbComment => res.json(dbComment))
            .catch(err => console.log(err));
    }

}