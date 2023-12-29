import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    password: String,
    age: Number,
    role: { type: String, default: 'user' },
});

const User = mongoose.model('User', UserSchema);

export default User;