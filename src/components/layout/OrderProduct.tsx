import {
    Dialog, DialogTrigger, DialogContent, DialogHeader,
    DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { handleOrderProduct } from "@/services/product";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function OrderDialog({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(0)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="bg-white hover:bg-green-500 text-green w-full border border-green duration-500"
                >
                    Buy
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center uppercase">{product.name}</DialogTitle>
                    <DialogDescription asChild>
                        <div className="flex flex-col space-y-4">
                            <img src={`http://localhost:3000/uploads/${product.image}`} alt="" />
                            <p>stock: {product.stock}</p>
                            <p>Price: Rp {product.price}</p>
                            <div className="w-auto flex gap-4">
                                <Label htmlFor="quantity">quantity</Label>
                                <Input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    placeholder="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    required />
                            </div>
                        </div>

                    </DialogDescription>
                </DialogHeader>
                <Button
                    variant="destructive"
                    className="mt-5 bg-green-400 hover:bg-green-500 text-green w-full border border-green duration-500"
                    onClick={() => handleOrderProduct(product.id, quantity)}>
                    Buy
                </Button>
            </DialogContent>
        </Dialog>
    );
}
