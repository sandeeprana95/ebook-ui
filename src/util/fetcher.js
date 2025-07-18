import axios from "axios"
import http from "./http"

const fetcher=async(url)=>{
    try{
        
        const {data} = await http.get(url)
        return data
    }
    catch(err)
    {
        throw new Error(err)
    }
}

export default fetcher