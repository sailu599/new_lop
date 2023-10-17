const mongo=require('mongoose')
const product_schema=require('./product_schema(bill)')

const schema=mongo.Schema({
   consumer_name:String,
   bill:[product_schema]
})
 bill_model=mongo.model('bill_details',schema)

 module.exports=bill_model