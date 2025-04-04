const express = require('express');
const router = express.Router();
const { createQuiz, getQuizzes } = require('../controllers/quizController');

// Route to create a quiz
router.post('/', createQuiz);

// Route to get all quizzes
router.get('/', getQuizzes);

module.exports = router;
