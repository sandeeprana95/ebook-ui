import { Link } from "react-router-dom"

const NotFound=()=>{
    return(
        <div className="h-screen flex justify-center items-center flex-col animate__animated animate__fadeIn" >
            <img src="/images/not-found.png" 
            className="lg:w-4/12 w-full"
            />
            <h1 className="text-zinc-600 text-xl mb-2" >404! Page not found</h1>
            <Link to="/">
            <button className="text-lg" ><i className="ri-home-line mr-2"/>Go Home</button>
            </Link>
        </div>
    )
}

export default NotFound