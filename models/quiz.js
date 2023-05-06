const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const quizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    yesOrnoType: {
      type: Boolean,
    },
    anwers:[
        {type:String},
    ]
    ,
    questionType: {
      type: String,
      required: true,
      enum: [
        "Borderline",
        "Narcissic Personality Disorder",
        "Paranoid Personality Disorder",
      ],
    },
    Doctor: { type: ObjectId, ref: "Doctor" },
  },
  {
    timesstamps: true,
  }
);
module.exports = mongoose.model("Quiz", quizSchema);

