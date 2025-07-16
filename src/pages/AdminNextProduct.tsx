import { DeletePermanentDialog } from "@/components/layout/PermanentDeleteProduct";
import { RestoreDialog } from "@/components/layout/RestoreProduct";
import { handleAdminDeleteProduct } from "@/services/adminProduct";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";

export function AdminNextProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await handleAdminDeleteProduct();
                setProducts(result);
            } catch (err: any) {
                setError(err.message);
            }
        };
        fetchProducts();
    }, []);
    return (
        <div className="flex flex-col justify-center items-center w-screen my-20">
            {error && <p>{error}</p>}
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                Manage Product
            </h2>
            {products.length == 0 && <h1>No Deleted Product</h1>}

            {products.length > 0 && <div className="px-4 md:px-12 lg:px-24 w-full">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="p-3 border font-semibold">Name</th>
                            <th className="p-3 border font-semibold">Price</th>
                            <th className="p-3 border font-semibold">Stock</th>
                            <th className="p-3 border font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{product.name}</td>
                                <td className="p-3 border">Rp {product.price.toLocaleString()}</td>
                                <td className="p-3 border">{product.stock}</td>
                                <td className="p-3 border space-x-2">
                                    <RestoreDialog product={product} />
                                    <DeletePermanentDialog product={product} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}


        </div>
    )
}