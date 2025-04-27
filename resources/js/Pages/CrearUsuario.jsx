import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import axios from "../utils/axios";

const CrearUsuario = () => {
    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onChange = (e) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (!userForm.name) {
            alert("El usuario es obligatorio")
            return;
        }

        if(!userForm.password){
            alert("La contraseña es obligatoria")
            return;
        }

        if(!userForm.email){
            alert("El correo es obligatorio")
            return;
        }
        
        const req = await axios.post("/users", userForm);
        const data = req.data;

        if(!data){
            alert("error al crear al usuario");
            return;
        }        

        router.visit("usuarios", {method:"get"});
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Usuarios
                </h2>
            }
        >
            <Head title="crear usuario"></Head>
            <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md mt-10">
                <h2 className="text-2xl text-gray-400 font-bold text-center mb-4">
                    Registro de Usuario
                </h2>

                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-sm font-semibold text-gray-300"
                    >
                        Nombre de Usuario
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={userForm.name}
                        onChange={(e) => onChange(e)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-300"
                    >
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={userForm.email}
                        onChange={(e) => onChange(e)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-300"
                    >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={userForm.password}
                        onChange={(e) => onChange(e)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Crear Cuenta
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CrearUsuario;
