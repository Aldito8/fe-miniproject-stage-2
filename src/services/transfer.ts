import { api } from "./api";

export const handleUserTransfer = async (
    receiver: number,
    amount: number
) => {
    try {
        console.log(receiver, amount)

        await api.post(`/transfer/transfer`, {
            receiverId: receiver,
            amount
        });

        window.location.reload();
        alert(`Success transfer ${amount} points`);
    } catch (err: any) {
        const message = err.response?.data?.message || "Failed to transfer points";
        alert("Error: " + message);
        throw new Error(message);
    };
};