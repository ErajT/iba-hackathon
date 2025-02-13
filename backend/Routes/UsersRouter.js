const express = require('express');
const router = express.Router();
const UserHandler = require('../Controllers/UsersControllers');

// Routes for User CRUD Operations
router.route('/createUser')
    .post(UserHandler.createUser);

router.route('/createManyUsers')
    .post(UserHandler.createManyUsers);

router.route('/getAllUsers')
    .get(UserHandler.getAllUsers);

router.route('/getUserById/:id')
    .get(UserHandler.getUserById);

router.route('/updateUser/:id')
    .put(UserHandler.updateUser);

router.route('/deleteUser/:id')
    .delete(UserHandler.deleteUser);

module.exports = router;
