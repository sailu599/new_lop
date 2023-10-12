const express=require('express')
const  router=express.Router()
const user_model=require('./model/user_model')
const mongo=require('mongoose')
const uri = "mongodb+srv://saileshsailu599:KQ9bnAwbspZPSA31@cluster0.asy6z9n.mongodb.net/?retryWrites=true&w=majority"
const connection=async function(){
try {
    await mongo.connect(uri);
    console.log("Connected to MongoDB Atlas");
} catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
}
}
connection()


router.get('/',(req,res)=>{
    res.send("done");
})

router.get('/login',(req,res)=>{
    res.render('login.ejs');
})

router.post('/login',(req,res)=>{
    let check=async function(){
    let user_data=req.body
    let fetch_data=await user_model.findOne({user_name:user_data.user_name})
    console.log(user_data.user_name)
    if(fetch_data.password==user_data.password)
           res.send('login sucessfull')
    else
    {  
       res.send('login unsucessful')
    }
}
  check()
})


router.get('/register',(req,res)=>{
    res.render('register.ejs');

})

router.post('/register',(req,res)=>{
    let data=req.body
    let new_user=new user_model({
        user_name:data.user_name,
        gmail:data.gmail,
        password:data.password
    })
    new_user.save().then(()=>console.log('saved sucessfully'))
})




module.exports=router