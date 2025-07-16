import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { handleAllProducts } from "@/services/product";
import { OrderDialog } from "@/components/layout/OrderProduct";
import { useAuth } from "@/hooks/useAuth";

export function Product() {
    const { role } = useAuth();

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(999999999);
    const [stock, setStock] = useState(0);
    const [sortBy, setSortBy] = useState("name");
    const sortByOption = ["name", "createdAt", "price", "updatedAt"]
    const [orderBy, setOrderBy] = useState("");
    const orderByOption = ["asc", "desc"];
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await handleAllProducts({
                    sortBy,
                    order: orderBy || "asc",
                    minPrice,
                    maxPrice,
                    minStock: stock,
                    limit,
                    offset: (currentPage - 1) * limit,
                });

                setProducts(result.product);
                setTotalPages(Math.ceil(result.total / limit));
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchProducts();
    }, [sortBy, orderBy, minPrice, maxPrice, stock, currentPage]);


    return (
        <div className="flex flex-col justify-center items-center w-full my-20">
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                Product
            </h2>

            {error &&
                <p className="text-red-500">{error}</p>}

            <div className="flex px-50 w-full">
                <div className="p-2 mx-2 border w-1/4 self-start">
                    <form action="" className="flex flex-col items-start space-y-4">
                        <div className="m-0 flex space-x-4 justify-between w-full py-2 items-center">
                            <label htmlFor="sortby">sort by</label>
                            <select
                                id="sortby"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 text-sm appearance-none bg-white pr-8"
                            >

                                {sortByOption.map((sortBy) => (
                                    <option key={sortBy} value={sortBy}>
                                        {sortBy}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="m-0 flex space-x-4 justify-between w-full pt-2 pb-4 items-center">
                            <label htmlFor="orderby">order by</label>
                            <select
                                id="orderby"
                                value={orderBy}
                                onChange={(e) => setOrderBy(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 text-sm appearance-none bg-white pr-8"
                            >

                                {orderByOption.map((orderBy) => (
                                    <option key={orderBy} value={orderBy}>
                                        {orderBy}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <label htmlFor="minprice">min. price</label>
                        <input
                            id="minprice"
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(Number(e.target.value))}
                            placeholder="min. price"
                            className="border border-gray-300 rounded px-3 py-2 text-sm appearance-none bg-white pr-8" />

                        <label htmlFor="maxprice">max. price</label>
                        <input
                            id="maxprice"
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            placeholder="max. price"
                            className="border border-gray-300 rounded px-3 py-2 text-sm appearance-none bg-white pr-8" />

                        <label htmlFor="minstock">min. stock</label>
                        <input
                            id="minstock"
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            placeholder="min. stock"
                            className="border border-gray-300 rounded px-3 py-2 text-sm appearance-none bg-white pr-8" />
                    </form>
                </div>
                <div className="w-3/4">
                    <ul className="grid grid-cols-3 gap-4">
                        {products.map((product) => (
                            <li key={product.id}
                                className="group border p-4 rounded space-y-2 transform transition duration-500 hover:scale-105 shadow-sm hover:shadow-md">
                                <img
                                    src={`http://localhost:3000/uploads/${product.image}`}
                                    alt={product.name}
                                    className="mb-2 w-full h-32 object-cover rounded transform transition duration-500 group-hover:scale-110"
                                />
                                <p className="font-sans font-bold text-2xl">{product.name.toLocaleUpperCase()}</p>
                                <div className="text-start space-y-2">
                                    <p className="text-sm font-bold">Rp {product.price.toLocaleString()}</p>
                                    <p className="text-sm">Stock: {product.stock}</p>
                                </div>
                                {role && <OrderDialog product={product} />}
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-center items-center mt-6 space-x-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            className="px-4 py-2 border rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="px-4 py-2 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}
