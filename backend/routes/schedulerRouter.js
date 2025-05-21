const express=require('express');
const router=express.Router();
const mineManager=require('../models/mineManager');
const shiftIncharge=require('../models/shiftIncharge');
// const task=require('../models/taskModel');
const job=require('../models/jobModel');
const moment=require('moment-timezone');
const team = require('../models/teamModel');


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

    let teams=await team.find({
      mineManager:user,
    });
    incharges=[...incharges,...teams];
    //console.log(incharges);
    res.json({
        incharges
    })

});

router.post("/getTeams",async(req,res)=>{
  const user=await findUser();
  //console.log(user);
  let teams=await shiftIncharge.find({
          mineManager:user,
  });

  //console.log(incharges);
  res.json({
      teams
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
    const endDateTimeIST = moment.tz(req.body.end, "Asia/Kolkata");
    if (endDateTimeIST.isBefore(moment().tz("Asia/Kolkata"))) {
      console.log(moment().tz("Asia/Kolkata"));
      console.log(endDateTimeIST);
    return res.status(400).json({ message: "End date/time must be in the future." });
    }
    const job1=await job.create({
        title:req.body.title,
        description:req.body.description,
        priority:req.body.priority,
        end:new Date(req.body.end),
        mineManager:user._id,
        //shiftIncharge:req.body.shiftInchargeId,
    })
    //
    // console.log(job1.createdAt.toLocaleString('en-US', options));
    // console.log(job1.end>Date.now());
    await user.job.push(job1._id);
    user.save();
    const inch=await shiftIncharge.findById(req.body.allottedToId);
    if(inch){
      job1.shiftIncharge=inch._id;
      await inch.job.push(job1._id);
      await inch.save();
    }
    const temp=await team.findById(req.body.allottedToId);
    if(temp){
      job1.team=temp._id;
      await temp.job.push(job1._id);
      await temp.save();
    }
    // await inch.job.push(job1._id);
    // inch.save();
    await job1.save();
    res.status(200).json({message:'Sucess'});
})

router.post("/getTask", async (req, res) => {
  try {
    const user = await findUser();

    // // Fetch work orders associated with the user created today
    let workOrders = await job.find({
      mineManager: user,
      // status: { $in: ["Pending", "In Progress"] },
      //end: { $gte: startOfDay, $lt: endOfDay }, // Filter for today
    });

  const modifiedWorkOrders = await Promise.all(
    workOrders.map(async (work) => {
      // Update the status in the database if the condition is met
      if (work.end < Date.now() && work.status!=='Completed') {
        work.status = "Past Due";
        await work.save(); // Persist the status change
      }

      // Convert to plain object for modification without affecting the DB
      const workObj = work.toObject();

      // Fetch the name of the shift incharge
      if(work.shiftIncharge!==null){
        const inch = await shiftIncharge.findById(work.shiftIncharge);
        if (inch) {
          workObj.allottedTo = inch.name; // Replace ID with name in response
        }
    }

      if(work.team!==null){
        const temp=await team.findById(work.team);
        if(team){
          workObj.allottedTo=temp.name;
        }
    }

    if (!workObj.allottedTo) {
      workObj.allottedTo = 'None'; // Set default value if neither is found
    }


      workObj.end= moment(work.end).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm");

      return workObj; // Return modified object for response
    })
  )

  console.log(modifiedWorkOrders);

    // Send modified objects in response
    res.json({
      // modifiedWorkOrders: modifiedWorkOrders.map((order) => ({
      //   // ...order._doc,
      //   // end: moment(order.end).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm"),
      // })),
      modifiedWorkOrders
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