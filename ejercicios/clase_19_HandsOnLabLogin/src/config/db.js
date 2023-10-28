import mongoose from 'mongoose';

const uri = 'mongodb+srv://primo:Rust.1830@devcluster.9xzyesc.mongodb.net/handsonlablogin?retryWrites=true&w=majority';

const connection = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export default connection;
