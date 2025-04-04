const Quiz = require('../models/QuizModel');
const asyncHandler = require('express-async-handler');

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Faculty
const createQuiz = asyncHandler(async (req, res) => {
    const { quiz_id, course_id, quiz_title, quiz_description, google_form_link, end_time } = req.body;
    
    if (!quiz_id || !course_id || !quiz_title || !quiz_description || !google_form_link || !end_time) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const quiz = new Quiz({
            quiz_id,
            course_id,
            quiz_title,
            quiz_description,
            google_form_link,
            end_time
        });

        const createdQuiz = await quiz.save();
        res.status(201).json(createdQuiz);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const getQuizzes = asyncHandler(async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('course_id');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = { createQuiz, getQuizzes };
