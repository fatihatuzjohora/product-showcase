// In products.hook.js
import { QueryKey, useQuery } from "@tanstack/react-query"
import { getCategories, getFeaturedProducts, getProducts, getSingleProduct } from "./products.api"

const productsQueryKey = (params: {}) => ['products', params];

export const useGetAllProducts = (params = {}) => {
    return useQuery({
        queryKey: productsQueryKey(params),
        queryFn: () => getProducts(params)
    });
}
export const useGetSingleProducts = (id: string ) => {
    return useQuery({
        queryKey: productsQueryKey(id),
        queryFn: () => getSingleProduct(id)
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
