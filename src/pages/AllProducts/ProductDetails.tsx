import { useParams } from "react-router-dom";
import { useGetSingleProducts } from "../../service/products.hook";
import Loading from "../../utils/Loading";
import { getRandomImageUrl } from "../../utils/getRandomPics";

const ProductDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetSingleProducts(id ?? '');
    console.log(data);
    return (
        <div>
            {isLoading ? <Loading /> :
                <div  className="card bg-base-100 my-10 shadow-xl">
                    <figure>
                        <img
                            className="w-full object-cover"
                            src={getRandomImageUrl()}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{data.productName}</h2>
                        <p>{data.description}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ProductDetails;