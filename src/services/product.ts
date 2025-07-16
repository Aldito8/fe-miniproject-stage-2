import type { Product } from "@/types/product";
import { api } from "./api";

export const handleAllProducts = async (params?: {
    sortBy?: string;
    order?: string;
    minPrice?: number;
    maxPrice?: number;
    minStock?: number;
    limit?: number;
    offset?: number;
}): Promise<{ product: Product[]; total: number }> => {
    try {
        const query = new URLSearchParams();

        if (params?.sortBy) query.append("sortBy", params.sortBy);
        if (params?.order) query.append("order", params.order);
        if (params?.minPrice !== undefined) query.append("minPrice", params.minPrice.toString());
        if (params?.maxPrice !== undefined) query.append("maxPrice", params.maxPrice.toString());
        if (params?.minStock !== undefined) query.append("minStock", params.minStock.toString());
        if (params?.limit !== undefined) query.append("limit", params.limit.toString());
        if (params?.offset !== undefined) query.append("offset", params.offset.toString());

        const res = await api.get(`/products/products?${query.toString()}`);
        return res.data.result;
    } catch (err: any) {
        const message = err.response?.data?.message || "Failed to fetch product";
        alert("Error: " + message);
        throw new Error(message);
    }
};


export const handleOrderProduct = async (productId: string, quantity: number) => {
    try {
        await api.post("/order/order", {
            productId,
            quantity,
        });

        alert("Success purchase product!");
        window.location.reload();
    } catch (err: any) {
        const message = err.response?.data?.message || "Failed to order product";
        alert("Error: " + message);
        throw new Error(message);
    };
};

