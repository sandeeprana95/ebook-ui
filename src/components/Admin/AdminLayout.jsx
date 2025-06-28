import { useState } from "react"
import { Outlet , Link, useNavigate, useLocation } from "react-router-dom"

const AdminLayout=()=>{
    const navigate = useNavigate()
    const location= useLocation()
    console.log(location)

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
        },
        {
            label:"Logout",
            href:"/login",
            icon:"ri-logout-circle-r-line"
        }
    ]

    const onMobileNavigate=(href)=>{
           navigate(href)
           setMobileWidth(0)
    }

    return(
        <>
        {/*  mobile */}
        <div className="h-[3000px] lg:hidden block" >
          <aside style={{width:mobileWidth,transition:"0.3s"}}
          className="h-screen bg-green-200 fixed overflow-x-hidden z-[10] " >
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
                    <h1 className="text-lg font-medium mt-2" >Er Sourav</h1>
                    <label className="text-gray-500" >example@gmail.com</label>
            </div>


            <div className="flex flex-col gap-4 mt-4" >
                {
                    menus.map((item,index)=>(
                        <button key={index} onClick={()=>onMobileNavigate(item.href)}
                        style={{background:"linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)"}}
                        className="shadow-2xl py-3 font-semibold  hover:bg-red-500 hover:text-white"
                        >{item.label}</button>
                    ))
                }
            </div>

          </aside>
          <section className="bg-red-200 h-full" >
            <nav style={{background:"linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)"}}
            className="flex justify-between sticky top-0 p-2.5"
            >
                <div>
                    <button onClick={()=>setMobileWidth(280)}
                    className="w-9 h-9 border rounded hover:bg-black hover:text-white"
                    ><i className="ri-menu-line text-2xl" /></button>
                    <label className="font-medium text-white text-xl ml-2">Ebook</label>
                </div>
            </nav>
            <div className="w-11/12  mx-auto mt-2 p-2 rounded bg-white min-h-screen" >
            <div>
                <h1>{location.pathname}</h1>
            </div>
                <Outlet/>
            </div>
          </section>
        </div>
        {/* desktop */}
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
                    <h1 className="text-lg font-medium mt-2" >Er Sourav</h1>
                    <label className="text-gray-500" >example@gmail.com</label>
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
                            className="block h-full w-full py-3  font-semibold  hover:bg-red-500 hover:text-white"
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
            className="p-2.5 flex justify-between sticky top-0"
            >
                <div>
                    <button onClick={()=>{setWidth(width===280 ? 0 : 280)}}
                    className="w-9 h-9 border rounded hover:bg-black hover:text-white"
                    ><i className="ri-menu-line text-2xl" /></button>
                 <label className="font-medium text-white text-xl ml-2">Ebook</label>
                </div>

                <div>
                    <button>
                        <Link to="/login" >
                        <i className="ri-logout-circle-r-line text-2xl" />
                        </Link>
                    </button>
                </div>
            </nav>
            <div className="w-11/12  mx-auto" >
            <div>
                <h1>{location.pathname}</h1>
            </div>
                <Outlet/>
            </div>
          </section>
        </div>
        </>

    )
}

export default AdminLayout