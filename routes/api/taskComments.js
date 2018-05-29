const router = require('express').Router();
const controller = require('../../controllers')

router.route("/")
    .get(controller.comments.findAll)
    .post(controller.comments.create)

router.route("/:id")
    .get(controller.comments.findByTaskId)

module.exports = router;