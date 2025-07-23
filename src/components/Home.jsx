import { Link, useNavigate } from "react-router-dom"
import moment from "moment"
import useSWR from "swr"
import fetcher from "../util/fetcher"
import discount from "../util/discount"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import http from "../util/http"
import { toast } from "react-toastify"
import { useRazorpay } from "react-razorpay"
import { useContext } from "react"
import Context from "../util/Context"

const ENV = import.meta.env

const Home=()=>{
   const navigate = useNavigate()
   const { Razorpay } = useRazorpay()

const {session} = useContext(Context)
const { data:ebook , error:ebookErr , isLoading:ebookLoading } = useSWR("/ebook",fetcher)

console.log(ebook)

const buyNow = async(item)=>{
    try{
        const {data} = await http.post("/payment/order",{ebookId:item._id})

            const options = {
                    key: ENV.VITE_RZR_KEY,
                    amount: data.amount, // Amount in paise
                    currency: "INR",
                    name: "Ebook",
                    description: item.title,
                    order_id: data.id, // Generate order_id on server
                    handler: (response) => {
                        console.log(response);
                        alert("Payment Successful!");
                        navigate("/app/ebook")
                    },
                    prefill: {
                        name: session?.fullname,
                        email: session?.email,
                        contact: session?.mobile,
                    },
                    theme: {
                        color: "#3399cc",
                    },
                    notes: {
                        name: session?.fullname,
                        user:session.id,
                        ebook:item._id,
                        discount:item.discount
                    }
                    };

                    const rzp = new Razorpay(options);
                    rzp.open();

                    rzp.on("payment.failed",(res)=>{
                           alert(res)
                    })

                }
        catch(err)
        {
            // console.log(err + "order error")
            if(err.status === 400)
                return navigate("/login")
            
            toast.error("Failed to capture payment please try after sometime",{
                position: "top-center"
            })
        }
    }


if(ebookLoading)
   return(
         <div className="grid lg:grid-cols-4 gap-4 w-10/12 mx-auto py-2" >
            {
                Array(12).fill(0).map((item,index)=>(
                <div key={index} className="shadow-xl" >
                    <Skeleton className="h-40 w-full" />
                    <div className="px-4 pt-2 pb-4 border-gray-300 border-l border-r border-b space-y-2">
                    <h1 className="w-[50%]" ><Skeleton/></h1>
                    <div className="flex gap-2  h-[10px]" >
                        <label className="text-lg font-medium w-[30%]"><Skeleton/></label>
                    </div>
                    {/* <label><Skeleton className="!w-[80%] block" /></label> */}
                    <div className=" py-3 rounded " >
                    <Skeleton className="h-[45px] w-full" />
                    </div>
                    </div>
                </div>
                ))
            }
        </div>
      )


if(ebookErr)
    return( <div>
            <h1 className="text-rose-600" >Failed ! To fetch products</h1>
        </div>
        )

    return(
        <div className="grid lg:grid-cols-4 gap-8 w-10/12 mx-auto py-12" >
            {
               ebook?.map((item,index)=>(
                <div key={index} className="shadow-xl border border-gray-300" >
                    <img src={item.thumbnail ? item.thumbnail: "https://random-image-pepebigotes.vercel.app/api/random-image" }
                    className="h-60 w-full"
                    />
                    <div className="p-3 space-y-1">
                    <h1 className="text-[17px] font-medium capitalize">{item.title}</h1>
                    <div className="flex gap-2 items-center" >
                        <label className="text-lg font-medium">₹{discount(item.price,item.discount)}</label>
                        <del>₹{item.price}</del>
                        <label className="text-gray-500" >({item.discount}%off)</label>
                    </div>
                    <div className="bg-blue-500 hover:bg-blue-600 py-3 text-white text-center mt-2 font-semibold rounded " >
                    <button onClick={()=>buyNow(item)} >BuyNow</button>
                    </div>
                    </div>
                </div>
                ))
            }
        </div>
    )
}

export default Home