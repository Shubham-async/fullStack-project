import React, { useState } from "react";
import axios from "axios";

import { backendUrl } from "../App";
import { toast } from "react-toastify";


const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response=await axios.post(backendUrl+"/api/user/admin",{email,password});
      if(response.data.success){
        setToken(response.data.token);
      }else{
      toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.message || "An error occurred during login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-65">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-1 px-3 py-2 rounded-md border-gray-200 outline-none w-full"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-3 min-w-65">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-1 px-3 py-2 rounded-md border-gray-200 outline-none w-full"
              placeholder="password"
              type="password"
              required
            />
          </div>
          <button
            className="text-white bg-black px-3 py-2 w-full rounded-lg"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
