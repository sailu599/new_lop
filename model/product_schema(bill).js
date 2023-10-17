const mongo=require('mongoose')
let schema=mongo.Schema({
    product_name:String,
    product_price:Number,
    product_count:Number,
    total:Number
})
module.exports=schema