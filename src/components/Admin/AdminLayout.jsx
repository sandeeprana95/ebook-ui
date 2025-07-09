import { useState } from "react"
import { Outlet , Link, useNavigate, useLocation, Navigate } from "react-router-dom"
import useSWR, { mutate } from "swr"
import fetcher from "../../util/fetcher"
import Loader from "../Shared/Loader"
import axios from "axios"
import { toast } from "react-toastify"

const AdminLayout=()=>{
    const {data:session,error:sessionError,isLoading:sessionLoading}=
    useSWR("user/session",fetcher)

    const navigate = useNavigate()
    const location= useLocation()

    const [width , setWidth]= useState(280)
    const [mobileWidth,setMobileWidth] = useState(0)

    const menus=[
        {
            label:"Dashboard",
            href:"/admin/dashboard",
            icon:"ri-apps-2-line"
        },
        {
            label:"Ebook",
            href:"/admin/ebook",
            icon:"ri-bookmark-line"
        },
        {
            label:"Settings",
            href:"/admin/settings",
            icon:"ri-tools-line"
        }
    ]

    const onMobileNavigate=(href)=>{
           navigate(href)
           setMobileWidth(0)
    }

    const logout=async()=>{
        try{
          await axios.get("/user/logout")
          mutate("user/session") 
        }
        catch(err)
        { 
           toast(err.response? err.response.data.message : err.message
            ,{position:"top-center"}
           )
        }
    }

    const Mobile=()=>{
        return(
                <div className="h-[3000px] lg:hidden block" >
                <aside style={{width:mobileWidth,transition:"0.3s"}}
                className="h-screen bg-green-200 fixed overflow-x-hidden z-[20] " >
                    <div className="flex justify-end p-2 border-b ">
                    <button onClick={()=>setMobileWidth(0)}
                    className="w-8 h-8 p-2  border  rounded-full flex items-center justify-center text-2xl "
                    ><i className="ri-close-line" /></button>
                    </div>

                    <div
                    className="flex flex-col items-center justify-center my-2"
                    >
                        <button
                        className="w-16 h-16 bg-slate-100 rounded-full"
                        >
                            <i className="ri-user-fill text-4xl  " />
                        </button>
                            <h1 className="text-lg font-medium mt-2" >{session?.fullname}</h1>
                            <label className="text-gray-500" >{session?.email}</label>
                    </div>


                    <div className="flex flex-col gap-4 mt-4" >
                        {
                            menus.map((item,index)=>(
                                <button key={index} onClick={()=>onMobileNavigate(item.href)}
                                style={{background:"linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)"}}
                                className="shadow-2xl py-3 font-semibold hover:text-white"
                                ><i className={`${item.icon} mr-2`} />{item.label}</button>
                            ))
                        }
                        <button onClick={logout}
                                style={{background:"linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)"}}
                                className="shadow-2xl py-3 font-semibold hover:text-white"
                                ><i className="ri-logout-circle-r-line mr-2"/>Logout</button>
                    </div>

                </aside>
                <section className="bg-red-200 h-full" >
                    <nav style={{background:"linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)"}}
                    className="flex justify-between sticky top-0 p-2.5 z-[1] "
                    >
                        <div className="flex items-center justify-center gap-2" >
                            <button onClick={()=>setMobileWidth(280)}
                            className="w-9 h-9 border rounded hover:bg-black hover:text-white"
                            ><i className="ri-menu-line text-2xl" /></button>
                            <div className="h-[40px] rounded ">
                                <img className="w-full h-full rounded" src="/images/ebook-logo.png" />
                            </div>
                        </div>
                    </nav>
                    <div className="w-11/12 mx-auto mt-2 py-2 px-4 rounded bg-white min-h-screen space-y-4 " >
                    <div>
                        <h1>{location.pathname}</h1>
                    </div>
                        <Outlet/>
                    </div>
                </section>
                </div>
        )
    }

    const Desktop=()=>{
        return(
                <div className="h-[3000px] lg:block hidden" >
          <aside style={{width:width,transition:"0.3s"}}
          className="h-screen bg-green-200 fixed overflow-x-hidden ">
             <div
            className="flex flex-col items-center justify-center my-2"
            >
                <button
                className="w-16 h-16 bg-slate-100 rounded-full"
                >
                    <i className="ri-user-fill text-4xl  " />
                </button>
                    <h1 className="text-lg font-medium mt-2" >{session?.fullname}</h1>
                    <label className="text-gray-500" >{session?.email}</label>
            </div>

            <div className="flex flex-col gap-4 mt-4" >
                {
                    menus.map((item,index)=>{                        
                        if(item.label !== "Logout")
                          return(
                        <button key={index}
                        className="shadow-2xl"
                        >
                            <Link to={item.href} 
                            style={{background:"linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)"}}
                            className="block h-full w-full py-3  font-semibold hover:text-white"
                             >{item.label}
                             </Link>
                        </button>
                          )
                    })
                }
            </div>

          </aside>
          <section style={{marginLeft:width,transition:"0.3s"}}
          className="bg-red-200 h-full"
          >
            <nav style={{background:"linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)"}}
            className="p-2.5 flex justify-between sticky top-0 z-[10]"
            >
                 <div className="flex items-center justify-center gap-2" >
                    <button onClick={()=>{setWidth(width===280 ? 0 : 280)}}
                    className="w-9 h-9 border rounded hover:bg-black hover:text-white"
                    ><i className="ri-menu-line text-2xl" /></button>
                  <div className="h-[40px] rounded ">
                        <img className="w-full h-full rounded" src="/images/ebook-logo.png" />
                    </div>
                </div>

                <div>
                    <button onClick={logout} >
                        <Link to="/login" >
                        <i className="ri-logout-circle-r-line text-2xl" />
                        </Link>
                    </button>
                </div>
            </nav>
            <div className="w-11/12  mx-auto mt-2 py-2 px-4 rounded bg-white min-h-screen space-y-4 " >
            <div>
                <h1>{location.pathname}</h1>
            </div>
                <Outlet/>
            </div>
          </section>
        </div>

        )
    }

    if(sessionLoading)
        return( <div className="h-screen flex items-center justify-center" >
        <Loader />
        </div>
        )

    if(sessionError)
     return(<Navigate to="/login"/>)

    // if (session.role !== "admin")
    //     return (<Navigate to="/" />)

    return(
        <>
        <Mobile/>
        <Desktop/>
        </>

    )

}

export default AdminLayout