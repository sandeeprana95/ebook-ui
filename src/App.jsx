import { BrowserRouter, Routes , Route } from "react-router-dom"
import "font-awesome/css/font-awesome.min.css"
import 'remixicon/fonts/remixicon.css'
import 'animate.css'
import Login from "./components/Login"
import Signup from "./components/Signup"
import AdminLayout from "./components/Admin/AdminLayout"
import Home from "./components/Home"
import NotFound from "./components/NotFound"
import Dashboard from "./components/Admin/Dashboard"
import Settings from "./components/Admin/Settings"
import Ebook from "./components/Admin/Ebook"
import UserEbook from "./components/User/Ebook"
import Otp from "./components/Admin/Otp"
import { ToastContainer } from "react-toastify"
import UserLayout from "./components/User/UserLayout"
import Layout from "./components/Layout"

const App=()=>{
  return(
    <BrowserRouter>
    <Routes>
      <Route  element={<Layout />} >
      <Route path="/" element={<Home/>} />
      </Route>

      <Route  element={<UserLayout/>} >
      <Route path="app/ebook" element={<UserEbook/>} />
      </Route>

      <Route  element={<AdminLayout/>} >
      <Route path="admin/dashboard" element={<Dashboard />} />
      <Route path="admin/settings" element={<Settings/>} />
      <Route path="admin/ebook" element={<Ebook/>} />
      </Route>

      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    <ToastContainer />
    </BrowserRouter>
  )
}

export default App