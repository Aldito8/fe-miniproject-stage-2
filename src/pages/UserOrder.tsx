import { handleUserOrder } from "@/services/order";
import { useEffect, useState } from "react";
import {
    ShoppingCart,
    BadgeDollarSign,
    PackageCheck,
    CalendarClock,
    Hash,
} from "lucide-react"

interface Order {
    quantity: number;
    total: number;
    createdAt: string;
    product: {
        name: string;
        price: number;
    };
}

export function UserOrder() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await handleUserOrder();
                setOrders(result);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchOrders();
    }, []);

    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="w-full h-screen flex justify-center items-start py-20 bg-gray-50">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                    <ShoppingCart className="w-6 h-6 text-green-600" /> My Orders
                </h2>

                {orders.length === 0 ? (
                    <p className="text-gray-500">You have no orders yet.</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {orders.map((order, index) => (
                            <li
                                key={index}
                                className="border rounded-lg p-4 bg-white hover:shadow transition duration-200 space-y-2"
                            >
                                <p className="flex items-center gap-2 font-medium text-gray-800">
                                    <PackageCheck className="w-4 h-4 text-blue-600" />
                                    {order.product.name}
                                </p>
                                <p className="flex items-center gap-2 text-sm text-gray-700">
                                    <BadgeDollarSign className="w-4 h-4 text-emerald-500" />
                                    Price: Rp {order.product.price.toLocaleString()}
                                </p>
                                <p className="flex items-center gap-2 text-sm text-gray-700">
                                    <Hash className="w-4 h-4 text-indigo-500" />
                                    Quantity: {order.quantity}
                                </p>
                                <p className="flex items-center gap-2 text-sm text-gray-700">
                                    <BadgeDollarSign className="w-4 h-4 text-red-500" />
                                    Total: Rp {order.total.toLocaleString()}
                                </p>
                                <p className="flex items-center gap-2 text-xs text-gray-500">
                                    <CalendarClock className="w-4 h-4" />
                                    {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
