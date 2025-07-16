import { handleGetAllUserOrders } from '@/services/order';
import { useEffect, useState } from 'react';
import {
    User,
    ListOrdered,
    Wallet,
    ShoppingCart,
} from "lucide-react"

interface Product {
    id: number,
    name: string,
    quantity: number,
}

interface AllOrder {
    user: {
        id: number,
        name: string
    };
    totalOrder: number,
    totalQuantity: number,
    totalSpent: number,
    products: Product[]
}

export function AllUserOrder() {
    const [userOrders, setUserOrders] = useState<AllOrder[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await handleGetAllUserOrders();
                setUserOrders(result);
            } catch (err: any) {
                setError(err.message);
            }
        };
        fetchProducts();
    }, []);

    if (error) return <p>Error: {error}</p>;

    return (
        <div className="my-20 px-4 md:px-12 lg:px-24">
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                User Orders Summary
            </h2>

            <div className="space-y-8">
                {userOrders.map((order) => (
                    <div
                        key={order.user.id}
                        className="border rounded-lg p-6 shadow-sm hover:shadow-md transition duration-200"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className='md:col-span-1'>
                                <div className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-800">
                                    <User className="w-5 h-5 text-gray-700" />
                                    {order.user.name}
                                </div>

                                <div className="text-sm text-gray-600 space-y-2">
                                    <p className="flex items-center gap-2">
                                        <ListOrdered className="w-4 h-4" />
                                        Total Orders:
                                        <span className="font-medium">{order.totalOrder}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <ShoppingCart className="w-4 h-4" />
                                        Total Quantity:
                                        <span className="font-medium">{order.totalQuantity}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <Wallet className="w-4 h-4" />
                                        Total Spent:
                                        <span className="font-medium">
                                            Rp {order.totalSpent.toLocaleString()}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="grid grid-cols-3 gap-10">
                                    {order.products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="border p-3 rounded bg-gray-50 text-sm text-gray-700"
                                        >
                                            <p className="font-medium flex items-center justify-center gap-1">
                                                <ShoppingCart className="w-4 h-4" />
                                                {product.name}
                                            </p>
                                            <p className="font-medium text-center gap-1">
                                                product id: {product.id}
                                            </p>
                                            <p>Quantity: {product.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
