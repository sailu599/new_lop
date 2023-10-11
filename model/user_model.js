const mongo=require('mongoose')
let user_schema=mongo.Schema({
    user_name:String,
    gmail:String,
    password:String
})

let user_model=mongo.model('user_details',user_schema)
module.exports=user_model