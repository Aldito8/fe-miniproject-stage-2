import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/useRegister";
import { useState } from "react";

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState<File | null>(null);
    const [password, setPassword] = useState('');
    const { handleRegister } = useRegister();

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 w-full">
            <div className="w-64"><h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                Register
            </h2>
                <form onSubmit={(e) => handleRegister(e, name, email, password, avatar)} className="space-y-3">
                    <div className="flex flex-col gap-3">

                        <Label htmlFor="name">name</Label>
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
                        <Label htmlFor="email">email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label htmlFor="password">password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label htmlFor="avatar">profile (opsional)</Label>
                        <Input
                            id="avatar"
                            name="avatar"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setAvatar(e.target.files?.[0] || null)}
                        />
                    </div>


                    <Button type="submit" className="w-full">Register</Button>
                </form>
            </div>
        </div>
    );
};