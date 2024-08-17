import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <div className="navbar ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <Link to={'/'}>Home</Link>
                            <Link to={'/categories'}>Categories</Link>
                            <Link to={'/about'}>About Us</Link>
                            <Link to={'/contact'}>Contact Us</Link>
                        </ul>
                    </div>
                    <Link
                        to={'/'}
                        className="text-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                    >
                        MarketMingle
                    </Link>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-3 px-1">
                        <Link to={'/'}>Home</Link>
                        <Link to={'/categories'}>Categories</Link>
                        <Link to={'/about'}>About Us</Link>
                        <Link to={'/contact'}>Contact Us</Link>
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to={'/login'} className="btn">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;