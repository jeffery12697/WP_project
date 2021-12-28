import mongoose from 'mongoose'
 
const Schema = mongoose.Schema;
const ProblemSchema = new Schema({
    course_id: String,
    problem_id: String,
    title: String,
    description: String,
    tags: [String],
    teacher: String,
    publisher: String,
    likes: [String],
});
const Problem = mongoose.model('Problem', ProblemSchema);

export default Problem;