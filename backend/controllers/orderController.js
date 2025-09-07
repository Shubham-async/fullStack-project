import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'

//Global variable
const currency='inr'
const deliveryCharge=10

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstace=new razorpay({
  key_id:process.env.RAZORPAY_SECRET_ID,
  key_secret:process.env.RAZORPAY_SECRET_KEY
})


//Placing order using COD Method
const placeOrder=async(req,res)=>{
         try {
                  const {userId,amount,address,items}=req.body;
                  const orderData={
                           userId,
                           amount,
                           items,
                           address,
                           paymentMethod:"COD",
                           payment:false,
                           date:Date.now()
                  }

                  const newOrder=new orderModel(orderData)
                  await newOrder.save()

                  await userModel.findByIdAndUpdate(userId,{cartData:{}})
                  res.json({success:true,message:"Order Placed"})


         } catch (error) {
                  console.log(error)
                  res.json({success:false,message:error.message})
         }

} 

//Placing order using Stripe Method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, orderData } = req.body;
    const { amount, address, items } = orderData;
    const { origin } = req.headers;

    const newOrder = new orderModel({
      userId,
      amount,
      items,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now()
    });

    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery charge',
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log("Stripe order error:", error);
    res.json({ success: false, message: error.message });
  }
}

const verifyStripe=async(req,res)=>{
         const {orderId,success,userId}=req.body
         try {
                  if(success==="true")
                  {
                           await orderModel.findByIdAndUpdate(orderId,{payment:true})
                           await userModel.findByIdAndUpdate(userId,{cartData:{}})
                  res.json({success:true})
                  }
                  else{
                           await orderModel.findByIdAndDelete(orderId)
                           res.json({success:false})
                  }
                  
         } catch (error) {
                  console.log(error)
                  res.json({success:false,message:error.message})
         }
}


//Placing order using Rozaropay Method
const placeOrderRazorpay=async(req,res)=>{
        try {
          const {userId,amount,address,items}=req.body;
                  const orderData={
                           userId,
                           amount,
                           items,
                           address,
                           paymentMethod:"Razorpay",
                           payment:false,
                           date:Date.now()
                  }

                  const newOrder=new orderModel(orderData)
                  await newOrder.save()
                  const options={
                           amount:amount*100,
                           currency:currency.toUpperCase(),
                           receipt:newOrder._id.toString()
                           
                  }
                  await razorpayInstace.orders.create(options,(error,order)=>{
                           if(error){
                                    console.log(error)
                                    return res.json({success:false,message:error.message})
                           }
                           res.json({success:true,order})
                           

                  })
        } catch (error) {
         console.log(error)
         res.json({success:false,messgae:error.message})
        }
}

const verifyRozarpay=async(req,res) => {
try {
  const {userId,razorpay_order_id}=req.body;
  const orderInfo=await razorpayInstace.orders.fetch(razorpay_order_id)
  console.log(orderInfo)
  if(orderInfo.status === 'paid'){
    await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
    await userModel.findByIdAndUpdate(userId,{cartData:{}})
    res.json({success:true,message:"Payment successful"})
  }else{
    res.json({success:false,message:"Payment failed"})
  }
}
catch (error) {
  console.log(error)
         res.json({success:false,messgae:error.message})
}
}

// All Orders data for admin panel
const allOrders=async(req,res)=>{

try {
                  
     const orders=await orderModel.find({})
     res.json({success:true,orders})    
} catch (error) {
         console.log(error)
         res.json({success:false,messgae:error.message})
}                  
}

// User order data for frontend
const userOrders=async(req,res)=>{
         try {
              const {userId}=req.body
         const orders=await orderModel.find({userId})
         res.json({success:true,orders})    
         } catch (error) {
              console.log(error)
              res.json({success:false,message:error.message})    
         }

}

// update order status from admin panel
const updateStatus=async(req,res)=>{
const {orderId,status}=req.body
try {
        await orderModel.findByIdAndUpdate(orderId ,{status})
 res.json({success:true,message:'status upadated'})  
} catch (error) {
        console.log(error)
              res.json({success:false,message:error.message}) 
}


}

export {placeOrder,allOrders,userOrders,placeOrderRazorpay,placeOrderStripe,updateStatus,verifyStripe,verifyRozarpay}
