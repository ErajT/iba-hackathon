const express = require('express');
const router = express.Router();
const CollectionHandler = require('../Controllers/CollectionControllers');

router.route('/createCollection')
    .post(CollectionHandler.createCollection);

router.route('/getCollectionById/:id')
    .get(CollectionHandler.getCollectionById);

router.route('/deleteCollection/:id')
    .delete(CollectionHandler.deleteCollection);

router.route('/getPublicCollections')
    .get(CollectionHandler.getPublicCollections);

router.route('/getCollectionsByUser/:id')
    .get(CollectionHandler.getCollectionsByUser);

    router.route('/updateCollection/:id')
    .patch(CollectionHandler.updateCollectionDetails);

module.exports = router;
