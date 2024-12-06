const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/Dhara');

const mineSchema = mongoose.Schema({
    name: String,
    Emergency_phone: String,
    location: String,
    TT: {
        type: String,
        default: null,
    },
    blueprint: {
        type: String,
        default: null,
    },
    SMP: {
        type: String,
        default: null,
    },
    mineManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mineManager',
        default: null,
    },
    shiftIncharge: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'shiftIncharge'
        }
    ],
});

module.exports = mongoose.model('mine', mineSchema);