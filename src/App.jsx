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

const App=()=>{
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />

      <Route path="/admin" element={<AdminLayout/>} >
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="settings" element={<Settings/>} />
      <Route path="ebook" element={<Ebook/>} />
      </Route>

      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App