const router = require("express").Router();
const taskController = require("../../controllers/taskController");

router.route("/:id")
    .get(taskController.findbyProjectId);

module.exports = router;