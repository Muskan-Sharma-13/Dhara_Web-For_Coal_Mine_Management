const express=require('express');
const router=express.Router();
const mineManager=require('../models/mineManager');
const mine=require('../models/mine');
const shiftIncharge=require('../models/shiftIncharge');
const task=require('../models/taskModel');


async function findUser(){
    let user=await mineManager.findById("6751a93a1733504478bf1baf");
    return user;
}

async function count(user) {
    let sum = 0;
  
    for (const mineId of user.mines) {
      const mineData = await mine.findById(mineId).populate('shiftIncharge'); // Populate shiftIncharge if needed
      if (mineData && mineData.shiftIncharge) {
        sum += mineData.shiftIncharge.length;
      }
    }
  
    return sum;
  }

router.post("/",async(req,res)=>{
    const user=await findUser();
    // console.log(user);
    let tasks=await task.find({
      mineManager:user,
      completed:false,
    });
    let taskcount=tasks.length;
    let minecount=user.mines.length;
    let member=await count(user);
    // console.log(minecount);
    // console.log(member);
    res.json({
        minecount,
        member,
        taskcount
    })
    // res.status.json();
});

router.post('/sidebar',async(req,res)=>{
  const user=await findUser();
  // console.log(user);
  let name=user.name;
  res.json({
    name
  })
})

// router.post("/",function(req,res){
//     let error=req.flash("error");
//     res.render("index",{error});
// });



module.exports=router;