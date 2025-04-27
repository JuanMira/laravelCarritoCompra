import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";

const ProductModal = ({ auth, isOpen, product, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (isOpen) {
            setQuantity(1);
        }
    }, [isOpen]);

    const handleAddToCart = () => {
        if (quantity > 0) {
            onAddToCart(product, quantity);
        }

        onClose();
    };

    if (!product) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                aria-hidden="true"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-md rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg space-y-4">
                    <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white">
                        {product.name}
                    </Dialog.Title>
                    <Dialog.Description className="text-gray-600 dark:text-gray-400">
                        {product.description || "Sin descripción"}
                    </Dialog.Description>

                    <div className="flex items-center gap-4 mt-4">
                        <label
                            className="text-gray-700 dark:text-gray-300"
                            htmlFor="quantity"
                        >
                            Cantidad:
                        </label>
                        <input
                            id="quantity"
                            type="number"
                            min="1"
                            max={product.stock}
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(parseInt(e.target.value) || 1)
                            }
                            className="w-20 px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        />
                    </div>

                    <p className="text-gray-700 dark:text-gray-300">
                        Stock disponible: {product.stock}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        Proveedor: {product.provider_name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        Teléfono: {product.provider_phone || "N/A"}
                    </p>

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition"
                        >
                            Cancelar
                        </button>

                        {auth ? (
                            <button
                                onClick={handleAddToCart}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                            >
                                Agregar al carrito
                            </button>
                        ) : (
                            <a
                                href="login"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                            >
                                Ir al login
                            </a>
                        )}
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ProductModal;
