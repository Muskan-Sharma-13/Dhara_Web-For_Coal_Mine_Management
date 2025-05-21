const express=require('express');
const router=express.Router();
const mineManager=require('../models/mineManager');
const task=require('../models/taskModel');
const team=require('../models/teamModel');
const mine=require("../models/mine");
const shiftIncharge=require('../models/shiftIncharge');


async function findUser(){
    let user=await mineManager.findById("6751a93a1733504478bf1baf");
    return user;
}

function returnId(){
  return "6751a93a1733504478bf1baf";
}

async function findMine(){
  let temp=await mine.findById('6751a97b83a1b1ed77c5f7d5');
  return temp;
}

async function returnmineId(){
  return '6751a97b83a1b1ed77c5f7d5';
}

async function countMM(){
    let x=await mineManager.find({});
    return x.length;
}

async function countSI(){
    let y=await shiftIncharge.find({});
    return y.length;
}

function findDate(){
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const adjustedDate = new Date(date.getTime() + (5 * 60 + 30) * 60 * 1000);
    const formattedDate = adjustedDate.toISOString().split('T')[0];
    //console.log(formattedDate); 
    return formattedDate;
}


router.post("/authority", async (req, res) => {
    try {
      const [mineManagerCount, shiftInchargeCount] = await Promise.all([countMM(), countSI()]);
      const currentDate = findDate();
  
      const roles = [
        { id: 1, name: 'Owner', users: 1, lastUpdated: '2024-03-15', authorityLevel: 100 },
        { id: 2, name: 'Admin', users: 1, lastUpdated: '2024-03-15', authorityLevel: 75 },
        { id: 3, name: 'Mine Manager', users: mineManagerCount, lastUpdated: currentDate, authorityLevel: 60 },
        { id: 4, name: 'Shift Incharge', users: shiftInchargeCount, lastUpdated: currentDate, authorityLevel: 50 },
      ];
  
      //console.log(roles);
      res.json({ roles });
    } catch (error) {
      console.error('Error generating authority data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.post("/people",async(req,res)=>{
    const MM=await mineManager.find({});
    const SI=await shiftIncharge.find({
      mineManager:returnId()
    });
    const users=[...MM,...SI];
    //console.log(users);
    res.json({users});
})

router.post("/deleteUser",async(req,res)=>{
  //console.log(req.body.userId);
  const user=await shiftIncharge.findById(req.body.userId);
  //console.log(user);
  // const mine=await mne.findById(user.mine);
  user.mineManager=null;
  await mine.updateOne(
    { _id: user.mine },
    { $pull: { shiftIncharge: req.body.userId } }
  );
  user.mine=null;
  user.location=null;
  await user.save();
  for (const Team of user.team) {
    await team.updateOne(
      { _id: Team },
      { $pull: { shiftIncharge: req.body.userId } }
    );
  }
  await shiftIncharge.updateOne(
    { _id: req.body.userId }, // Find the user by ID
    { $set: { team: [] } } // Set the 'teams' field to an empty array
  );
  const MM=await findUser();
  await mineManager.updateOne(
    {_id:MM._id},
    {$pull:{shiftIncharge:user._id}}
  )
  //console.log(user);
  res.json({message:"Succesful deletion"});
})

router.post('/addUser', async (req, res) => {
  try {
    // Wait for the promise to resolve and get the actual values
    const user = await findUser(); 
    //console.log(user);
    const temp = await findMine(); // Assuming this function fetches a mine document
    //const mineId = await returnmineId(); // Resolves to a valid ObjectId
    //const mineManagerId = await returnId(); // Resolves to a valid ObjectId
    //console.log(temp);
    // Create the ShiftIncharge user
    const SI = await shiftIncharge.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      role: req.body.role,
      department: req.body.department,
      mine: temp._id, // Assign the resolved ObjectId
      mineManager: user._id, // Assign the resolved ObjectId
      location: temp.location, // Assuming location is a direct property
    });

    //console.log(SI);

    // Update the references
    await temp.shiftIncharge.push(SI._id);
    //const user = await findUser(); // Assuming this fetches a user document
    await user.shiftIncharge.push(SI._id);

    // Save the updated documents
    await temp.save();
    await user.save();

    res.status(200).json({ message: 'Successfully added' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'An error occurred while adding the user' });
  }
});

router.post("/team-list",async(req,res)=>{
  const user=await findUser();
  // const MM=await mineManager.find({});
  // const SI=await shiftIncharge.find({
  //   mineManager:returnId()
  // });
  //console.log(user);
  const teams = await team.find({ _id: { $in: user.team } });
  //console.log(teams);
  //console.log(users);
  res.json({teams});
})

router.post("/SI",async(req,res)=>{
  const user=await findUser();
  const SIs=await shiftIncharge.find({_id:{$in:user.shiftIncharge}});
  res.json({SIs});
})

router.post('/addTeam', async (req, res) => {
  try {
    // Wait for the promise to resolve and get the actual values
    const user = await findUser(); 
    //console.log(user);
    // const temp = await findMine(); // Assuming this function fetches a mine document
    //const mineId = await returnmineId(); // Resolves to a valid ObjectId
    //const mineManagerId = await returnId(); // Resolves to a valid ObjectId
    //console.log(user);
    // Create the ShiftIncharge user
    const newTeam = await team.create({
      name: req.body.name,
      description: req.body.description,
      mineManager: user._id, // Assign the resolved ObjectId
    });

    user.team.push(newTeam._id);
    user.save();

    req.body.users.forEach(async(user)=>{
      newTeam.shiftIncharge.push(user);

      let SI=await shiftIncharge.findById(user);
      await SI.team.push(newTeam._id);
      SI.save();
    })
    
    newTeam.save();
    //console.log(newTeam);

    // Update the references
    //await temp.shiftIncharge.push(SI._id);
    //const user = await findUser(); // Assuming this fetches a user document
    //await user.shiftIncharge.push(SI._id);

    // Save the updated documents
    //await temp.save();
    //await user.save();


    res.status(200).json({ message: 'Successfully added' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'An error occurred while adding the user' });
  }
});

router.post("/deleteTeam", async (req, res) => {
  try {
    console.log(req.body.teamId);

    // Find the user
    const user = await findUser();
    
    // Update the user's team
    await mineManager.updateOne(
      { _id: user._id },
      { $pull: { team: req.body.teamId } }
    );
    console.log(user);

    // Find the team to be deleted
    const getTeam = await team.findById(req.body.teamId);
    console.log(getTeam);

    // If team doesn't exist, return an error
    if (!getTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Update each shiftIncharge document
    for (const SI of getTeam.shiftIncharge) {
      await shiftIncharge.updateOne(
        { _id: SI },
        { $pull: { team: req.body.teamId } }
      );
    }

    // Delete the team
    await team.findByIdAndDelete(req.body.teamId);

    res.status(200).json('Successfully deleted team');
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ error: 'An error occurred while deleting the team' });
  }
});


// router.post("/",function(req,res){
//     let error=req.flash("error");
//     res.render("index",{error});
// });



module.exports=router;