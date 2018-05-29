const router = require("express").Router();
const taskController = require("../../controllers/taskController");

router.route("/")
    .get(taskController.findAll)
    .post(taskController.create);

router.route("/:id")
    .get(taskController.findbyId)
    .put(taskController.update)
    .delete(taskController.remove);

module.exports = router;