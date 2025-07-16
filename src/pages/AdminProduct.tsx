import { handleAdminProduct } from "@/services/adminProduct";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { EditDialog } from "@/components/layout/EditProduct";
import { DeleteDialog } from "@/components/layout/DeleteProduct";
import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";

export function AdminProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await handleAdminProduct();
                setProducts(result);
            } catch (err: any) {
                setError(err.message);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center w-full my-20">
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                My Product
            </h2>
            <div className="flex w-full justify-end mr-100 mb-10 space-x-4">
                <Link to={"/add-product"}>
                    <Button className="bg-green-600">+ Add Product</Button>
                </Link>
                <Link to={"/restore-product"}>
                    <Button className="bg-blue-600">Restore Product</Button>
                </Link>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="px-4 md:px-12 lg:px-24 w-full">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="p-3 border font-semibold">ID</th>
                            <th className="p-3 border font-semibold">Name</th>
                            <th className="p-3 border font-semibold">Price</th>
                            <th className="p-3 border font-semibold">Stock</th>
                            <th className="p-3 border font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{product.id}</td>
                                <td className="p-3 border">{product.name}</td>
                                <td className="p-3 border">Rp {product.price.toLocaleString()}</td>
                                <td className="p-3 border">{product.stock}</td>
                                <td className="p-3 border space-x-2">
                                    <EditDialog product={product} />
                                    <DeleteDialog product={product} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
}
