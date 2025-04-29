const express = require('express');
const router = express.Router();
const FlashCardHandler = require('../Controllers/FlashCardControllers');

router.route('/generateFlashcard/:id')
    .get(FlashCardHandler.generateFlashcards);

router.route('/talkToPdf')
    .post(FlashCardHandler.talkToPDF);

router.route('/notifyStatus')
    .post(FlashCardHandler.payFastNotify);

module.exports = router;