// In products.api.js
import axios from "axios";
import { baseApi } from "./baseApi";

export const getProducts = async (params = {}) => {
    // Construct the query string from the params object
    const queryString = new URLSearchParams(params).toString();

    // Make the API call with the query string
    const response = await axios.get(`${baseApi}/products?${queryString}`);
    return response.data;
};


export const getCategories = async () => {
    const response = await axios.get(`${baseApi}/categories`);
    return response.data;
}


export const getFeaturedProducts = async (minRating = 0) => {
    const response = await axios.get(`${baseApi}/featured-products`, {
        params: { minRating }
    });
    return response.data;
};
