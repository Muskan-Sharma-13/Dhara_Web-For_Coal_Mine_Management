const express=require('express');
const router=express.Router();
const mineManager=require('../models/mineManager');
const shiftIncharge=require('../models/shiftIncharge');
// const task=require('../models/taskModel');
const job=require('../models/jobModel');
const moment=require('moment');


async function findUser(){
    let user=await mineManager.findById("6751a93a1733504478bf1baf");
    return user;
}


router.post("/",async(req,res)=>{
    const user=await findUser();
    //console.log(user);
    let incharges=await shiftIncharge.find({
            mineManager:user,
    });

    //console.log(incharges);
    res.json({
        incharges
    })

});

router.post("/addTask",async(req,res)=>{
    const user=await findUser();
    //console.log(user);
    // console.log(req.body);
    // console.log(Date.now());
    // const options = { timeZone: 'Asia/Kolkata' };
    //const istDate = new Date(new Date().toLocaleString('en-US', options));
    // console.log(req.body.startTime.toLocaleString('en-US', options))
    // console.log(req.body.endTime.toLocaleString('en-US', options))
    const job1=await job.create({
        title:req.body.title,
        description:req.body.description,
        priority:req.body.priority,
        start:req.body.startTime,
        end:req.body.endTime,
        mineManager:user._id,
        shiftIncharge:req.body.shiftInchargeId,
    })
    // console.log(job1.createdAt.toLocaleString('en-US', options));
    // console.log(job1.end>Date.now());
    await user.job.push(job1._id);
    user.save();
    const inch=await shiftIncharge.findById(job1.shiftIncharge);
    await inch.job.push(job1._id);
    inch.save();
    res.status(200).json({message:'Sucess'});
})

router.post("/getTask", async (req, res) => {
  try {
    const user = await findUser();

    // Fetch work orders associated with the user
    const startOfDay = moment().startOf('day').toDate(); // midnight of today
    const endOfDay = moment().endOf('day').toDate(); // just before midnight (23:59:59)
    // console.log(startOfDay);
    // console.log(endOfDay);
    // Fetch work orders associated with the user created today
    let workOrders = await job.find({
      mineManager: user,
      // status: { $in: ["Pending", "In Progress"] },
      createdAt: { $gte: startOfDay, $lt: endOfDay }, // Filter for today
    });

    const modifiedWorkOrders = await Promise.all(
      workOrders.map(async (work) => {
        // Convert to plain object for modification without affecting the DB
        const workObj = work.toObject();

        // Fetch the name of the shift incharge
        const inch = await shiftIncharge.findById(work.shiftIncharge);
        if (inch) {
          workObj.shiftIncharge = inch.name; // Replace ID with name in response
        }

        // Format createdAt, start, and end fields as readable date-time strings with adjustment
        const options = { timeZone: "Asia/Kolkata", hour12: true };

        workObj.createdAt = workObj.createdAt.toLocaleString("en-IN", options);
        workObj.start = workObj.start.toLocaleString("en-IN", options);
        workObj.end = workObj.end.toLocaleString("en-IN", options);

        return workObj; // Return modified object for response
      })
    );

    // Send modified objects in response
    res.json({
      workOrders: modifiedWorkOrders,
    });
  } catch (error) {
    console.error("Error fetching work orders:", error);
    res.status(500).json({
      error: "Failed to fetch work orders. Please try again later.",
    });
  }
});

  

// router.post("/",function(req,res){
//     let error=req.flash("error");
//     res.render("index",{error});
// });



module.exports=router;