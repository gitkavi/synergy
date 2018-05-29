const router = require("express").Router();
const projectsController = require("../../controllers/projectsController");

router.route("/:id")
    .get(projectsController.findbyUserId);

module.exports = router;