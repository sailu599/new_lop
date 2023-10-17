const mongo=require('mongoose')
const schema=mongo.Schema({
    product_id:String,
    product_name:String,
    count:Number,
    price:Number
})
const product_model=mongo.model('product_details',schema);
module.exports=product_model