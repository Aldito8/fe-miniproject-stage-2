import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { role, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    if (!role) return <Navigate to="/login" />;
    return children;
}
