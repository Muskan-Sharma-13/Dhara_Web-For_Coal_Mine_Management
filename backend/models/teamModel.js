const mongoose = require('mongoose');

//mongoose.connect('mongodb://127.0.0.1:27017/Dhara');

const teamSchema = mongoose.Schema({
    name: String,
    description: String,
    shiftIncharge: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'shiftIncharge'
        }
    ],
    mineManager:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'mineManager'
    },
    mine:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'mine'
        },
    job: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'job'
        }
    ]
});

module.exports = mongoose.model('team', teamSchema);