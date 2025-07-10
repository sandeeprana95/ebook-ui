import { Outlet, Link} from "react-router-dom"

const Layout=()=>{
    return(
        <div>
            <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="text-2xl font-bold">
                <Link to="/">
                <div className="h-[40px] rounded ">
                    <img className="w-full h-full rounded" src="/images/ebook-logo.png" />
                </div>
                </Link>
                </div>
                <div className="space-x-6 flex">
                <Link to="/" className="flex items-center gap-1 hover:text-gray-200">
                    <i className="ri-home-line text-lg"></i> Home
                </Link>
                <Link to="/login" className="flex items-center gap-1 hover:text-gray-200">
                    <i className="ri-login-box-line text-lg"></i> Login
                </Link>
                <Link to="/signup" className="flex items-center gap-1 hover:text-gray-200">
                    <i className="ri-user-add-line text-lg"></i> Signup
                </Link>
                </div>
                {/* Mobile menu */}
                <div className="md:hidden">
                <button id="menu-btn" className="text-2xl">
                    <i className="ri-menu-line"></i>
                </button>
                </div>
            </div>
           </nav>
            <section><Outlet/></section>
            <footer className="bg-gray-900 text-gray-300 py-12 mt-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                <h2 className="text-xl font-bold mb-4">About eBook</h2>
                <p className="text-sm leading-relaxed">
                    eBook is your go-to platform for digital books. Explore, read, and share your knowledge. Stay connected with your favorite authors and discover new stories every day.
                </p>
                </div>
                <div>
                <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white">Support</a></li>
                    <li><a href="#" className="hover:text-white">Blog</a></li>
                </ul>
                </div>
                <div>
                <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                <ul className="text-sm space-y-2">
                    <li>Email: support@ebook.com</li>
                    <li>Phone: +91 9876543210</li>
                    <li>Address: New Delhi, India</li>
                </ul>
                </div>
            </div>
            <div className="text-center mt-8 text-sm text-gray-500">
                © {new Date().getFullYear()} eBook. All rights reserved.
            </div>
    </footer>
        </div>
    )
}

export default Layout