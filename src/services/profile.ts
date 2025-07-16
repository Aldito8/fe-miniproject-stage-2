import { api } from "./api";

export const handleUserProfile = async () => {
    try {
        const res = await api.get("/user/profile");
        return res.data.result;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "failed fetch data");
    }
};

export const handleChangeProfilePic = async (
    pic: File | null) => {
    try {
        const formData = new FormData();

        if (pic) {
            formData.append("avatar", pic);
        }

        await api.patch(`/user/user/profile-picture`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        window.location.reload();
        alert("Success update profile picture");
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "failed fetch data");
    }
};