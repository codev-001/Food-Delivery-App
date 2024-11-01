import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

//Placing user order for the fronend
const placeOrder = async (req, res) => {
  try {
    const { userId, item, address, amount } = req.body;
    const orderData = {
      userId,
      item,
      address,
      amount,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//users order for the frontend

const userOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error " });
  }
};

//Listing orders for the admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//api for updating the user order

const updateStatus=async (req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:'Status Updated'})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:'Error'})
  }
} 

export { placeOrder, userOrder, listOrders, updateStatus };
