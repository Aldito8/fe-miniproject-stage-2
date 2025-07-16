import { useEffect, useState } from "react";
import { api } from "@/services/api";
import type { Role } from "@/types/auth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [id, setId] = useState(0)
    const [role, setRole] = useState<Role>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get("/auth/me", { withCredentials: true })
            .then((res) => {
                setId(res.data.user.id);
                setRole(res.data.user.role);
            })
            .catch(() => { setRole(null); setId(0) })
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ id, setId, role, setRole, loading }}>
            {children}
        </AuthContext.Provider>
    );
}