import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import http from '../util/http';
import { toast } from 'react-toastify';
import axios from "axios"

const ForgotPassword = () => {
 
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password,setPassword] = useState("")
  const [params] = useSearchParams()
  const [sent,setSent] = useState(false)
  const [passwordType,setPasswordType] = useState("password")
  const [loading,setLoading] = useState(false)

  console.log(sent)

  const handleSubmit = async(e) => {
    try{
         e.preventDefault();
         setLoading(true)
         const {data} = await http.post("/user/forgot-password",{email})
         toast.success(data.message)
    }
    catch(err)
    {
      toast.error(err.response? err.response.data.message : err.message)
    }
    finally
    {
      setLoading(false)
    }
   
  };


  useEffect(()=>{
    const t = params.get("token")
    if(t)
    {
      checkToken(t)
    }
    else{
      setSent(false)
    }
  },[params])


  const checkToken=async(token)=>{
    try{
         
      const options={
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      
     const {data} =  await http.post("/user/forgot-session",{},options)
      
      setSent(true)

    }
    catch(err)
    {
      return setSent(false)
    }

  }

  const changePassword=async(e)=>{
    try{
         e.preventDefault()

        setLoading(true)

        const options={
          headers:{
            Authorization : `Bearer ${params.get("token")}`
          }
        }

       const {data} =  await http.post("/user/update-password",{password},options)
       setPassword("")
       toast.success("Password Changed, please wait while we are redirecting you")

       setTimeout(() => {
         navigate("/login")
       }, 4000);

    }
    catch(err)
    {
      toast.error(err.response? err.response.data.message : err.message)
    }
    finally
    {
      setLoading(false)
    }
  }




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md animate__animated animate__pulse">
        {
          !sent &&
          <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-2">Forgot Your Password?</h2>
          <p className="text-gray-600 mb-6">
            Enter your email address and we’ll send you a link to reset your password.
          </p>
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {
             loading ?
                <button disabled
                  type="button"
                  className="bg-gray-500 text-white py-3 rounded hover:bg-gray-700 transition duration-200"
                >
                  Please wait...
                </button>
                :
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
                >
                 Send Reset link
                </button> 
           }

          <Link
            to="/login"
            className="text-blue-600 text-sm text-center mt-4 hover:underline"
          >
            Back to Login
          </Link>
          </form>
        }


        {
          sent &&
           <form onSubmit={changePassword} className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-5 text-center ">Forgot Your Password?</h2>
           <div className='flex flex-col gap-2 relative ' >
              <label className='text-sm font-semibold' >Create New Password</label>
                <input
                  type={passwordType === "password" ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  required
                  className="p-3 border border-gray-300 rounded mb-4 pr-15 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                 {
                   passwordType === "password" ?
                    <button  type='button' onClick={()=>setPasswordType(passwordType === "password" ? "text" : "password")}
                          className='w-7 h-7 bg-blue-100 hover:bg-blue-200 rounded-full absolute bottom-6 right-6 '   
                      >
                      <i className='ri-eye-line text-lg' />
                    </button>
                    :
                    <button  type='button'  onClick={()=>setPasswordType(passwordType === "password" ? "text" : "password")}
                          className='w-7 h-7 bg-blue-100 hover:bg-blue-200 rounded-full absolute bottom-6 right-6 '   
                      >
                      <i className='ri-eye-off-line text-lg' />
                    </button>
                 }
           </div>

           {
             loading ?
                <button disabled
                  type="button"
                  className="bg-gray-500 text-white py-3 rounded hover:bg-gray-700 transition duration-200"
                >
                  Please wait...
                </button>
                :
                <button
                  type="submit"
                  className="bg-rose-500 text-white py-3 rounded hover:bg-rose-700 transition duration-200"
                >
                  Save Password
                </button> 
           }

          <Link
            to="/login"
            className="text-blue-600 text-sm text-center mt-4 hover:underline"
          >
            Back to Login
          </Link>
          </form>

        }



      </div>
    </div>
  );
};

export default ForgotPassword;
