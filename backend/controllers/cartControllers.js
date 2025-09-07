import userModel from "../models/userModel.js";

// Add products to user cart
const addToCart=async(req,res)=>{

         try {
                    const {userId, itemID ,size } = req.body;
                    console.log(itemID);
                    
const userData=await userModel.findById(userId);
let cartData=await userData.cartData;

if(cartData[itemID]){
         if(cartData[itemID][size]){
                  cartData[itemID][size]+=1;
         }
         else{
                  cartData[itemID][size]=1;
         }
}

else{
         cartData[itemID]={};
         cartData[itemID][size]=1;


}

await userModel.findByIdAndUpdate(userId,{cartData});

res.json( { success: true, message: 'Item added to cart successfully' });
                  
         } catch (error) {
                  console.error('Error adding to cart:', error);
                  res.json( { success: false, message: 'Failed to add item to cart' });
         }
       
}
// Update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemID, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    // Safely initialize nested object
    if (!cartData[itemID]) {
      cartData[itemID] = {};
    }

    cartData[itemID][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: 'Cart updated successfully' });

  } catch (error) {
    console.error('Error updating cart:', error);
    res.json({ success: false, message: 'Failed to update cart' });
  }
};


// Get user cart
const getUserCart=async(req,res)=>{

         try {
                  const {userId}=req.body;
                  const userData=await userModel.findById(userId);
                  let cartData=await userData.cartData;
                  res.json ({ success: true, cartData });
         } catch (error) {
                  console.error('Error fetching user cart:', error);
                  res.json({ success: false, message: 'Failed to fetch user cart' });
         }
}

export {addToCart, updateCart, getUserCart};