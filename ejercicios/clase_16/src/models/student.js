import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    first_name: { type: String, index: true },
    last_name: String,
    email: { type: String, unique: true, required: true },
    gender: String,
    courses: {
        type: [
            {
                course: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "courses"
                },
            }

        ],
        default: []
    }
});

// Middleware to populate the courses array in the student collection
studentSchema.pre("find", function () {
    this.populate("courses.course");
});

studentSchema.pre("findOne", function () {
    this.populate("courses.course");
});

const studentModel = mongoose.model("students", studentSchema);
export default studentModel;