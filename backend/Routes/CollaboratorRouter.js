const express = require('express');
const router = express.Router();
const CollaboratorHandler = require("../Controllers/CollaboratorControllers")

router.route('/addCollaborator')
    .post(CollaboratorHandler.addCollaborators);

router.route('/deleteCollaborator')
    .delete(CollaboratorHandler.deleteCollaborator);

router.route('/pendingCollaborator')
    .post(CollaboratorHandler.pending);


module.exports = router;
