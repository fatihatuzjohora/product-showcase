// In products.hook.js
import { QueryKey, useQuery } from "@tanstack/react-query"
import { getCategories, getFeaturedProducts, getProducts } from "./products.api"

const productsQueryKey = (params: {}) => ['products', params];

export const useGetAllProducts = (params = {}) => {
    return useQuery({
        queryKey: productsQueryKey(params),
        queryFn: () => getProducts(params)
    });
}

export const useGetCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories()
    });
}


const featuredProductsQueryKey: QueryKey = ['featuredProducts'];
export const useGetFeaturedProducts = (minRating = 0) => {
    return useQuery({
        queryKey: [...featuredProductsQueryKey, minRating],
        queryFn: () => getFeaturedProducts(minRating)
    });
};
