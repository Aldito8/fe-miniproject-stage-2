import {
    Dialog, DialogTrigger, DialogContent, DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { handleChangeProfilePic } from "@/services/profile";
import { DialogDescription } from '@radix-ui/react-dialog';

export function ProfilePicDialog({ avatar }: { avatar: any }) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);

        setTimeout(async () => {
            try {
                await handleChangeProfilePic(
                    imageFile,
                );
            } catch (error) {
                alert("failed update profile picture" + error);
            } finally {
                setLoading(false);
            }
        }, 2000);
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profil Picture</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile Pic</DialogTitle>
                </DialogHeader>
                <DialogDescription>

                </DialogDescription>

                <Label>Profile Picture</Label>
                {avatar && typeof avatar === "string" && (
                    <img
                        src={`http://localhost:3000/uploads/${avatar}`}
                        alt="Current"
                        className="h-24 object-cover mb-2 rounded"
                    />
                )}
                <Input
                    name="avatar"
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
