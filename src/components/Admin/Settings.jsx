import { useState } from "react"
import axios from "axios"
import useSWR, { mutate } from "swr"
import fetcher from "../../util/fetcher"
import Loader from "../Shared/Loader"

const Settings=()=>{
    const [active,setActive]=useState(0)

    const Category=()=>{
    const [categoryInput,setCategoryInput]=useState({title:""})

     const {data,error,isLoading}= useSWR("/category",fetcher)

     const createCategory=async(e)=>{
        try{
              await axios.post("/category",categoryInput)
              mutate("/")
              setCategoryInput({title:""})
        }
        catch(err)
        {
            err.response ? console.log(err.response.data.message) : console.log(err.message)
        }

    }

    const deleteCategory=async(id)=>{
        try{
            await axios.delete(`/category/${id}`)
            mutate("/category")
        }
        catch(err)
        {
            err.response ? console.log(err.reponse.data.message) : console.log(err.message)
        }
    }


      if(isLoading)
        return (<div className="flex item-center justify-center py-12" >
          <Loader/>
        </div>)

     if(error)
        return(
    <div>
      <p className="text-rose-500">{err.message}</p>
    </div>
        )

        return(
                <div
                className="space-y-6"
                >
                    
                <div className="grid lg:grid-cols-6 gap-6">
                    {
                        data?.map((item,index)=>(
                                <button key={index}
                                    className="border border-dashed px-3 py-1.5 rounded"
                                    >{item.title}
                                    <i onClick={()=>deleteCategory(item._id)}
                                     className="ri-delete-bin-line ml-2 text-rose-500" />
                                </button>
                        ))
                    }
                </div>
                  <div>
                     <form onSubmit={createCategory}
                     className="space-x-2 max-sm:space-y-2" >
                         <input
                         value={categoryInput.title}
                         onChange={(e)=>setCategoryInput({title:e.target.value})}
                         name="title"
                         placeholder="enter category name"
                         className="border border-gray-500 rounded py-2.5 px-3 w-[350px] max-sm:w-auto"
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
        <div className=" space-y-4 animate__animated animate__fadeIn">
            <div className="flex gap-2" >
                    {
                      tabs.map((item,index)=>(
                            <button key={index} onClick={()=>setActive(index)}
                             style={{
                                    background:active === index ? "#6366F1" : null,
                                    color:active === index ? "#ffffff" : null 
                                }}
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