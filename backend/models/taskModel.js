const { Timestamp } = require('firebase/firestore');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/Dhara');

const taskSchema = mongoose.Schema({
    title: String,
    description: String,
    type: String,
    priority: String,
    start: Date,
    end: Date,
    mineManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mineManager',
        default: null,
    },
    completed:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('task', taskSchema);