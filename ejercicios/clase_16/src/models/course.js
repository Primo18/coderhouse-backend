import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: { type: String, index: true },
    code: String,
    description: String,
    topics: {
        type: Array,
        default: []
    },
    students: {
        type: Array,
        default: []
    }
});

const courseModel = mongoose.model("courses", courseSchema);
export default courseModel;