import { useState } from "react"

const AdminLayout=()=>{
    const [width , setWidth]= useState(280)
    return(
        <div className="h-[3000px]" >
          <aside style={{width:width,transition:"0.3s"}}
          className="h-screen bg-gray-300 fixed" >

          </aside>
          <section style={{marginLeft:width,transition:"0.3s"}}
          className="bg-red-200 h-full"
          >
            <nav
            className="p-2.5 bg-white flex justify-between sticky top-0"
            >
                <div>
                    <button onClick={()=>{setWidth(width===280 ? 0 : 280)}}
                    className="w-9 h-9 border rounded hover:bg-black hover:text-white"
                    ><i className="ri-menu-line text-2xl" /></button>
                </div>

                <div>
                    <button>
                        <i className="ri-logout-circle-r-line text-2xl" />
                    </button>
                </div>
            </nav>
            <div className="w-11/12 bg-blue-400 mx-auto" >
             <h1 className="text-4xl font-semibold" >Hi Admin</h1>

            </div>
          </section>
        </div>
    )
}

export default AdminLayout