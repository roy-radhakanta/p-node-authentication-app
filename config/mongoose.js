const mongoose = require('mongoose');
const uri = "mongodb+srv://radhakantaroydev:uPHiIFzV9bM77TzL@cluster0.xuqscfk.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to database"));


db.once('open', function(){
    console.log("Connected to db: 3000")
});


module.exports = db;