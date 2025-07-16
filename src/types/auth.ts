export interface TokenPayload {
    id: number;
    email: string;
    role: "ADMIN" | "USER";
    iat: number;
    exp: number;
}


export type Role = "ADMIN" | "USER" | null;
