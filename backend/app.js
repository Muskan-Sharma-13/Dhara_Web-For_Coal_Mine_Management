const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const { db } = require('./firebase'); // Import Firestore instance
const mineManager=require('./models/mineManager');
const shiftIncharge=require('./models/shiftIncharge');
const mine=require('./models/mine');
const task=require('./models/taskModel');
const homeRouter=require('./routes/homeRouter');
const taskRouter=require('./routes/taskRouter');
const schedulerRouter=require('./routes/schedulerRouter');
const dailyTaskRouter=require('./routes/dailyTaskTouter');

dotenv.config();
app.use(cors());
app.use(express.json());

async function findUser(){
    let user=await mineManager.findById("6751a93a1733504478bf1baf");
    return user;
}

// Example route to save data to Firestore

// app.get('/',async(req,res)=>{
//     // const manager=await mineManager.create({
//     //     name:"Muskan Sharma",
//     //     phone:"123",
//     //     password:"abc",
//     //     email:"muskan@gmail.com"
//     // });
//     // console.log(manager);
//     // const task1 = await task.create({
//         // title: "task1",
//         // description: "imp for mine care",
//         // type: "Meeting",
//         // priority:"high",
//         // start:"2024-12-05",
//         // end:"2024-12-06",
//         // mineManager: "6751a93a1733504478bf1baf" // Replace with a valid manager ID
//     // });

//     // let user = await mineManager.findById(task1.mineManager); // Populate the mineManager
//     // if (user) {
//     //     user.task.push(task1._id);
//     //     await user.save(); // Ensure it's saved asynchronously
//     // }

//     // Create second mine and associate it with mineManager
//     const task2 = await task.create({
//       title: "task2",
//       description: "imp for mine preservation",
//       type: "Maintennce",
//       priority:"low",
//       start:"2024-12-04",
//       end:"2024-12-05",
//       mineManager: "6751a93a1733504478bf1baf" //// Replace with a valid manager ID
//     });

//     let user2 = await mineManager.findById(task2.mineManager);
//     if (user2) {
//         user2.task.push(task2._id);
//         await user2.save();
//     }

//     // console.log(task1);
//     console.log(task2);

//     // const inch1=await shiftIncharge.create({
//     //     name:"Sumit",
//     //     phone:123,
//     //     email:"sumit@gmail.com",
//     //     password:234,
//     //     mineManager:"6751a93a1733504478bf1baf",
//     //     mine:"6751a97b83a1b1ed77c5f7d5",
//     // });
//     // let mine1=await mine.findById(inch1.mine);
//     // inch1.location=mine1.location;
//     // await mine1.shiftIncharge.push(inch1._id);
//     // await inch1.save();
//     // await mine1.save();

//     // let manager1=await mineManager.findById(inch1.mineManager);
//     // await manager1.shiftIncharge.push(inch1._id);
//     // manager1.save();

//     // const inch2=await shiftIncharge.create({
//     //     name:"Amit",
//     //     phone:345,
//     //     email:"amit@gmail.com",
//     //     password:2345,
//     //     mineManager:"6751a93a1733504478bf1baf",
//     //     mine:"6751a97b83a1b1ed77c5f7d9",
//     // });

//     // let mine2=await mine.findById(inch2.mine);
//     // inch2.location=mine2.location;
//     // mine2.shiftIncharge.push(inch2._id);
//     // inch2.save();
//     // mine2.save();

//     // let manager2=await mineManager.findById(inch2.mineManager);
//     // await manager2.shiftIncharge.push(inch2._id);
//     // manager2.save();


//     // console.log(inch1);
//     // console.log(inch2);


//     res.send('hello');
// })

app.post('/api', async (req, res) => {
  const { id, name, age } = req.body;

  console.log("Received data:", req.body);

  if (!id || !name || !age) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Firestore operation
    await db.collection('users').doc(id).set({ id, name, age });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error updating Firestore:", error);
    res.status(500).json({ error: "Failed to update database" });
  }
});

// async function count(user) {
//     let sum = 0;
  
//     for (const mineId of user.mines) {
//       const mineData = await mine.findById(mineId).populate('shiftIncharge'); // Populate shiftIncharge if needed
//       if (mineData && mineData.shiftIncharge) {
//         sum += mineData.shiftIncharge.length;
//       }
//     }
  
//     return sum;
//   }

// app.get("/home",async(req,res)=>{
//     const user=await findUser();
//     console.log(user);
//     let minecount=user.mines.length;
//     let member=await count(user);
//     console.log(minecount);
//     console.log(member);
//     res.json({
//         minecount,
//         member
//     })
//     // res.status.json();
// })



app.use("/home",homeRouter);
app.use("/task",taskRouter);
app.use("/scheduler",schedulerRouter);
app.use("/dailyTask",dailyTaskRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
