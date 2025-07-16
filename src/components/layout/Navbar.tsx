import { Link } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useLogout } from "@/hooks/useLogout";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, UserCircle } from "lucide-react";

export function NavBar() {
    const { role } = useAuth();
    const logout = useLogout();
    const isLogin = role !== null;

    return (
        <NavigationMenu className="fixed top-0 left-0 right-0 max-w-full bg-white shadow z-50 py-2 flex justify-around">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link to="/">Icon</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>

            <NavigationMenuList className="space-x-10">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link to="/products">Product</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {role === "ADMIN" && (
                    <>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/admin-product">My Product</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/all-order">User Orders</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </>
                )}

                {!isLogin && (
                    <>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/login">Login</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/register">Register</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </>
                )}

                {isLogin && (
                    <>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/transaction">Transfer Points</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/myorder">My Order</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to={"/myprofile"}>
                                    <UserCircle color="green" size={40} />
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <button onClick={logout} className="text-red-500">
                                    <LogOut color="red" size={60} />
                                </button>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                    </>
                )}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
