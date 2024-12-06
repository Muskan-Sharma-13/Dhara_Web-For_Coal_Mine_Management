const mongoose = require('mongoose');

// Helper function to get the current time in IST
// const getISTTime = () => {
//     const now = new Date();
//     // Use toLocaleString to get the time in IST (UTC +5:30)
//     const options = { timeZone: 'Asia/Kolkata' };
//     const istDate = new Date(now.toLocaleString('en-US', options)); // Convert to IST
//     return istDate;
//   };

const jobSchema = mongoose.Schema({
    title: String,
    description: String,
    priority: String,
    start: Date,
    end: Date,
    createdAt: {
        type: Date,
        default: () => {
            // Use toLocaleString to get the time in IST (UTC +5:30)
            const options = { timeZone: 'Asia/Kolkata' };
            const istDate = new Date(new Date().toLocaleString('en-US', options));
            return istDate;
        }
    },
    mineManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mineManager',
        default: null,
    },
    shiftIncharge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shiftIncharge',
        default: null,
    },
    status: {
        type: String,
        default: 'Pending'
    }
});

module.exports = mongoose.model('job', jobSchema);


