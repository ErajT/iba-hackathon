const express = require('express');
const router = express.Router();
const FlashCardHandler = require('../Controllers/FlashCardControllers');

router.route('/generateFlashcard/:id')
    .get(FlashCardHandler.generateFlashcards)

module.exports = router;