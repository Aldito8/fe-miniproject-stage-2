import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleAddProduct } from "@/services/adminProduct";
import { useState } from "react";

export function AdminAddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState<File | null>(null);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 min-w-screen">
            <div className="w-64">
                <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                    Add new Product
                </h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleAddProduct(name, price, stock, image);
                }} className="space-y-3">
                    <div className="flex flex-col gap-3">

                        <Label htmlFor="name">name product</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required />
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label htmlFor="price">price</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="price"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            required />
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label htmlFor="stock">stock</Label>
                        <Input
                            id="stock"
                            name="stock"
                            type="number"
                            placeholder="stock"
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            required />
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label htmlFor="avatar">product image</Label>
                        <Input
                            id="avatar"
                            name="avatar"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files?.[0] || null)}
                        />
                    </div>


                    <Button type="submit" className="w-full">Add Product</Button>
                </form>
            </div>
        </div>
    );
};