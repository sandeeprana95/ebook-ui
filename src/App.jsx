import { BrowserRouter, Routes , Route } from "react-router-dom"
import "font-awesome/css/font-awesome.min.css"
import 'remixicon/fonts/remixicon.css'
import 'animate.css'
import Login from "./components/Login"
import Signup from "./components/Signup"
import AdminLayout from "./components/Admin/AdminLayout"
import Home from "./components/Home"
import NotFound from "./components/NotFound"

const App=()=>{
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />

      <Route path="/admin" element={<AdminLayout/>} />

      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App