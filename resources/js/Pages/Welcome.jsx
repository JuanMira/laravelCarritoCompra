import NavLink from "@/Components/NavLink";
import { Head, Link } from "@inertiajs/react";
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import Shopping from "@/Components/Shopping";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState([]);

    const request = async () => {
        const req = await axios.get("/products");
        const data = req.data;

        setProducts(data);
    };

    useEffect(() => {
        request();
    }, []);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const addToCart = (product, quantity) => {
        setCart((prev) => [
            ...prev,
            {
                product,
                quantity,
            },
        ]);
        console.log(cart);
        closeModal();
    };

    return (
        <>
            <Head title="Lista de compras" />
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center justify-end"></div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    {auth.user ? (
                                        <Link
                                            href={route("dashboard")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route("login")}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route("register")}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Shopping />
        </>
    );
}
