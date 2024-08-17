// types.ts
export interface Product {
    _id: string;
    productImage: string;
    productName: string;
    price: string;
    description: string;
    averageRating: number;
    categories: string[];
}

export interface ProductsData {
    products: Product[];
    totalPages: number;
    currentPage: number;
}
