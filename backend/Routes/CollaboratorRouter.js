const express = require('express');
const router = express.Router();
const CollaboratorHandler = require("../Controllers/CollaboratorControllers")

router.route('/addCollaborator')
    .post(CollaboratorHandler.addCollaborator);


router.route('/deleteCollaborator').delete(CollaboratorHandler.deleteCollaborator)


module.exports = router;
