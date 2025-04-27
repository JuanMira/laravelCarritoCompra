import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";

const Productos = () => {
    const [products, setProducts] = useState([]);

    const request = async () => {
        const req = await axios.get("/products");
        const data = req.data;

        setProducts(data);
    };

    useEffect(() => {
        request();
    }, []);

    const handleDelete = (id, name) => {
        const conf = confirm(`Desea eliminar el producto: ${name}`);

        if (conf) {
            axios.delete(`/products/${id}`);
            request();
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Productos
                </h2>
            }
        >
            <Head title="Productos" />
            <div className="min-h-screen bg-gray-900 p-8">
                <div className="max-w-7xl mx-auto bg-gray-800 shadow-lg rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-100"> </h1>
                        <a
                            className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-xl transition-all"
                            href={route("crear-productos")}
                        >
                            Crear Producto
                        </a>
                    </div>

                    <div className="overflow-x-auto rounded-lg shadow-sm">
                        <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
                            <thead className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
                                <tr>
                                    <th className="py-3 px-6 text-left">ID</th>
                                    <th className="py-3 px-6 text-left">
                                        Nombre
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Descripcion
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Precio
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Stock
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Nombre de proveedor
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Telefono de proveedor
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Direccion de proveedor
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-400 text-sm font-light">
                                {products.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="border-b border-gray-700 "
                                    >
                                        <td className="py-3 px-6">
                                            {product.id}
                                        </td>
                                        <td className="py-3 px-6">
                                            {product.name}
                                        </td>
                                        <td className="py-3 px-6">
                                            {product.description}
                                        </td>
                                        <td className="py-3 px-6 whitespace-nowrap">
                                            $ {product.price}
                                        </td>
                                        <td className="py-3 px-6">
                                            {product.stock}
                                        </td>
                                        <td className="py-3 px-6">
                                            {product.provider_name}
                                        </td>
                                        <td className="py-3 px-6">
                                            {product.provider_phone}
                                        </td>
                                        <td className="py-3 px-6">
                                            {product.provider_address}
                                        </td>
                                        <td className="py-3 px-6">
                                            <a
                                                className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold py-2 mr-2 px-4 rounded-xl transition-all"
                                                href={`editar-productos?id=${product.id}`}
                                            >
                                                Editar
                                            </a>

                                            <a
                                                className="bg-red-500 hover:bg-red-700 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-xl transition-all"
                                                onClick={() =>
                                                    handleDelete(
                                                        product.id,
                                                        product.name
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Productos;
