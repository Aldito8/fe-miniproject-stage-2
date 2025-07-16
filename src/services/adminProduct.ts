
import type { Product } from "@/types/product";
import { api } from "./api";

export const handleAdminProduct = async (): Promise<Product[]> => {
    try {
        const res = await api.get("/products/myproducts");
        return res.data.result.product;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "failed to fetch admin products");
    };
};

export const handleAdminDeleteProduct = async (): Promise<Product[]> => {
    try {
        const res = await api.get("/products/delete/product");
        return res.data.result.product;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "failed to fetch admin products");
    };
};

export async function handleAddProduct(
    name: string,
    price: number,
    stock: number,
    image: File | null
) {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price.toString());
        formData.append("stock", stock.toString());

        if (image) {
            formData.append("image", image);
        }

        await api.post("/products/add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        alert("Success add new product!");
        window.location.reload();
    } catch (err: any) {
        const message = err.response?.data?.message || err.message || "unknown error";
        alert("Failed add product " + message);
        throw new Error(message);
    }
}

export const handleEditProduct = async (
    id: string,
    name: string,
    imageFile: File | null,
    price: number,
    stock: number
) => {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price.toString());
        formData.append("stock", stock.toString());

        if (imageFile) {
            formData.append("image", imageFile);
        }

        await api.put(`/products/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        window.location.reload();
        alert("Success update product");
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Failed to update product");
    };
};


export const handleSoftDeleteProduct = async (id: string) => {
    try {
        await api.patch(`/products/delete/${id}`);
        alert("Success delete product");
        window.location.reload();
    } catch (err: any) {
        const message = err?.response?.data?.message || err.message || "Unknown error";
        alert("Error: " + message);
        throw new Error(message);
    }
};

export const handleRestoreDeleteProduct = async (id: number) => {
    try {
        await api.patch(`/products/${id}/restore`);
        alert("Success restore product");
        window.location.reload();
    } catch (err: any) {
        const message = err?.response?.data?.message || err.message || "Unknown error";
        alert("Error: " + message);
        throw new Error(message);
    }
};

export const handleDeleteDeleteProduct = async (id: number) => {
    try {
        await api.delete(`/products/delete/delete/${id}`);
        alert("Success delete permanent product");
        window.location.reload();
    } catch (err: any) {
        const message = err?.response?.data?.message || err.message || "Unknown error";
        alert("Error: " + message);
        throw new Error(message);
    }
};

