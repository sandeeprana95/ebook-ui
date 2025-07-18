import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import http from '../util/http'


const Signup=()=>{
  const navigate = useNavigate()
  const [type,setType]=useState("password")

  const model={
    fullname:"",
    email:"",
    password:"",
    mobile:""
  }
  const [signupForm,setSignupForm]= useState(model)

  const handleInput=(e)=>{
        const input = e.target
        const name = input.name
        const value = input.value
        setSignupForm({
            ...signupForm,
            [name] : value
        })

    }

  const signup = async (e)=>{
    try{
        e.preventDefault()

        const {data} = await http.post("user/signup",signupForm)
        toast.success(data.message,{position:"top-center"})
        navigate("/login")
    }
    catch(err)
    {
      toast.error(err.response? err.response.data.message : err.message 
        ,{position:"top-center"}
      )
    }
    finally{
      setSignupForm(model)
    }
  }

  

    return(
        <div className="min-h-screen animate__animated animate__fadeIn flex justify-center items-center ">
            <div className="w-[480px] mx-auto animate__pulse shadow-xl p-2 border border-gray-300 rounded-sm">
            <h1 className="font-semibold text-2xl text-center text-blue-500" >Register Now</h1>
            <form className="space-y-4" onSubmit={signup} >
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Fullname</label>
                    <input
                    type="text"
                    name="fullname"
                    value={signupForm.fullname}
                    onChange={handleInput}
                    className="border border-gray-500 rounded p-3"
                    placeholder="enter your email" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Email</label>
                    <input
                    type="email"
                    name="email"
                    value={signupForm.email}
                    onChange={handleInput}
                    className="border border-gray-500 rounded p-3"
                    placeholder="enter your email" />
                </div>
                <div className="flex flex-col gap-2 relative">
                    <label className="font-medium">Password</label>
                    <input
                    type={type}
                    name="password"
                    value={signupForm.password}
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
                    value={setSignupForm.mobile}
                    onChange={(value)=>setSignupForm({...signupForm,"mobile":value})}
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