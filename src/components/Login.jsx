import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios, { AxiosError } from "axios"
import { mutate } from "swr"
axios.defaults.withCredentials=true

const Login=()=>{
    const navigate = useNavigate()
    const formModel={
        email:"",
        password:""
    }
  const [type,setType]=useState("password")
  const [loginInput,setLoginInput]=useState(formModel)

    const handleInput=(e)=>{
        const input = e.target
        const name = input.name
        const value = input.value
        setLoginInput({
            ...loginInput,
            [name] : value
        })
    }

 const loginForm = async(e)=>{
    try{
        e.preventDefault()

        const user = {
            email:"sandeep@gmail.com",
            password:"9090"
        }

       const {data} =  await axios.post("http://localhost:8080/user/login",loginInput)

        if(user.role === "admin")
        return navigate("/admin/dashboard")

        alert("hello user")
    }
    catch(err)
    {
        err.response ? console.log(err.response.data.message) : console.log(err.message)
    }
    
 }

    return(
        <div className="min-h-screen animate__animated animate__fadeIn flex justify-center items-center ">
            <div className="w-[480px] mx-auto animate__pulse shadow-xl p-2 border border-gray-300 rounded-sm">
            <h1 className="font-semibold text-2xl text-center text-green-500" >Hi User !</h1>
            <form className="space-y-4" onSubmit={loginForm} >
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Email</label>
                    <input
                    type="email"
                    name="email"
                    onChange={handleInput}
                    className="border border-gray-500 rounded p-3"
                    placeholder="enter your email" />
                </div>
                <div className="flex flex-col gap-2 relative">
                    <label className="font-medium">Password</label>
                    <input
                    type={type}
                    name="password"
                    onChange={handleInput}
                    className="border border-gray-500 rounded p-3"
                    placeholder="enter your password" />
                    <div className="absolute top-11 right-6" >
                     <button type="button" onClick={()=>setType(type === "password"? "text" : "password")} >
                        {
                            type === "password" ? 
                            <i className="ri-eye-off-line text-lg hover:text-blue-500"/>
                             :
                             <i className="ri-eye-line text-lg hover:text-blue-500"/>

                        }
                         </button>
                    </div>
                </div>
                <div>
                    <button className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600" >Login</button>
                </div>
            </form>
            <div className="space-x-2 mt-3" >
                <label className="font-[300]" >I Don't have an Account ?</label>
                <Link to="/signup" className="font-semibold text-blue-500 hover:underline" >Register Now</Link>
            </div>

            </div>
        </div>
    )
}

export default Login