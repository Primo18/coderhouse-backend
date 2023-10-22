import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        first_name: String,
        last_name: String,
        email: String,
        gender: String,
        grade: String,
        group: String,
    }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;