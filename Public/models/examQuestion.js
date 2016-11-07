var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var examQuestionSchema = new Schema({
    examName: String,
    picRoute: String,
    answer: Number,
    description: String,
});


var examQuestion = mongoose.model('examQuestion', examQuestionSchema);

module.exports = examQuestion;