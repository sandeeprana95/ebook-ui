import { useState } from "react"

const Settings=()=>{
    const [active,setActive]=useState(0)

    const Category=()=>{
        return(
                <div
                className="space-y-6"
                >
                    
                <div className="grid lg:grid-cols-6 gap-6">
                    {
                        Array(6).fill(0).map((item,index)=>(
                            <button key={index}
                                className="border border-dashed px-3 py-1.5 rounded"
                                >Testing
                            </button>
                        ))
                    }
                </div>
                  <div>
                     <form className="space-x-2" >
                         <input name="title"
                         placeholder="enter category name"
                         className="border border-gray-500 rounded py-2.5 px-3 w-[350px]"
                         />
                         <button
                         className="bg-indigo-500 text-white font-semibold py-1.5 px-4 rounded text-xl"
                         ><i className="ri-add-line mr-1"/>Add</button>
                    </form>
                </div>
            </div>
        )
    }

        const tabs=[
            {
                label:"category",
                children:<Category/>
            },
            {
                label:"help",
                children:<p>send message for help</p>
            }
        ]

    return(
        <div className="space-y-4 mt-4 p-4 animate__animated animate__fadeIn ">
            <div className="flex gap-2 " >
                    {
                      tabs.map((item,index)=>(
                            <button key={index} onClick={()=>setActive(index)}
                            className="border hover:border-gray-200 hover:bg-gray-300 text-lg font-semibold shadow-2xl border-gray-500 rounded px-4 py-1"
                            >{item.label}
                            </button>
                       ))
                    }
              </div>
            <div className="h-px bg-gray-500" />
                <div >
                    {tabs[active].children}
                </div>
        </div>
    )
}

export default Settings