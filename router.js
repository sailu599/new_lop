const express=require('express')
const  router=express.Router()
const user_model=require('./model/user_model')
const mongo=require('mongoose')

mongo.connect('mongodb://127.0.0.1:27017/login').then(()=>console.log('connected sucessfully'))

router.get('/',(req,res)=>{
    res.send("done");
})

router.get('/login',(req,res)=>{
    res.render('login.ejs');
})

router.post('/login',(req,res)=>{
    let body=req.body
    console.log(body)
    res.send(body)
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