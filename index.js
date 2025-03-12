const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRoute");

const app = express();
app.use(express.json());
//connections
mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => console.log("connect successfully"))
  .catch(() => console.log("connect Not successfully"));
const cors = require("cors")
app.use(cors())

// app.get('/trendingProducts',async(req,res)=>{
//     // console.log(req.body)
//   // const data = await productModel
//   //   .find()
//   //   .limit(4)
//   //   .sort({ createdAt: -1 })
//   //   .populate({
//   //     path: "Category",
//   //     model: "Category"
//   //   });


//     // res.send(data)
// })
  // const auth= (role)=>{
  //   // console.log(role);
  //   return async(req,res,next)=>{
  //   const token = req.headers['token']
  //   if(!token) return res.status(403).send({status:false, message:"you are not authenticated"})
  //   jwt.verify(
  //     token,
  //     "lYOXXekJDjkqQ6U7kg9i5s3gaJPm4BLzF8PjK45d3dd60e97e3ee3a9ecomerce",async(error, decoded)=>{
  //     if(error) return res.status(401).send({status:false, message:"invalid token"})
  //     const loginUserdata = await userModel.findById(decoded.id)
  //     if (!loginUserdata) return res.send({status:false,message:"user not found"})
  //     console.log("loginUserdata", loginUserdata.role, role);
  //     if(!role.includes(loginUserdata.role)) return res.status(401).send({status:false,message:"un-authorized"})


  //     next();
  //     }
  //   );
  // }
  // }

app.use("/user", userRouter);
// app.use(auth,['admin'])

app.use("/pr", productRouter);
app.use("/category",categoryRoute);
app.use("/pr/trending", productRouter);
app.use("/order", orderRouter);


// const port = 3001;
require('dotenv').config()
app.listen(process.env.PORT,()=>{
  console.log("listing"+process.env.PORT)
});



// const  productSchema = mongoose.Schema({
// Pname:String,
// Category:String,
// price:Number

// Pname: {
//   type: String,
//   required: true,
// },
// Category:{
//   type:String,
//   require:true,
// },
// price:{
//   type:Number,
//   required: true,
// }
// })
// const productModel = mongoose.model('Products', productSchema)

//use routes

// const product =
//   [
//     {
//       "product_id": 1,
//       "id": 1,
//       "product_name": "shoes",
//       "price": 15
//     },
//     {
//       "product_id": 1,
//       "id": 2,
//       "product_name": "shoes Men ",
//       "Category": " women",
//       "price": 10
//     },
//     {
//       "product_id": 1,
//       "id": 3,
//       "product_name": "shirt ",
//       "Category": "men ",
//       "price": 25
//     },]
//       app.get('/product',(req,res)=>{
//       // const xog=product.filter(d=>d.id==parseInt(req.params.id))
//      res.send(product);
//     //  console.log(xog)

// })
// app.post('/product/post',(req,res)=>{
//   // console.log(req.body);

//   product.push(req.body);
//   res.send('hi  post')
// })
