const express=require('express');
const app=express();
const http=require('http');
const dotenv=require('dotenv');
const cors=require('cors');

dotenv.config();
app.use(cors());
app.use(express.json());

// app.get('/',(req,res)=>{
//     // res.json('hello from backend');
//     console.log(req.body);
//     res.status(200).json({message: 'Success'});
// });

app.post('/api',(req,res)=>{
    console.log(req.body);
    res.status(200).json({message: 'Success'});
})

const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);

});

