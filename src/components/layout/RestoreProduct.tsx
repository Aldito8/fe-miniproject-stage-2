import {
    Dialog, DialogTrigger, DialogContent, DialogHeader,
    DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { handleRestoreDeleteProduct } from "@/services/adminProduct";

export function RestoreDialog({ product }: { product: any }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Restore</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Restore Product?</DialogTitle>
                    <DialogDescription>
                        Are you sure to restore this product <span className="font-bold">{product.name}</span>?
                    </DialogDescription>
                </DialogHeader>
                <Button
                    variant="destructive"
                    className="mt-4 w-full"
                    onClick={() => handleRestoreDeleteProduct(product.id)}>
                    Yes, Restore Product
                </Button>
            </DialogContent>
        </Dialog>
    );
}
