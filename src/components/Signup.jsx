import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


const Signup=()=>{
  const navigate = useNavigate()
  const [type,setType]=useState("password")

  const model={
    fullname:"",
    email:"",
    password:"",
    mobile:""
  }
  const [inputValue,setInputValue]= useState(model)
  const [mobileInput,setMobileInput]=useState("")

  const handleInput=(e)=>{
        const input = e.target
        const name = input.name
        const value = input.value
        setInputValue({
            ...inputValue,
            [name] : value
        })

    }

  const signupForm=async(e)=>{
    try{
        e.preventDefault()

        const {data} = await axios.post("http://localhost:8080/user/signup",inputValue)
        alert(data.message)
        navigate("/login")

    }
    catch(err)
    {
        console.log(err)
        err.response? console.log(err.response.data.message) : console.log(err.message)
    }
  }

  

    return(
        <div className="min-h-screen animate__animated animate__fadeIn flex justify-center items-center ">
            <div className="w-[480px] mx-auto animate__pulse shadow-xl p-2 border border-gray-300 rounded-sm">
            <h1 className="font-semibold text-2xl text-center text-blue-500" >Register Now</h1>
            <form className="space-y-4" onSubmit={signupForm} >
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Fullname</label>
                    <input
                    type="text"
                    name="fullname"
                    value={inputValue.fullname}
                    onChange={handleInput}
                    className="border border-gray-500 rounded p-3"
                    placeholder="enter your email" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Email</label>
                    <input
                    type="email"
                    name="email"
                    value={inputValue.email}
                    onChange={handleInput}
                    className="border border-gray-500 rounded p-3"
                    placeholder="enter your email" />
                </div>
                <div className="flex flex-col gap-2 relative">
                    <label className="font-medium">Password</label>
                    <input
                    type={type}
                    name="password"
                    value={inputValue.password}
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
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Mobile</label>
                  <PhoneInput
                    country={'in'}
                    name="mobile"
                    value={inputValue.mobile}
                    onChange={(value)=>setInputValue({...inputValue,"mobile":value})}
                    inputStyle={{width:"100%",height:"48.6px",border:"1px solid gray"}}
                    enableSearch
                    />
                </div>
                
                <div>
                    <button className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600" >Signup</button>
                </div>
            </form>
            <div className="space-x-2 mt-3" >
                <label className="font-[300]" >Already have an Account ?</label>
                <Link to="/login" className="font-semibold text-blue-500 hover:underline" >Login</Link>
            </div>

            </div>
        </div>
    )
}

export default Signup