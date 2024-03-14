import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ForgotPass from "./pages/forgotPass/ForgotPass";
import ResetPass from "./pages/resetPass/ResetPass";
import Verify from "./pages/verify/Verify";
import Home from "./pages/home/Home";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Menu from "./pages/menu/Menu";
import Favourite from "./pages/favourite/Favourite";
import Orders from "./pages/orders/Orders";
import Settings from "./pages/settings/Settings";
import Cart from "./components/cart/Cart";
import {useSelector, useDispatch} from 'react-redux'
import CreatePizza from "./components/createPizza/CreatePizza";
import Payment from "./pages/payment/Payment";
import { useEffect } from "react";
import { fetchUserCart } from "./api";
import { handleCartItem } from "./state/cartSlice";



const Layout = () => {
  const {user} = useSelector((state)=>state.user)
  const {toggle} = useSelector((state)=>state.cart)
  const {pizza} = useSelector((state)=>state.settings)
  const location = useLocation()
  const dispatch = useDispatch()

  const getCart = async ()=>{
    const res = await fetchUserCart(user?.token)
    dispatch(handleCartItem(res?.data))
    // console.log(res?.data)
  }
  useEffect(()=>{
    getCart()
  },[dispatch])

  return(
    user?.token ? <div className="app__layout">
        <Sidebar/>
        <div className="app__content">
          <Topbar/>
          {toggle && <Cart getCart={getCart}/>}
          {pizza && <CreatePizza/>}
          
          <Outlet/>
        </div>
    </div> : <Navigate to={'/login'} state={{from: location}} replace/>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot-password" element={<ForgotPass/>}/>
      <Route path="/reset-password" element={<ResetPass/>}/>
      <Route path="/verify" element={<Verify/>}/>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/favourite" element={<Favourite/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Route>
    </Routes>
  );
}

export default App;
