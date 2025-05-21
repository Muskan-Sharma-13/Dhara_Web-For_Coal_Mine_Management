const express=require('express');
const router=express.Router();
const axios=require('axios');
const mine=require("../models/mine");


async function findUser(){
    let user=await mineManager.findById("6751a93a1733504478bf1baf");
    return user;
}

async function findMine(){
    let temp=await mine.findById('6751a97b83a1b1ed77c5f7d5');
    return temp;
  }


router.post("/", async (req, res) => {
    const temp=await findMine();
    try {
        const city = temp.location; // Hardcoded city value for testing
        console.log(`Fetching weather advisory for city: ${city}`);
    
        // Send a POST request to the Flask API with the city
        const response = await axios.post('http://127.0.0.1:5000/weather/advisory', { city });
        console.log(response.data);
        // Forward the Flask API's response back to the client
        res.status(200).json(response.data);
      } catch (error) {
        console.error('Error communicating with Flask API:', error.message);
        if (error.response) {
          // Forward the error response from Flask API
          res.status(error.response.status).json(error.response.data);
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
});
  
module.exports=router;