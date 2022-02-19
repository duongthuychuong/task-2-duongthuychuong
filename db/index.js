const mongoose = require('mongoose')
const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.6dsxx.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, res) {
        try {
            console.log('Connected to Database');
        } catch (err) {
            throw err;
        }
    });