import { api } from "./api";

export const handleUserOrder = async () => {
    try {
        const res = await api.get("/order/myorder");
        return res.data.result;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "failed fetch data");
    }
};

export const handleGetAllUserOrders = async () => {
    try {
        const res = await api.get("/order/order");
        return res.data.result;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "failed fetch data");
    }
};