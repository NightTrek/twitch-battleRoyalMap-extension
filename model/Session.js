const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const SessionSchema = new Schema({
    userId: String,
    sessionVoidTime: String,
    voteArray: {
        type:Array,
        required:true
    }
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
