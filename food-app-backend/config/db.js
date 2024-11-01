import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://codev077:2301475@cluster0.zeq9n.mongodb.net/food-app"
  ).then(()=>{
    console.log('DB Connected:')
  })
};
