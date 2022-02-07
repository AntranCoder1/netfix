const express = require('express');
const router = express();
const verify = require('../verifyToken');

const feedbackControllers = require('../controllers/Feedback.controllers');

// @routes api/feedback
// @desc create feedback
// @access private
router.post("/", verify, feedbackControllers.createFeedback);

// @routes api/feedback
// @desc get all feedback
// @access private
router.get("/", verify, feedbackControllers.getFeedback);

module.exports = router;