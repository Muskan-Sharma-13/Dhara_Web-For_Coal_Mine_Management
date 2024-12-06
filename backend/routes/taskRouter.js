const express=require('express');
const router=express.Router();
const mineManager=require('../models/mineManager');
const task=require('../models/taskModel');
// const shiftIncharge=require('../models/shiftIncharge');


async function findUser(){
    let user=await mineManager.findById("6751a93a1733504478bf1baf");
    return user;
}


router.post("/",async(req,res)=>{
    const user=await findUser();
    console.log(user);
    let tasks=await task.find({
            mineManager:user,
            completed:false,
    });

    console.log(tasks);
    res.json({
        tasks
    })

})

// router.post("/",function(req,res){
//     let error=req.flash("error");
//     res.render("index",{error});
// });



module.exports=router;