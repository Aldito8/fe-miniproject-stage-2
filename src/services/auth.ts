import { api } from "./api";

export async function userLogin(email: string, password: string) {
    return api.post(`/auth/login`, {
        email,
        password,
    }, { withCredentials: true });
}

export async function userRegister(
    name: string,
    email: string,
    password: string,
    avatar: File | null
) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    if (avatar) {
        formData.append("avatar", avatar);
    }

    return api.post("/auth/register", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}


export async function userLogout() {
    return api.post("/auth/logout", {}, { withCredentials: true });
};