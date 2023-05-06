const express = require('express')
const router = express.Router();
const Quiz = require("../models/quiz");
router.post('/addtest', async (req, res) => {
    try {
      const newTest = await new Quiz({
        question: req.body.question,
        questionType: req.body.testType,
        yesOrnoType: req.body.yesOrnoresptype,
      }).save();
      res.json(newTest);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  });
  module.exports=router