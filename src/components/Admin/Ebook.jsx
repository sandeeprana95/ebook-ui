import { useState } from "react"
import moment from "moment"

const Ebook=()=>{
    const [open,setOpen] = useState(false)
    return(
        <div className="space-y-8 animate__animated animate__fadeIn" >
            <button onClick={()=>setOpen(true)}
            className="bg-indigo-500 px-6 py-2 rounded text-white font-medium"
            > New Ebook
            </button>

            <div className="grid lg:grid-cols-4 gap-8">
                {
                    Array(16).fill(0).map((item,index)=>(
                        <div>
                           <img src="https://random-image-pepebigotes.vercel.app/api/random-image" />
                           <div className="px-4 pt-2 pb-4 border-l border-r border-b">
                            <h1 className="text-[17px] font-medium capitalize mt-3 mb-1"
                            >Ebook Title</h1>
                            <div className="flex gap-2 items-center" >
                                <label className="text-lg font-medium">5000</label>
                                <del>6000</del>
                            </div>
                            <label className="text-gray-500">{moment().format('MMM DD YYYY, hh:mm:ss A')}</label>
                              <div className="mt-4 space-x-3" >
                                <button className="bg-green-400 text-white hover:bg-green-500 px-2 py-1 rounded" 
                                ><i className="ri-edit-line"/></button>
                                <button className="bg-red-400 text-white hover:bg-red-500 px-2 py-1 rounded" 
                                ><i className="ri-delete-bin-line"/></button>
                                </div>
                           </div>
                        </div>
                    ))
                }
            </div>
           
        </div>
    )
}

export default Ebook