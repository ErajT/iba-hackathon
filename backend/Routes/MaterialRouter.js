const express = require('express');
const router = express.Router();
const MaterialHandler = require('../Controllers/MaterialControllers');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/addMaterial')
    .post(upload.single('material'), AdminHandler.addMaterial);  


module.exports = router;