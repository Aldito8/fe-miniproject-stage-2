import { useNavigate } from "react-router-dom";
import { userLogin } from "@/services/auth";
import { useAuth } from "./useAuth";

export function useLogin() {
    const navigate = useNavigate();
    const { setRole } = useAuth();
    const { setId } = useAuth();

    const handleLogin = async (
        e: React.FormEvent,
        email: string,
        password: string
    ) => {
        e.preventDefault();
        try {
            const res = await userLogin(email, password);
            console.log(res)
            setRole(res.data.role);
            setId(res.data.id)
            navigate("/products");
        } catch (err: any) {
            throw new Error("Login gagal: " + (err.response?.data?.message || err.message));
        }
    };

    return { handleLogin };
}
