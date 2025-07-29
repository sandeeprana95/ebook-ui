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
import { toast, ToastContainer } from "react-toastify"
import UserLayout from "./components/User/UserLayout"
import Layout from "./components/Layout"
import Context from "./util/Context"
import useSWR from "swr"
import fetcher from "./util/fetcher"
import { useEffect, useState } from "react"
import http from "./util/http"
import axios from "axios"
import Orders from "./components/Admin/Orders"
import ForgotPassword from "./components/ForgotPassword"

const App=()=>{

  // const { data:session , error:sessionError } = useSWR("/user/session",fetcher)
  const [session,setSession] = useState(null)
  const [sessionLoading,setSessionLoading] = useState(null)

 const getSession=async()=>{
      try{
          setSessionLoading(true)
          
            // const {data} = await http.get("/user/session")
            const {data} = await axios.get(`${import.meta.env.VITE_SERVER}/user/session`)
            setSession(data)
      }
      catch(err)
      {
        console.log(err)
        toast.error(err.response? err.response.data.message :err.message)
      }
      finally{
        setSessionLoading(false)
      }
  }

    useEffect(()=>{
      getSession()
    },[])


  return(
    <Context.Provider  value={{session,sessionLoading,setSession,setSessionLoading}} >
        <BrowserRouter>
            <Routes>
                {/* Public web app */}
                <Route  element={<Layout />} >
                <Route path="/" element={<Home/>} />
                </Route>
                
                {/* User App */}
                <Route  element={<UserLayout/>} >
                <Route path="/app/ebook" element={<UserEbook/>} />
                </Route>

                 {/* Admin App */}
                <Route  element={<AdminLayout/>} >
                <Route path="admin/dashboard" element={<Dashboard />} />
                <Route path="admin/settings" element={<Settings/>} />
                <Route path="admin/ebook" element={<Ebook/>} />
                <Route path="admin/orders" element={<Orders/>}/>
                </Route>
                
                {/* Without layout */}
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/otp" element={<Otp />} />
                <Route path="*" element={<NotFound/>} />
             </Routes>
          <ToastContainer />
        </BrowserRouter>
    </Context.Provider>
  )
}

export default App