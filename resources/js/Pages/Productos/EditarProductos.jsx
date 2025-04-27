import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import axios from "../../utils/axios";
import { useState } from "react";

const EditarProductos = () => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price:"",
        stock: "",
        provider_name: "",
        provider_phone: "",
        provider_address: "",
    });

    useState(() => {
        const request = async () => {
            const searchParams = new URLSearchParams(window.location.search);
            const req = await axios.get(`/products/${searchParams.get("id")}`);
            const data = req.data;
            setForm(data);
        }

        request();
    }, [])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const req = await axios.put(`/products/${searchParams.get("id")}`, form);
        const data = req.data;

        if(data) router.visit("productos");

    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Productos
                </h2>
            }
        >
            <Head title="Editar Producto" />
            <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md mt-10">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                    Editar Producto
                </h2>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2.5 bg-gray-40 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Descripción
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Stock
                    </label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        required
                        className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Proveedor
                    </label>
                    <input
                        type="text"
                        name="provider_name"
                        value={form.provider_name}
                        onChange={handleChange}
                        required
                        className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Teléfono Proveedor
                    </label>
                    <input
                        type="text"
                        name="provider_phone"
                        value={form.provider_phone}
                        onChange={handleChange}
                        className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Dirección Proveedor
                    </label>
                    <input
                        type="text"
                        name="provider_address"
                        value={form.provider_address}
                        onChange={handleChange}
                        required
                        className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                </div>

                <div className="mt-6">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditarProductos;
