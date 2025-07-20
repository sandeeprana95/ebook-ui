import useSWR from "swr"
import fetcher from "../../util/fetcher.js"
import { createElement, useState } from "react"
import Loader from "../Shared/Loader.jsx"
import { toast } from "react-toastify"
import http from "../../util/http.js"
import { Link } from "react-router-dom"

const Ebook=()=>{
const {data:ebook , error:ebookErr , isLoading } = useSWR("/order",fetcher)


const showPdf=async(ebooks)=>{
  try{
       const path = ebooks[ebooks.length-1]
       const {data} = await http.post("/storage/download?type=file",{path},{responseType:"blob"})
       const url = URL.createObjectURL(data)
       const a = document.createElement("a")
       a.href = url
       a.target = "_blank"
       a.click()
       a.remove()
  }
  catch(err)
  {
    toast.error(err.response? err.reponse.data.message : err.message
        , {position:"top-center"})
  }
}

if(isLoading)
    return(
      <div className="flex justify-center" >
        <Loader />
      </div>
    )

if(ebookErr)
    return(
       <div className="flex justify-center" >
        <p className="text-rose-600 " >{ebookErr.message}</p>
       </div>
    )


return(
    <div className="grid lg:grid-cols-4 gap-8" >
           {
              ebook.length === 0 &&
                <div className="flex flex-col" >
                    <label>You don't have any PDF</label>
                    <Link to="/" className="mt-3 text-center bg-indigo-600 text-white font-medium py-3 rounded" >BuyNow</Link>
                </div>
             
           } 
        {
            ebook?.map((item,index)=>(
                <button key={index} onClick={()=>showPdf(item.ebook.ebook)} className="w-full" >
                    <img src={item.ebook.thumbnail ? item.ebook.thumbnail : "/images/dummy.jpg" } className="rounded-lg w-full"  />
                    <div className="p-2">
                        <div className="w-full flex justify-between mt-3 mb-2">
                            <h1 className="capitalize font-medium" >{item.ebook.title}</h1>
                            <button className="bg-gray-100 border rounded px-2 text-xs py-1 capitalize" >{item.ebook.category}</button>
                        </div>
                        <div className="w-full flex gap-3" >
                            <h1 className="capitalize font-medium">₹2000</h1>
                            <del>₹2000</del>
                            <label className="text-gray-500" >(50% discount)</label>
                        </div>
                    </div>
                </button>
                
            ))
        }

        
    </div>
)
}

export default Ebook