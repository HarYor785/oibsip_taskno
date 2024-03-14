import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import ForgotPass from "./pages/forgotPass/ForgotPass";
import ResetPass from "./pages/resetPass/ResetPass";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Menu from "./pages/menu/Menu";
import Orders from "./pages/orders/Orders";
import Customers from "./pages/customers/Customers";
import Notifications from "./components/notifications/Notifications";
import { useSelector } from "react-redux";



const Layout = () => {
  const {user} = useSelector((state)=>state.user)
  const location = useLocation()
  return(
    user?.token ? <div className="app__layout">
      <Sidebar/>
      <div className="app__content">
        <Notifications/>
        <Topbar/>
        <Outlet/>
      </div>
    </div> : <Navigate to={'/login'} state={{from: location}} replace/>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot_password" element={<ForgotPass/>}/>
      <Route path="/reset_password/:id" element={<ResetPass/>}/>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/customers" element={<Customers/>}/>
      </Route>
    </Routes>
  );
}

export default App;
