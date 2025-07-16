import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { handleUserTransfer } from "@/services/transfer"
import { useState } from "react"

export function UserTransfer() {
    const [receiver, setReceiver] = useState(0)
    const [amount, setAmount] = useState(0)

    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                Transfer Points
            </h2>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleUserTransfer(receiver, amount)
                }}
                className="max-w-md w-full p-6 space-y-4 border rounded-md shadow bg-white"
            >
                <div className="space-y-2">
                    <Label htmlFor="receiver" className="text-sm font-medium text-gray-700">
                        Send Points To:
                    </Label>
                    <Input
                        id="receiver"
                        name="receiver"
                        type="text"
                        placeholder="Enter receiver ID"
                        value={receiver}
                        onChange={(e) => setReceiver(Number(e.target.value))}
                        required
                        className="focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                        Amount:
                    </Label>
                    <Input
                        id="amount"
                        name="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        required
                        className="focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-green-600 text-white hover:bg-green-700 transition-all duration-300"
                >
                    Transfer
                </Button>
            </form>

        </div>
    )
}