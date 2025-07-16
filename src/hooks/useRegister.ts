import { useNavigate } from "react-router-dom";
import { userRegister } from "@/services/auth";

export function useRegister() {
    const navigate = useNavigate();

    const handleRegister = async (
        e: React.FormEvent,
        name: string,
        email: string,
        password: string,
        avatar: File | null
    ) => {
        e.preventDefault();
        try {
            await userRegister(name, email, password, avatar);
            alert("Success create account");
            navigate("/login");
        } catch (err: any) {
            throw new Error("failed create account " + (err.response?.data?.message || err.message));
        }
    };

    return { handleRegister };
}
