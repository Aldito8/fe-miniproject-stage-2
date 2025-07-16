import { handleUserProfile } from "@/services/profile";
import { useEffect, useState } from "react";
import { ProfilePicDialog } from '../components/layout/ChangeProfilePic';

interface Profile {
    id: number,
    name: string,
    email: string,
    points: number,
    avatar: string
}

export function Profile() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [error, setError] = useState()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await handleUserProfile();
                setProfile(result);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="mt-20 flex justify-center items-center px-4">

            <div className="bg-white shadow-md p-6 rounded-lg max-w-sm w-full text-center space-y-4">
                <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                    Profile
                </h2>
                {error && <p className="text-red-500">{error}</p>}

                <div className="flex justify-center">
                    <img
                        src={`http://localhost:3000/uploads/${profile?.avatar}`}
                        alt="Profile Picture"
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow"
                    />
                </div>

                <ProfilePicDialog avatar={profile?.avatar} />

                <div className="space-y-1 text-gray-700">
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="font-semibold">{profile?.id}</p>

                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-semibold">{profile?.name}</p>

                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">{profile?.email}</p>

                    <p className="text-sm text-gray-500">Points</p>
                    <p className="font-semibold text-green-600">{profile?.points}</p>
                </div>
            </div>
        </div>

    )
}