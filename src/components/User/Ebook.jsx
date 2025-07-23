import moment from "moment"
import useSWR from "swr"
import fetcher from "../../util/fetcher.js"
import Loader from "../Shared/Loader.jsx"
import { toast } from "react-toastify"
import http from "../../util/http.js"
import { Link } from "react-router-dom"
import discount from "../../util/discount.js"


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
                <div key={index} onClick={()=>showPdf(item.ebook.ebook)} className="w-full border border-gray-300 rounded-md shadow-lg" >
                    <img src={item.ebook.thumbnail ? item.ebook.thumbnail : "/images/dummy.jpg" } className="rounded-lg w-full max-sm:h-[300px] sm:h-65"  />
                    <div className="px-4 pb-2" >
                        <div className="w-full flex justify-between mt-3 mb-2">
                            <h1 className="capitalize font-medium" >{item.ebook.title}</h1>
                            <button className="bg-gray-100 border rounded px-2 text-xs py-1 capitalize" >{item.ebook.category}</button>
                        </div>
                        <div className="w-full flex gap-3" >
                            <h1 className="capitalize font-medium">₹{Math.round(discount(item.amount,item.discount))}</h1>
                            <del>₹{Math.round(item.amount)}</del>
                            <label className="text-gray-500" >({item.discount}% discount)</label>
                        </div>
                        <label className="text-xs font-semibold text-zinc-400 block text-left mt-2" >{moment(item.createdAt).format("MMM DD YYYY hh:mm A")}</label>
                    </div>
                    {console.log(item)}
                </div>
                
            ))
        }

        
    </div>
)
}

export default Ebook