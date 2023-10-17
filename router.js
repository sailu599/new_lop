const express=require('express')
const  router=express.Router()
const mongo=require('mongoose')



const user_model=require('./model/user_model')
const product_model=require('./model/product_model')
const bill_model=require('./model/bill_model')

const uri="mongodb://127.0.0.1:27017/login"
const connection=async function(){
try {
    await mongo.connect(uri);
    console.log("Connected to MongoDB Atlas");
} catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
}
}
connection()


//use this to get price of the values

let user_name_global;





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
    {
           res.redirect('/display_product')
           user_name_global=fetch_data.user_name
    }
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
    res.redirect('/login');
})

router.get('/display_product',(req,res)=>{
    let fetch_product
    let fetch=async function()
    {
      fetch_product=await product_model.find({count:{$gt:0}})
      console.log('comming')
      res.render('display_product.ejs',{data:fetch_product})
    }
    fetch()
    
    
})

router.get('/add_products',(req,res)=>{
    res.render('add_products.ejs')
})


router.post('/add_products',(req,res)=>{
    data=req.body
    let add_data=new product_model({
        product_id:data.product_id,
        product_name:data.product_name,
        count:data.count,
        price:data.price
    })
    add_data.save().then(()=>{
        console.log('save sucess')
        res.redirect('/add_products')
    })
})
   

  router.post('/place_order',(req,res)=>{
    datas=req.body;
    res.render('order_confirmation',{data:datas})
  })


  router.post('/update',(req,res)=>{
        data=req.body
        let bill=[]
        let final_bill=[]
        let total_amount=0;
        let create=function(name,price,count)
        {
            let item_bill=new Map()
            item_bill.set('name',name)
            item_bill.set('price',price)
            item_bill.set('count',count)
            item_bill.set('total',count*price)
            bill.push(item_bill)
            total_amount=total_amount+(count*price)
        }
        
        let find_product_update=async function(key,data)
        {

            let item=await product_model.findOne({product_name:key})
            let update=item.count-data[key]
            await product_model.findOneAndUpdate({product_name:key},{count:update},{new:true}).then(()=>console.log('sucessfull'))
            create(key,item.price,data[key])
            bill.map(abc=>{
                  let product={
                    product_name:abc.get('name'),
                    product_price:abc.get('price'),
                    product_count:Number(abc.get('count')),
                    total:abc.get('total')
                  }
                  console.log(product)
                  final_bill.push(product)
            })
          //  console.log(final_bill)
        }
        let save_bill=async function(username,product_bill)
        {
              let bill=new bill_model({
                consumer_name:username,
                bill:product_bill
              })
         
              bill.save().then(()=>console.log('muduchu da samy'))
        }
    
       let final_function=async function()
       {
        for(keys in data)
        {
            await find_product_update(keys,data)
        }
         
       await  save_bill(user_name_global,final_bill)
       res.render('sucessful.ejs',{bill:final_bill,total:total_amount})
      }

      final_function()
    
        
  })


module.exports=router