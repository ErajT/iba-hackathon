const express = require('express');
const router = express.Router();
const MaterialHandler = require('../Controllers/MaterialControllers');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/addMaterial')
    .post(upload.single('File'), MaterialHandler.createMaterial);
    
router.route('/getMaterialByCollectionID/:collectionId')
    .get(MaterialHandler.getMaterialsByCollectionID);

router.route('/deleteMaterial/:materialId')
    .delete(MaterialHandler.deleteMaterial);

router.route('/getMaterialById/:materialId')
    .get(MaterialHandler.getMaterialByMaterialID);

module.exports = router;