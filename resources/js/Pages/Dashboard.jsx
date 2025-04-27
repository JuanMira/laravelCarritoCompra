import Shopping from "@/Components/Shopping";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"></h2>
            }
        >
            <Shopping auth={auth} />
        </AuthenticatedLayout>
    );
}
