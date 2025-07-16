import { useNavigate } from "react-router-dom";
import { userLogout } from "@/services/auth";
import { useAuth } from "./useAuth";

export function useLogout() {
    const navigate = useNavigate();
    const { setRole } = useAuth();
    const { setId } = useAuth();

    return async function logout() {
        try {
            await userLogout();
            setRole(null);
            setId(0);
            navigate("/login");
        } catch (err: any) {
            throw new Error("Logout gagal: " + (err.response?.data?.message || err.message));
        }
    };
}
