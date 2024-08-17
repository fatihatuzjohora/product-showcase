import { useState, useEffect } from "react"
import { useGetAllProducts } from "../../service/products.hook";
import Container from "../../utils/Container";
import Loading from "../../utils/Loading";
import { getRandomImageUrl } from "../../utils/getRandomPics";
import Title from "../../utils/Title";
import Pagination from "../../utils/Pagination";

const AllProducts = () => {
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAllProducts({ page: currentPage });

    useEffect(() => {
        if (data) {
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        }
    }, [data]);

    const produtsWithImage = data?.products?.map((product: { productImage: any; }) => {
        if (product.productImage === "") {
            return {
                ...product,
                productImage: getRandomImageUrl()
            };
        }
        return product;
    });

    return (
        <Container className="py-10 my-10">
            <Title title="Products" />
            {
                isLoading ? <Loading /> :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5">
                        {produtsWithImage?.map((product: any, index: number) => (
                            <div key={index} className="card bg-base-100 my-10 shadow-xl">
                                <figure>
                                    <img
                                        className="w-full object-cover"
                                        src={product.productImage}
                                        alt="Shoes" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{product.productName}</h2>
                                    <p>{product.description}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
            }
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </Container>
    );
};

export default AllProducts;