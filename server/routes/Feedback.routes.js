const express = require('express');
const router = express();
const verify = require('../verifyToken');

const feedbackControllers = require('../controllers/Feedback.controllers');

// @routes api/feedback
// @desc create feedback
// @access private
router.post("/", verify, feedbackControllers.createFeedback);

module.exports = router;