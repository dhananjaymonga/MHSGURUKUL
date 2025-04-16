const express =require("express")
const app=express()
app.get('/test', (req, res) => {
    console.log("hii");
    res.send('Admin route is working!');
  });
app.listen(4000,()=>{
    console.log("started");
})
