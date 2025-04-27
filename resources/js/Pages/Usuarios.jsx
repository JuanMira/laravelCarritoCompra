import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "../utils/axios";

const Usuarios = ({ auth }) => {
    const [users, setUsers] = useState([]);

    const request = async () => {
        const res = await axios.get("/users");
        const data = res.data;        
        setUsers(data);
    };

    useEffect(() => {
        

        request();
    }, []);

    const handleDelete = async (id, username) => {
        const res = confirm(`Desea eliminar el usuario : ${username}`);
        if(res) {
            axios.delete(`/users/${id}`)
            request();
        };
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Usuarios
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="min-h-screen bg-gray-900 p-8">
                <div className="max-w-7xl mx-auto bg-gray-800 shadow-lg rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-100"> </h1>
                        <a
                            className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-xl transition-all"
                            href={route("crear-usuarios")}
                        >
                            Crear Usuario
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
                                        Email
                                    </th>
                                    <th className="py-3 px-6 text-left">
                                        Fecha Creacion
                                    </th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-400 text-sm font-light">
                                {users.map((product) => (
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
                                            {product.email}
                                        </td>
                                        <td className="py-3 px-6">
                                            {product.created_at}
                                        </td>
                                        <td className="py-3 px-6">
                                            <a 
                                                className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold py-2 mr-2 px-4 rounded-xl transition-all"
                                                href={`editar-usuarios?id=${product.id}`}
                                            >
                                                Editar
                                            </a>

                                            <a 
                                                className="bg-red-500 hover:bg-red-700 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-xl transition-all"
                                                onClick={() => handleDelete(product.id, product.name)}
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

export default Usuarios;
