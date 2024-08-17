import { useState, useEffect } from "react";
import { useGetAllProducts, useGetCategories } from "../../service/products.hook";
import Container from "../../utils/Container";
import Loading from "../../utils/Loading";
import { getRandomImageUrl } from "../../utils/getRandomPics";
import Title from "../../utils/Title";
import Pagination from "../../utils/Pagination";
import { Link } from "react-router-dom";

const AllProducts = () => {
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter state
    const [brandName, setBrandName] = useState<string>("");
    const [categoryName, setCategoryName] = useState<string>("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const { data: categories } = useGetCategories();

    // State for filter visibility
    const [isFilterVisible, setIsFilterVisible] = useState(true);

    // Fetch products with filters
    const { data, isLoading } = useGetAllProducts({
        page: currentPage,
        search: brandName,
        category: categoryName,
        minPrice: priceRange[0] || 0,
        maxPrice: priceRange[1] || Infinity
    });

    useEffect(() => {
        if (data) {
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        }
    }, [data]);

    const productsWithImage = data?.products?.map((product: { productImage: any; }) => {
        if (product.productImage === "") {
            return {
                ...product,
                productImage: getRandomImageUrl()
            };
        }
        return product;
    });

    // Toggle filter visibility
    const handleFilterToggle = () => {
        setIsFilterVisible(!isFilterVisible);
    };
    console.log(categoryName);
    return (
        <Container className="">
            <Title title="Products" />

            {/* Toggle Button */}
            <button
                onClick={handleFilterToggle}
                className="mb-5 px-4 py-2 bg-blue-500 text-white rounded-md">
                {isFilterVisible ? "Hide Filters" : "Show Filters"}
            </button>

            {/* Filter UI */}
            {isFilterVisible && (
                <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="">
                        <label className="block text-gray-700">Brand Name:</label>
                        <input
                            type="text"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700">Categories:</label>
                        <select onChange={(e) => setCategoryName(e.target.value)} className="select w-full ">
                            <option value={""} selected>All</option>
                            {
                                categories?.map((category: any) => (
                                    <option key={category._id} value={category}>{category}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700">Price Range:</label>
                        <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-3">
                        <span>To</span>
                        <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                            className="border p-2 w-full"
                        />
                    </div>
                </div>
            )}

            {isLoading ? <Loading /> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5">
                    {productsWithImage?.map((product: any, index: number) => (
                        <Link to={`/productDetails/${product._id}`} key={index}>
                            <div className="card bg-base-100 my-10 shadow-xl">
                                <figure>
                                    <img
                                        className="w-full object-cover"
                                        src={product.productImage}
                                        alt="Product Image"
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{product.productName} <span>${product.price}</span></h2>
                                    <p>{product.description}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </Container>
    );
};

export default AllProducts;
