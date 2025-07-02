import { useState } from 'react';
import OtpInput from 'react-otp-input';

const Otp=()=>{
const [otp,setOtp]=useState("")

const verifyOtp=()=>{
    console.log(otp)
}

    return(
        <div className='bg-gray-200 min-h-screen flex lg:flex-row flex-col' >
          <div className='lg:w-6/12 bg-white flex item-center justify-center' >
             <img src='/svg/mobile.svg'
              className='w-9/12 lg:h-auto h-[200px] sm:h-[300px] '
             />
          </div>
          <div className="lg:w-6/12 flex items-center justify-center flex-col lg:p-0 p-12">
          <div className='space-y-6' >
              <h1 className='text-4xl font-bold' >Otp Verification Input</h1>
            <div>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<div className='mx-3'>-</div>}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={"!w-[60px] !h-[60px] font-[32] rounded  bg-white"}
                    />
            </div>
            <button onClick={verifyOtp}
            className='bg-indigo-600 text-white px-8 py-3 rounded font-medium'
            >Verify</button>
          </div>
          </div>
        </div>
    )
}

export default Otp