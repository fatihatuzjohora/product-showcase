import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useGetAllProducts } from "../../service/products.hook";
import { Product } from "../../utils/types";

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const [search, setSearch] = useState('');
    const location = useLocation();

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { user, logout, loading } = authContext;

    // Use the custom hook to fetch products based on the search query
    const { data, isLoading, refetch } = useGetAllProducts({ search: search || undefined });

    // Function to handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    // Effect to refetch data when search changes
    useEffect(() => {
        if (search) {
            refetch();
        }
    }, [search, refetch]);

    // Effect to clear search state when navigating away from home
    useEffect(() => {
        if (location.pathname !== '/') {
            setSearch('');
        }
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div>
            <div className="navbar">
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
                    {loading ? (
                        <span>Loading...</span>
                    ) : user ? (
                        <div className="flex items-center gap-2">
                            {user.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                            )}
                            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
                        </div>
                    ) : (
                        <Link to={'/login'} className="btn">Login</Link>
                    )}
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="input input-bordered w-full max-w-xs mb-3"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
            {search && (
                <div className="flex justify-center mt-4">
                    {isLoading ? (
                        <p>Loading products...</p>
                    ) : (
                        <ul>
                            {data?.products.map((product: Product) => (
                                <li key={product._id} className="py-2">
                                    <Link to={`/productDetails/${product._id}`} className="text-blue-500 hover:underline">
                                        {product.productName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
