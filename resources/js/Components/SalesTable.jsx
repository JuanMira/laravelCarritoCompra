const SalesTable = ({ sales }) => {
    return (
        <div className="overflow-x-auto bg-gray-800 p-6 rounded-lg shadow-md">
            <table className="min-w-full table-auto text-sm text-white">
                <thead className="bg-gray-900">
                    <tr>
                        <th className="px-6 py-3 text-left font-medium">
                            Venta ID
                        </th>
                        <th className="px-6 py-3 text-left font-medium">
                            Fecha
                        </th>
                        <th className="px-6 py-3 text-left font-medium">
                            Total
                        </th>
                        <th className="px-6 py-3 text-left font-medium">
                            Productos
                        </th>              
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.id} className="border-b border-gray-700">
                            <td className="px-6 py-4">{sale.id}</td>
                            <td className="px-6 py-4">
                                {new Date(sale.sale_date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                ${sale.total.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                                <ul>
                                    {sale.products.map((product, index) => (
                                        <li key={index}>
                                            {product.name} - {product.pivot.quantity}{" "}
                                            x ${product.pivot.price_at_sale}
                                        </li>
                                    ))}
                                </ul>
                            </td>                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;
