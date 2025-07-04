import { Link } from "react-router-dom"
import { useState } from "react"

const Home=()=>{
    const [loading , setLoading] = useState(null)

   
    return(
        <div className="space-x-4 flex justify-center items-center h-screen flex-col gap-8" >
            <h1 className="text-4xl" >Welcome to home </h1>
            <button className="border-2 border-green-500  rounded text-green-500 px-6 py-3 text-lg font-semibold hover:border-3 hover:text-green-600 hover:shadow-2xl" ><Link to="/login">Login</Link></button>
            <button className="border-2 border-red-500  rounded text-red-500 px-6 py-3 text-lg font-semibold hover:border-3 hover:text-red-600 hover:shadow-2xl" ><Link  to="/signup" >Signup</Link></button>
            <button className="border-2 bg-blue-500  rounded text-white px-6 py-3 text-lg font-semibold hover:border-3 hover:text-red-600 hover:shadow-2xl" ><Link  to="/admin" >Home</Link></button>
            <div className="grid grid-cols-4 gap-4 border p-4 ">
             {
                Array(10).fill(0).map((item,index)=>(
                    <button onClick={()=>setLoading(index)}
                    className="border-2 bg-blue-500  rounded-md text-white px-6 py-3 text-lg font-semibold hover:border-3 hover:text-red-600 hover:shadow-2xl"
                    >{loading === index ? "loading... " + loading : "Request " + index}</button>
                ))
             }
            </div>

        </div>


    )
}

export default Home