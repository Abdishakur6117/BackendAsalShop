const { orderModel, validateOrder } = require("../models/orderModel");
const { productModel } = require("../models/productModel");
const waafipay = require("waafipay-sdk-node").API(
  "API-69429711AHX",
  "1007632",
  "M0913716",
  { testMode: true }
);


const createOrder = async(req,res)=>{
    try {
        if (!req.user)
          return res
            .status(401)
            .json({ status: false, message: "Unauthorized" });
        // return console.log("userka hadda ku jiro", req.user.id);
        const {error} = validateOrder(req.body)
        if(error) return res.send({status:false,message:error.message})
            await waafipay.preAuthorize(
              {
                paymentMethod: "MWALLET_ACCOUNT",
                accountNo: req.body.accountNo,
                amount: parseFloat(req.body.amount),
                currency: "USD",
                description: "purchase product",
              },
              function (err, ress) {
                console.log("first", ress);
                // return res.status(201).json({mess: ress.responseMsg})
                if (ress.errorCode == "0") {
                  console.log("ressult", ress);
                  waafipay.preAuthorizeCommit(
                    {
                      transactionId: ress?.params?.transactionId,
                      description: "commited",
                    },
                    async function (err, res) {
                      const findTheProduct = await productModel.findById(
                        req.body.productId
                      );
                      const totalAmount =
                        parseFloat(findTheProduct.Price) *
                        parseInt(req.body.Qty);
                      req.body.TotalAmount = totalAmount;
                      req.body.userId = req.user.id;
                      req.body.status = "paid";
                      //    req.body.price =findTheProduct.price
                      new orderModel(req.body).save();
                      // console.log(req.user.id);
                      //  res.send({status:true,message:"successfully created order"})
                    }
                  );
                  return res.status(201).json({
                    message: "successfully created order",
                    status: true,
                  });
                } else {
                  waafipay.preAuthorizeCancel(
                    {
                      transactionId: ress?.params?.orderId,
                      description: "cancellation",
                    },
                    function (err, res) {
                      console.log("calnceled", res);
                    }
                  );
                  console.log("Payment Failed", ress.responseMsg);
                  // return;
                  return res.status(400).json({ error: ress.responseMsg });
                }
              }
            );
        
        
    } catch (error) {
        res.send({status:false,message:error.message})
    }
}

const getOrder = async (req, res) => {
  try {
    const order = await orderModel
      .find()
      .populate({
        path: "productId",
        model: "products",
        select: "-_id Pname",
      })
      .populate({
        path: "userId",
        model: "Users",
        select: "-_id name",
      });
    res.send(order);
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
const getOrderByUser = async (req, res) => {
  // console.log('reached order')
  try {
    const order = await orderModel
      .find({ userId: req.user._id })
      .populate({
        path: "userId",
        model: "Users",
        select: " name",
      })
      .populate({
        path: "productId",
        model: "products",
        select: "Pname Price",
      });
      
      // console.log('reached',order)
    res.send(order);
  } catch (error) {
    // console.log(error.message)
    res.send( error.message );
  }
};
const getByIdOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    res.send(order);
  } catch (error) {
    rs.send({ status: false, message: error.message });
  }
};
const updateOrder = async (req, res) => {
  try {
    const { error } = validateOrder(req.body);
    if (error) return res.send({ status: false, message: error.message });
    await orderModel.findByIdAndUpdate(req.params.id, req.body);
    res.send({ status: true, message: "Updated successfully" });
  } catch (error) {
    rs.send({ status: false, message: error.message });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const { error } = validateOrder(req.body);
    if (error) return res.send({ status: false, message: error.message });
    await orderModel.findByIdAndDelete(req.params.id);
    res.send({ status: true, message: "Deleted  successfully" });
  } catch (error) {
    rs.send({ status: false, message: error.message });
  }
};
module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getByIdOrder,
  getOrderByUser,
};
