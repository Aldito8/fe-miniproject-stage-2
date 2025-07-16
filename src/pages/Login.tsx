import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useLogin";
import { useState } from "react";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleLogin } = useLogin();

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 w-full">
            <div className="w-64">
                <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                    Login
                </h2>
                <form onSubmit={(e) => handleLogin(e, email, password)} className="space-y-3">

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

                    <Button type="submit" className="w-full">Login</Button>
                </form>
            </div>

        </div>
    );
};