import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const currency = "$";
  const deliver_fee = 10;
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);

  const addToCart = async (itemID, size) => {
    if (!size) {
      toast.error("Please select your size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemID]) {
      if (cartData[itemID][size]) {
        cartData[itemID][size] += 1;
      } else {
        cartData[itemID][size] = 1;
      }
    } else {
      cartData[itemID] = {};
      cartData[itemID][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          backend_url + "/api/cart/add",
          { itemID, size },
          { headers: { token } }
        );
        console.log(response.data);
        toast.success("Item added to cart successfully");
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item to cart");
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    return totalCount;
  };

  const updateQunatity = async (itemID, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (!cartData[itemID]) {
      cartData[itemID] = {}; // ✅ initialize if missing
    }
    cartData[itemID][size] = quantity;

    setCartItems(cartData);
    if (token) {
      try {
        const response = await axios.post(
          backend_url + "/api/cart/update",
          { itemID, size, quantity },
          { headers: { token } }
        );
        console.log(response);
      } catch (error) {
        console.error(error.message);
        toast.error("Failed to update cart");
      }
    }
  };

  const cartTotalAmount = () => {
    let totalPrice = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((Product) => Product._id === items);
      if (!itemInfo) continue; // ✅ prevent crash
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalPrice += itemInfo.price * cartItems[items][item];
        }
      }
    }
    return totalPrice;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products");
    }
  };
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backend_url + "/api/cart/get",
        {},
        { headers: { token } }
      );

      console.log("cartData response:", response.data);

      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message || "Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to fetch cart items");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));

      getUserCart(localStorage.getItem("token"));
    }
  }, []);
  
  const value = {
    products,
    deliver_fee,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQunatity,
    cartTotalAmount,
    navigate,
    backend_url,
    token,
    setToken,
    setCartItems,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
