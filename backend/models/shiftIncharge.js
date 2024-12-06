const mongoose=require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/Dhara');

const shiftInchargeSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:String,
    role:{
        type:String,
        default:"Shift Incharge"
    },
    department:{
        type:String,
        default:"Morning Shift"
    },
    location:{
        type:String,
        default:null
    },
    mine:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'mine',
            default:null,
    },
    mineManager:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'mineManager',
        default:null,
    },
    task:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'task'
        }
    ],
    job:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'job'
        }
    ],
    notif:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'notif'
        }
    ],
    team:[
            {
            type:mongoose.Schema.Types.ObjectId,
            ref:'team'
        }
    ]
});

module.exports=mongoose.model('shiftIncharge',shiftInchargeSchema);