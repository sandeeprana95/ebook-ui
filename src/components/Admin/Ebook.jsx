import { useState } from "react"
import fetcher from "../../util/fetcher"
import moment from "moment"
import useSWR, { mutate } from "swr"
import { createPortal } from "react-dom"
import http from "../../util/http"
import { toast } from "react-toastify"

const Ebook=()=>{
    const [open,setOpen] = useState(false)

    const {data:ebook,error:ebookError,isLoading:ebookLoading} = useSWR("/ebook",fetcher)
    const {data:category,error:categoryError,isLoading:categoryLoading} = useSWR("/category",fetcher)

    const ebookModel={
        title:"",
        description:"",
        price:"",
        discount:"",
        category:""
    }

    const [ebookInput,setEbookInput]=useState(ebookModel)
    const [editEbookId,setEditEbookId]=useState(null)

    const handleEbook=(e)=>{
        const input = e.target
        const name = input.name
        const value = input.value
        setEbookInput({
            ...ebookInput,
            [name] : value
        })
    }

    const closeDrawer=()=>{
        setOpen(false)
        setEbookInput(ebookModel)
        setEditEbookId(null)
    }

    const createEbook=async(e)=>{
        const toastId = toast.loading("creating ebook...",{position:"top-center"})
        try{
            e.preventDefault()

            await http.post("/ebook",ebookInput)
             closeDrawer()
             mutate("/ebook")
        }
        catch(err)
        {
           toast.error(err.response? err.response.data.message : err.message
            ,{position:"top-center"})
        }
        finally
        {
            toast.done(toastId)
        }
    }

    const saveEbook=async(e)=>{
        closeDrawer()
        const toastId = toast.loading("Updating ebook...",{position:"top-center"})
        try{
            e.preventDefault()
           await http.put(`/ebook/${editEbookId}`,ebookInput)
            mutate("/ebook")
        }
        catch(err)
        {
        toast.error(err.response? err.response.data.message : err.message
            ,{position:"top-center"}
        )
        }
        finally
        {
            toast.done(toastId)
        }
    }


    const editEbook=(item)=>{
        setOpen(true)
        setEditEbookId(item._id)
        delete item._id
        setEbookInput(item)
    }



    const deleteEbook=async(id)=>{
        const toastId = toast.loading("Processing...")
        try{
            await http.delete(`/ebook/${id}`)
            mutate("/ebook")
        }
        catch(err)
        {
           toast.error(err.response? err.response.data.message : err.message
            ,{position:"top-center"}
           )
        }
        finally
        {
            toast.done(toastId)
        }
    }

    const uploadThumbnail=async(e,id)=>{
        try{
            const input = e.target
            const file = input.files[0]
            const formData = new FormData()
            formData.append("file",file)
            const {data} = await http.post("/storage",formData)
            console.log(data)
           const res = await http.put(`ebook/${id}`,{thumbnail:data.location})
           console.log(res.data)
            mutate("/ebook")
        }
        catch(err)
        {
           console.log(err)
           toast.error(err.response? err.response.data.message : err.message)
        }

    }


    const uploadEbook=async(e,id)=>{
        const toastId = toast.loading("Processing...", {position:"top-center"})
        try{
            const input = e.target
            const file = input.files[0]
            const formData = new FormData()
            formData.append("file",file)
            const {data} = await http.post("/storage",formData)
            await http.put(`/ebook/${id}?fieldType=array`,{ebook:data.key})
            mutate("/ebook")
        }
        catch(err)
        {
            toast.error(err.response ? err.response.data.message : err.message)
        }
        finally{
            toast.done(toastId)
        }
    }

    const downloadEbook=async(e)=>{
        try{
            const select = e.target
            const key = select.value
            if(key === "ebooks")
                return toast.info("Please select a file to download",{position:"top-center"})

            const {data} = await http.post("/storage/download",{path:key})
            window.location = data.url
        }
        catch(err)
        {
            toast.error(err.response ? err.response.data.message : err.message)
        }
    }


    return(
        <div className="space-y-8 animate__animated animate__fadeIn " >
            <button onClick={()=>setOpen(true)}
            className="bg-indigo-500 hover:bg-indigo-600 px-4 py-1.5 rounded text-white font-medium"
            ><i className="ri-add-line text-xl" /> New Ebook
            </button>

            <div className="grid lg:grid-cols-4 gap-8 ">
                {
                    ebook?.map((item,index)=>(
                        <div key={index} className="shadow-xl" >
                            <div className="relative">
                            <img src= { item.thumbnail ? item.thumbnail : "https://random-image-pepebigotes.vercel.app/api/random-image" } 
                             className="w-full h-60"
                            />
                            <input 
                              type="file"
                              accept="image/*"
                              className="opacity-0 absolute top-0 left-0 w-full h-full"
                              onChange={(e)=>uploadThumbnail(e,item._id)}
                            />
                            </div>
                           <div className="px-4 pt-2 pb-4 border-l border-r border-b">
                            <h1 className="text-[17px] font-medium capitalize mt-3 mb-1"
                            >{item.title}</h1>
                            <div className="flex gap-2 items-center" >
                                <label className="text-lg font-medium">₹{Math.round(item.price-(item.price*item.discount)/100)}</label>
                                <del>₹{item.price}</del>
                                <label>({item.discount}%off)</label>
                            </div>
                            <label className="text-gray-500">{moment(item.createdAt).format('MMM DD YYYY, hh:mm:ss A')}</label>
                              <div className="mt-4 space-x-3" >
                                <button onClick={()=>editEbook(item)}
                                 className="bg-green-400 text-white hover:bg-green-500 px-2 py-1 rounded" 
                                ><i className="ri-edit-line"/></button>
                                <button onClick={()=>deleteEbook(item._id)}
                                 className="bg-red-400 text-white hover:bg-red-500 px-2 py-1 rounded" 
                                ><i className="ri-delete-bin-line"/></button>

                                 <button className="bg-violet-400 text-white px-2 py-1 rounded relative">
                                    <i className="ri-add-line"></i>
                                    <input 
                                    type="file"
                                    className="border absolute top-0 left-0 w-full h-full opacity-0"
                                    onChange={(e)=>uploadEbook(e,item._id)}
                                    accept=".pdf"
                                    />
                                </button>
                                </div>
                                {
                                item.ebook.length === 0 ? 
                                <label className="text-sm text-gray-500 mt-4 block">No Ebook Uploaded</label>
                                :
                                <select className="mt-4 border rounded p-2 w-full" onChange={downloadEbook}>
                                    <option value="ebooks">Ebooks List</option>
                                    {
                                    item.ebook.map((book, bookIndex)=>(
                                        <option value={book} key={bookIndex}>{book}</option>
                                    ))
                                    }
                                </select>
                                }
                           </div>
                        </div>
                    ))
                }
            </div>

          {
            open && createPortal(
            <div className="bg-[rgba(0,0,0,0.6)] h-full w-full absolute top-0 left-0 " style={{zIndex:9999}}>
              <aside className="bg-white w-[300px] h-screen fixed px-2 pt-2 right-0 " >
               <div className="flex border-b  pb-1 items-center justify-between " >
                <label className="font-semibold text-lg" >Ebook Title</label>
                <button onClick={()=>setOpen(false)} >
                    <i className="ri-close-circle-line text-3xl"/>
                </button>
               </div>
               {/* ebook create */}
               <form onSubmit={ editEbookId ? saveEbook : createEbook }
               className="space-y-4" >
                <h1 className="font-semibold text-2xl text-center text-blue-500 mt-3">Create New Ebook</h1>
                 <div className="flex flex-col gap-2" >
                    <label className="text-sm font-semibold">Title</label>
                    <input
                    type="text"
                    name="title"
                    value={ebookInput.title}
                    onChange={handleEbook}
                    placeholder="enter ebook title" 
                    className="border border-gray-500 py-3 pl-2 rounded focus:outline-indigo-600" required />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4" >
                 <div className="flex flex-col gap-2 " >
                    <label className="text-sm font-semibold" >Price</label>
                    <input type="number"
                    name="price"
                    value={ebookInput.price}
                    onChange={handleEbook}
                    placeholder="enter price"
                    className="border border-gray-500 py-3 pl-2 rounded focus:outline-indigo-600" required />
                 </div>
                 <div className="flex flex-col gap-2 " >
                    <label className="text-sm font-semibold" >Discount</label>
                    <input type="number"
                    name="discount"
                    value={ebookInput.discount}
                    onChange={handleEbook}
                    placeholder="enter discount"
                    className="border border-gray-500 py-3 pl-2 rounded focus:outline-indigo-600" required />
                 </div>
                 </div>
                 <div className="flex flex-col gap-2" >
                    <label className="text-sm font-semibold">Category</label>
                    <select
                    value={ebookInput.category}
                    onChange={handleEbook}
                    name="category"
                    className="border border-gray-500 py-3 pl-2 rounded focus:outline-indigo-600 w-full" required 
                    placeholder="Category"
                    >
                    <option>Select your category</option>
                        {
                            category?.map((item,index)=>(
                                <option key={index} value={item.title} className="uppercase">
                                {item.title}
                                </option>
                            ))
                        }
                    </select>
                    
                 </div>
                 
                 <div className="flex flex-col gap-2" >
                    <label className="text-sm font-semibold">Description</label>
                    <textarea
                    name="description"
                    value={ebookInput.description}
                    onChange={handleEbook}
                    rows={3}
                    placeholder="write ebook description here..."
                    className="border border-gray-500 py-3 pl-2 rounded focus:outline-indigo-600" required />
                 </div>
                  {
                    editEbookId ?
                    <div className="flex flex-col gap-2" >
                        <button className="w-full font-semibold text-white bg-blue-500 hover:bg-blue-600 py-3 rounded" >Save Ebook</button>
                        <button type="button" onClick={()=>closeDrawer()} className="w-full font-semibold text-white bg-red-500 hover:bg-red-600 py-3 rounded" >Cancel Ebook</button>
                    </div>
                    :
                    <button className="w-full font-semibold text-white bg-green-500 hover:bg-green-600 py-3 rounded" >Create Ebook</button>
                  }
               </form>
              </aside>
            </div>,document.body
          )}
           
        </div>
    )
}

export default Ebook