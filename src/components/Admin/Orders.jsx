import useSWR from "swr"
import fetcher from "../../util/fetcher"
import moment from "moment"
import { Pagination, Skeleton } from "antd"
import { useState } from "react"

const Orders=()=>{
    const [ page , setPage ] = useState(1)
    const [ limit , setLimit ] = useState(6)
    const {data,error,isLoading} = useSWR(`/order?page=${page}&limit=${limit}`,fetcher)
    console.log(data)

    const onPaginate =(pageNum)=>{
      setPage(pageNum)
    }

    if(isLoading)
       return <Skeleton/>

    if(error)
        return <p className="text-rose-600" >{error.message}</p>

    return(
        <div >
            <table className="w-full" >
                <thead className="bg-indigo-500 text-white text-left" >
                    <th className="py-3 pl-3" >Id</th>
                    <th>Customer's name</th>
                    <th>Email</th>
                    <th>Ebook</th>
                    <th>Mobile</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Date</th>
                    <th>Status</th>
                </thead>
                <tbody>
                    {
                        data?.data.map((item,index)=>(
                           <tr key={index} className="border-b" >
                                <td className="py-3 pl-3" >{item._id}</td>
                                <td>{item.user.fullname}</td>
                                <td>{item.user.email}</td>
                                <td>{item.ebook.title}</td>
                                <td>{item.user.mobile}</td>
                                <td>{item.amount}</td>
                                <td>{item.discount}</td>
                                <td>{moment(item.createdAt).format("DD MMM YYYY hh:mm A")}</td>
                                <td>
                                    {
                                        (item.status === "success")?
                                        <button className="bg-green-500 font-medium px-3 text-white rounded" >{item.status}</button>
                                        :
                                        <button className="bg-rose-500 font-medium px-3 text-white rounded " >{item.status}</button>
                                    }
                                </td>
                           </tr> 
                        ))
                    }
                </tbody>
            </table>

            <div className="flex justify-end" >
                <Pagination 
                 onChange={onPaginate}
                 current={page}
                  total={data?.total}
                />
            </div>
        </div>
    )
}

export default Orders