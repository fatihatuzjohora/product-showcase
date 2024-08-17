import CategoryView from "../pages/Home/CategoryView";
import FeaturedProducts from "../pages/Home/FeaturedProducts";
import Hero from "../pages/Home/Hero";
import ProductListing from "../pages/Home/ProductListing";

const Home = () => {
    return (
        <div>
            <Hero/>
            <ProductListing/>
            <CategoryView/>
            <FeaturedProducts/>
        </div>
    );
};

export default Home;