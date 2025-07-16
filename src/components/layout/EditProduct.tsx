import {
    Dialog, DialogTrigger, DialogContent, DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { handleEditProduct } from "@/services/adminProduct";
import { DialogDescription } from "@radix-ui/react-dialog";

export function EditDialog({ product }: { product: any }) {
    const [nameProduct, setNameProduct] = useState(product.name);
    const [stockProduct, setStockProduct] = useState(product.stock);
    const [priceProduct, setPriceProdcut] = useState(product.price);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);

        setTimeout(async () => {
            try {
                await handleEditProduct(
                    product.id,
                    nameProduct,
                    imageFile,
                    priceProduct,
                    stockProduct
                );
            } catch (error) {
                alert("failed update product " + error);
            } finally {
                setLoading(false);
            }
        }, 2000);
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <DialogDescription>{product.name}</DialogDescription>

                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    value={nameProduct}
                    onChange={(e) => setNameProduct(e.target.value)}
                />

                <Label htmlFor="stock">Stock</Label>
                <Input
                    type="number"
                    id="stock"
                    name="stock"
                    value={stockProduct}
                    onChange={(e) => setStockProduct(Number(e.target.value))}
                />

                <Label htmlFor="price">Price</Label>
                <Input
                    type="number"
                    id="price"
                    name="price"
                    value={priceProduct}
                    onChange={(e) => setPriceProdcut(Number(e.target.value))}
                />

                <Label>Product Image</Label>
                {product.image && typeof product.image === "string" && (
                    <img
                        src={`http://localhost:3000/uploads/${product.image}`}
                        alt="Current"
                        className="h-24 object-cover mb-2 rounded"
                    />
                )}
                <Input
                    name="productimage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setImageFile(file);
                    }}
                />

                <Button onClick={handleSubmit} disabled={loading} className="mt-4">
                    {loading ? "Updating..." : "Submit"}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
