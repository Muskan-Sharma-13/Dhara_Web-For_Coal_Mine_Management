const express=require('express');
const router=express.Router();
const mineManager=require('../models/mineManager');
const shiftIncharge=require('../models/shiftIncharge');
// const task=require('../models/taskModel');
const job=require('../models/jobModel');


async function findUser(){
    let user=await mineManager.findById("6751a93a1733504478bf1baf");
    return user;
}


router.post("/", async (req, res) => {
    try {
      const user = await findUser();
  
      // Fetch work orders associated with the user
      let workOrders = await job.find({
        mineManager: user,
      });
  
      const modifiedWorkOrders = await Promise.all(
        workOrders.map(async (work) => {
          // Update the status in the database if the condition is met
          if (work.end < Date.now()) {
            work.status = "Past Due";
            await work.save(); // Persist the status change
          }
        const options = { timeZone: 'Asia/Kolkata' };
        const istDate = new Date(new Date().toLocaleString('en-US', options));
        // console.log(work.end+','+istDate);
  
          // Convert to plain object for modification without affecting the DB
          const workObj = work.toObject();
  
          // Fetch the name of the shift incharge
          const inch = await shiftIncharge.findById(work.shiftIncharge);
          if (inch) {
            workObj.shiftIncharge = inch.name; // Replace ID with name in response
          }
  
          return workObj; // Return modified object for response
        })
      );
  
    //   console.log("Modified work orders:", modifiedWorkOrders);
  
      res.json({
        workOrders: modifiedWorkOrders, // Send modified objects in response
      });
    } catch (error) {
      console.error("Error fetching work orders:", error);
      res.status(500).json({
        error: "Failed to fetch work orders. Please try again later.",
      });
    }
  });
  
  

// router.post("/addTask",async(req,res)=>{
//     const user=await findUser();
//     //console.log(user);
//     // console.log(req.body);
//     // console.log(Date.now());
//     const job1=await job.create({
//         title:req.body.title,
//         description:req.body.description,
//         priority:req.body.priority,
//         start:req.body.startTime,
//         end:req.body.endTime,
//         mineManager:user._id,
//         shiftIncharge:req.body.shiftInchargeId,
//     })
//     // console.log(job1);
//     await user.job.push(job1._id);
//     user.save();
//     const inch=await shiftIncharge.findById(job1.shiftIncharge);
//     // console.log(inch);
//     await inch.job.push(job1._id);
//     inch.save();
//     res.status(200).json({message:'Sucess'});
//     // const inch=await shiftIncharge.find
// })

// router.post("/",function(req,res){
//     let error=req.flash("error");
//     res.render("index",{error});
// });



module.exports=router;