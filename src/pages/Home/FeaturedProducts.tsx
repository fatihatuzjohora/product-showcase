import { useState } from 'react';
import Container from "../../utils/Container";
import Title from '../../utils/Title';
import Loading from '../../utils/Loading';
import { useGetFeaturedProducts } from '../../service/products.hook';
import { Product } from '../../utils/types';
import { getRandomImageUrl } from '../../utils/getRandomPics';

const FeaturedProducts = () => {
    const [minRating, setMinRating] = useState(0);
    const { data: products, isLoading } = useGetFeaturedProducts(minRating);

    if (isLoading) return <Loading />;

    const produtsWithImage = products?.map((product: { productImage: any; }) => {
        if (product.productImage === "") {
            return {
                ...product,
                productImage: getRandomImageUrl()
            };
        }
        return product;
    });

    return (
        <Container className="my-10 py-10">
            <Title title="Featured Products" />
            <div className="flex justify-center mb-4">
                <label htmlFor="rating" className="mr-2">Minimum Rating:</label>
                <select
                    id="rating"
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="border border-gray-300 rounded-md p-1"
                >
                    <option value={0}>All</option>
                    <option value={1}>1 and above</option>
                    <option value={2}>2 and above</option>
                    <option value={3}>3 and above</option>
                    <option value={4}>4 and above</option>
                    <option value={5}>5 only</option>
                </select>
            </div>

            <div className="carousel w-[380px] md:w-full justify-center carousel-end rounded-box ">
                {produtsWithImage.length === 0 ? <div className='flex justify-center items-center'>
                    <h1 className="text-3xl font-semibold from-purple-400 via-pink-500 to-red-500">No products found</h1>
                </div> :
                    produtsWithImage.map((product: Product, index: number) => (
                        <div key={index} className="carousel-item flex-col gap-10 bg-base-100 shadow-lg">
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className="md:w-3/4 mx-auto object-cover h-60 rounded-lg px-4"
                            />
                            <div className="p-4 text-center mx-auto w-[60%] md:w-3/4">
                                <h3 className="text-lg font-bold">{product.productName}</h3>
                                <p>{product.description}</p>
                                <p className="mt-2 font-semibold">Rating: {product.averageRating}</p>
                                <p className="mt-2 text-primary font-bold">{product.price}</p>
                                <button className="btn btn-primary mt-4">Buy Now</button>
                            </div>
                        </div>
                    ))}
            </div>
        </Container>
    );
};

export default FeaturedProducts;
