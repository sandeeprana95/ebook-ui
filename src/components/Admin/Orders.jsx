import useSWR from "swr"
import fetcher from "../../util/fetcher"

const Orders=()=>{
    const {data,error,isLoading} = useSWR("order",fetcher)
    console.log(data)
    return(
        <div>Orders</div>
    )
}

export default Orders