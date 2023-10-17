const express=require('express')
const app=express()
const router=require('./router')
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/public', express.static('public'));


app.use('/',router)
app.use('/login',router)
app.use('/register',router)
app.use('/add_products',router)
app.use('/display_product',router)
app.use('/place_order',router)

app.listen(process.env.PORT||8000)