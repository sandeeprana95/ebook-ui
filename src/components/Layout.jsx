import { useContext, useState } from "react"
import Context from "../util/Context.js"
import http from "../util/http.js"
import { Outlet, Link, useNavigate} from "react-router-dom"
import { toast } from "react-toastify"

const Layout=()=>{

    const navigate = useNavigate()
    const { session ,setSession, sessionLoading , setSessionLoading } = useContext(Context)
    
    const [open,setOpen] = useState(false)


    const menu=[
        {
            label:"Dashboard",
            href:session?.role === "user" ? "/app/ebook" : "/admin/ebook",
            icon:"ri-apps-2-line"
        },
        {
            label:"Logout",
            href:"/app/logout",
            icon:"ri-logout-circle-r-line"
        }
    ]

    const onAccountMenuClick = async(href)=>{
        try{
            if(href === "/app/logout"){
                await http.get("/user/logout")
                setSession(null)
                setSessionLoading(null)
                
                console.log("hello")
              return  navigate("/")
            } 

         navigate(href)
        }
        catch(err)
        {
            toast.err(err.response? err.response.data.message : err.message)
        }
    }

    return(  
        <div>
            <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="text-2xl font-bold">
                <Link to="/">
                    <div className="h-[40px] rounded ">
                        <img className="w-full h-full rounded" src="/images/ebook-logo.png" />
                    </div>
                </Link>
                </div>
               {(!sessionLoading && !session ) &&
                <div className="flex gap-6 text-whitea text-lg animate__animated animate__fadeIn " >
                    <Link  to="/login"
                    className="flex items-center gap-1 hover:text-gray-200">
                        <i className="ri-login-box-line"></i>Login
                    </Link>
                    <Link to="/signup"
                     className="flex items-center gap-1 hover:text-gray-200">
                        <i className="ri-user-add-line"></i>Signup
                    </Link>
                </div>
               }

            
                    {(!sessionLoading && session ) &&
                <div className="flex items-center relative">
                    {/* <label className="capitalize font-semibold  text-lg mr-2" ></label> */}
                    <>
                    <button  className="text-2xl" onClick={()=>setOpen(!open)} >
                        <i className="ri-user-line mr-1"></i>{session?.fullname}
                    </button>
                    { open &&
                     <div className="absolute top-8 right-3 bg-white p-2 z-[10] rounded" >
                       <div className="space-x-6 flex flex-col">
                         {
                            menu.map((item,index)=>(
                            <button key={index}  onClick={()=>onAccountMenuClick(item.href)}
                            className="flex items-center text-black gap-1 hover:bg-gray-200 w-full p-1">
                                <i className={item.icon}></i>{item.label}
                            </button>
                            ))
                         }
                   
                    </div>
                    </div> 
                    }
                    </>
                </div>
                }

            </div>
           </nav>
            <section><Outlet/></section>
            <footer className="bg-gray-900 text-gray-300 py-12 mt-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                <h2 className="text-xl font-bold mb-4">About eBook</h2>
                <p className="text-sm leading-relaxed">
                    eBook is your go-to platform for digital books. Explore, read, and share your knowledge. Stay connected with your favorite authors and discover new stories every day.
                </p>
                </div>
                <div>
                <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white">Support</a></li>
                    <li><a href="#" className="hover:text-white">Blog</a></li>
                </ul>
                </div>
                <div>
                <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                <ul className="text-sm space-y-2">
                    <li>Email: support@ebook.com</li>
                    <li>Phone: +91 9876543210</li>
                    <li>Address: New Delhi, India</li>
                </ul>
                </div>
            </div>
            <div className="text-center mt-8 text-sm text-gray-500">
                © {new Date().getFullYear()} eBook. All rights reserved.
            </div>
    </footer>
        </div>
    )
}

export default Layout