import { useState } from 'react';
import Container from "../../utils/Container";
import Title from '../../utils/Title';
import { useGetAllProducts, useGetCategories } from '../../service/products.hook';
import Loading from '../../utils/Loading';
import { Product } from '../../utils/types';
import { getRandomImageUrl } from '../../utils/getRandomPics';

const CategoryView = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const { data, isLoading } = useGetAllProducts({ category: selectedCategory });

    const { data: categories } = useGetCategories();

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
        <Container className='my-10 py-10'>
            <Title title='Categories' />
            <div
                role="tablist"
                className="flex w-3/4 overflow-auto  gap-4  mx-auto "
            >
                {categories && categories.map((category: string, index: number) => (
                    <div
                        key={index}
                        role="tab"
                        className={`cursor-pointer px-4 py-1 rounded-lg text-center ${activeTab === index ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                        onClick={() => {
                            setActiveTab(index);
                            setSelectedCategory(category);
                        }}
                    >
                        {category}
                    </div>
                ))}
            </div>
            <div className="mt-6 mx-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center">
                {data && produtsWithImage?.slice(0,3).map((product: Product, index: number) => {
                    console.log(product);
                    return (
                        <div key={index} className="card bg-base-100 my-10 shadow-xl">
                            <figure>
                                <img
                                    className="w-full h-48 object-cover"
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
                    )
                }
                )}
            </div>

        </Container>
    );
};

export default CategoryView;
