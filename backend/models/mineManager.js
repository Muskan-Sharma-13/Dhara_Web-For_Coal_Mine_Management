const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Dhara');

const mineManagerSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    role: {
        type: String,
        default: "Mine Manager"
    },
    shiftIncharge: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'shiftIncharge'
        }
    ],
    mines: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'mine'
        }
    ],
    task: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'task'
        }
    ],
    job: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'job'
        }
    ],
    notif: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'notif'
        }
    ],
    team: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'team'
        }
    ]
});

module.exports = mongoose.model('mineManager', mineManagerSchema);