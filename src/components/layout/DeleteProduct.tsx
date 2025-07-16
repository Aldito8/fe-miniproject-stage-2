import {
    Dialog, DialogTrigger, DialogContent, DialogHeader,
    DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { handleSoftDeleteProduct } from "@/services/adminProduct";

export function DeleteDialog({ product }: { product: any }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Product?</DialogTitle>
                    <DialogDescription>
                        Are you sure to delete this product <span className="font-bold">{product.name}</span>?
                    </DialogDescription>
                </DialogHeader>
                <Button
                    variant="destructive"
                    className="mt-4 w-full"
                    onClick={() => handleSoftDeleteProduct(product.id)}>
                    Yes, Delete Product
                </Button>
            </DialogContent>
        </Dialog>
    );
}
