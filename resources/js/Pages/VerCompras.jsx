import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import SalesTable from "@/Components/SalesTable";

const VerCompras = () => {
    const [mySales, setMySales] = useState([]);

    const request = async () => {
        const req = await axios.get("/sales");
        const data = req.data;

        console.log(data);
        setMySales(data.sales);
    };

    useEffect(() => {
        request();
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Mis Compras
                </h2>
            }
        >
            <Head title="Mis Compras" />
            <div className="p-4">
                <SalesTable sales={mySales} />
            </div>
        </AuthenticatedLayout>
    );
};

export default VerCompras;
