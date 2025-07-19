import useSWR from "swr"
import fetcher from "../../util/fetcher.js"
import { useState } from "react"
import Loader from "../Shared/Loader.jsx"
import { toast } from "react-toastify"
import http from "../../util/http.js"
import { Link } from "react-router-dom"

const Ebook=()=>{
const [pdf,setPdf] = useState("/pdf/sample.pdf")
const {data:ebook , error:ebookErr , isLoading } = useSWR("/order",fetcher)


const showPdf=async(ebooks)=>{
  try{
       const path = ebooks[ebooks.length-1]
       const {data} = await http.post("/storage/download",{path})
       alert(data.url)
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
    <div className="grid grid-cols-12 gap-8" >
        
        <div className="col-span-4 space-y-4">
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
                </button>
            ))
        }
        </div>
        <div className="col-span-8 bg-blue-300">
            <iframe
            src={pdf}  
             className="w-full h-[600px]"
            />
        </div>

        
    </div>
)
}

export default Ebook