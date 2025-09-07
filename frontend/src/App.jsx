import React from 'react' 
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Contact from './pages/Contact';
import About from './pages/About';
 import Orders from './pages/Orders';
 import  Collection from './pages/Collection'; 
import Home from './pages/Home';
 import Product from './pages/Product';
 import Cart from './pages/Cart';
 import PlaceOrder from './pages/PlaceOrder';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
  import { ToastContainer } from 'react-toastify';
  import Verify from './pages/Verify';


const App = () => {
  return (
  
    <div className='px-4 bg-red sm:px-[5vw] md:px-[7vw] lg:px-[10vw]'>
  <ToastContainer/>
      <Navbar/>
<SearchBar/>
      {/* Routes */}
      <Routes>
        <Route  path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
      </Routes>
      <Footer/>

    </div>
    
  );
}

export default App
