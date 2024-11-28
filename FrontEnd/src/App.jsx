import './App.css'
import {Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Register from "./components/Register/Register"
import HomePage from './components/HomrPage.jsx/HomePage'
import AdminPanel from "./components/AdminPanel/AdminPanel"
import TouristSpots from './components/TouristSpots/TouristSpots'
import TouristSpotsDeatils from './components/TouristSpots/TouristSpotsDeatils'

import Products from './components/Products/Products'
import ProductDetailes from './components/ProductsDetailes/ProductDetailes'
import CartPage from './components/Cart/CartPage'
import OrderConfirmtion from './components/Orders/OrderConfirmtion'
import CheckOutpage from './components/CheckoutPage/CheckOutpage'

import About from "./components/About/About"


import UserOrders from './components/Orders/userorders'
import Market from './components/Market/Market'
import FavoritesProducts from './components/Favourite/FavoritesProducts'
import OrderManage from "./components/Admin panel/OrderManage"
import ProductManage from "./components/Admin panel/ProductManage"


import SocketMessages from './components/Socket/SocketMessages'
import SendSocketMessages from './components/Socket/SendSocketMessages'
import ReceiveSocketMessages from './components/Socket/ReciveSocketMessages'

import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  
import '@fortawesome/fontawesome-free/css/all.min.css';
import Favourite from './components/Favourite/Favourite'

import AccountSettings from './components/Account/Account'
 import Sidebar from './components/Admin panel/Sidebar' 
 import Dashboard from './components/Admin panel/Dashboard' 
import Header from './components/Admin panel/Header'

import Orders from "./components/Orders/Orders"
import Users from './components/Admin panel/Users'
import Charts from "./components/Admin panel/Charts/Charts"
function App() {


  return (
    <>

    <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    style={{ top: '50px' }}
    />

    
    <SocketMessages>
     <Navbar/> 
    <Routes>
    <Route path="/Navbar" element={<Navbar/>}/>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/Register" element={<Register/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/adminPanel" element={<AdminPanel/>} />
    <Route path="/adminPanel/Charts" element={<Charts/>} />
    <Route path="/TouristSpots/:categoryId" element={<TouristSpots/>} />
    <Route path="/TouristSpots/:categoryId/TouristSpots-Detailes/:spotname" element={<TouristSpotsDeatils/>} />
    <Route path="/Products/:category_id" element={<Products/>} />
    <Route path="/Products/Detailes/:product_id" element={<ProductDetailes/>} />
    <Route path="/my-orders" element={<Orders/>} />
    <Route path="/Orders/:id" element={<OrderConfirmtion/>} />
    <Route path="/checkout" element={<CheckOutpage/>} />
    <Route path="/Products/:touristSpotsid" element={<Products/>} />
    <Route path="/products/details/:productId" element={<ProductDetailes/>} />

    <Route path="/TouristSpots" element={<TouristSpots/>} />
    <Route path="/TouristSpots-Detailes" element={<TouristSpotsDeatils/>} />

    <Route path="/Products/:touristSpotsid" element={<Products/>} />
    <Route path="/products/details/:productId" element={<ProductDetailes/>} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/checkout" element={<CheckOutpage/>} />
    <Route path="/order/:id" element={<OrderConfirmtion/>} />
    <Route path="/my-PreviousOrders" element={<UserOrders/>} />
    <Route path="/Market" element={<Market/>} />
    <Route path="/FavoritesProducts" element={<FavoritesProducts/>} />

    <Route path="/recive-socket-message" element={<ReceiveSocketMessages/>} />

    <Route path="/SocketMessages" element={<SocketMessages/>} />
    <Route path="/send-socket-message" element={<SendSocketMessages/>} />
    
    <Route path="/About" element={<About />} />

    <Route path="/cart" element={<CartPage />} />



    <Route path="/Favourite" element={<Favourite />} />
    <Route path="/Account" element={<AccountSettings />} />


    <Route path="/order/:id" element={<OrderConfirmtion/>} />

    <Route path="/Favourite" element={<Favourite />} />
    <Route path="/Admin/dashbored" element={<Dashboard />} />
    <Route path="/Admin/sidebar" element={<Sidebar />} />
    <Route path="/Admin/Header" element={<Header />} />
    <Route path="/Admin/Orders" element={<OrderManage/>} />
    <Route path="/Admin/Products" element={<ProductManage/>} />
    <Route path="/Admin/users" element={<Users/>} />

    </Routes>
    </SocketMessages>
    </>
  )
}

export default App
