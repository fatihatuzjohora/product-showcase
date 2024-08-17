import { Link } from "react-router-dom";
import { useGetAllProducts } from "../../service/products.hook";
import Container from "../../utils/Container";
import Loading from "../../utils/Loading";
import { getRandomImageUrl } from "../../utils/getRandomPics";
import Title from "../../utils/Title";

const ProductListing = () => {
    const { data, isLoading } = useGetAllProducts();

    const produtsWithImage = data?.products?.map((product: { productImage: any; }) => {
        if (product.productImage === "") {
            return {
                ...product,
                productImage: getRandomImageUrl()
            };
        }
        return product;
    });

    if (isLoading) return <Loading />
    return (
        <Container className="py-10 my-10">
           <Title title="Products"/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5">
                {produtsWithImage?.slice(0, 6).map((product: any, index: number) => (
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
            <div className="flex justify-center">
                <Link to={'/allProducts'}>
                    <button className="btn btn-primary ">View All</button>
                </Link>
            </div>
        </Container>
    );
};

export default ProductListing;