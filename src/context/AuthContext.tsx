import type { Role } from "@/types/auth";
import { createContext } from "react";

interface AuthContextType {
    id: number;
    setId: (id: number) => void;
    role: Role;
    setRole: (role: Role) => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    id: 0,
    setId: () => { },
    role: null,
    setRole: () => { },
    loading: true,
});
