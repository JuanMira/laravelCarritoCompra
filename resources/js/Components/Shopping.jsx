import CartButton from "./CartButton";
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import ProductModal from "./ModalProduct";

const Shopping = ({ auth }) => {
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
        setCart((prevItems) => {
            // Buscar si el producto ya existe en el carrito
            const existingItem = prevItems.find(
                (item) => item.product.id === product.id
            );

            if (existingItem) {
                // Si el producto ya está en el carrito, actualizamos la cantidad
                return prevItems.map((item) =>
                    item.product.id === product.id
                        ? {
                              ...item,
                              quantity: Math.min(
                                  item.quantity + quantity,
                                  item.product.stock
                              ), // No exceder el stock
                          }
                        : item
                );
            } else {
                // Si el producto no está en el carrito, lo agregamos con la cantidad indicada
                return [
                    ...prevItems,
                    {
                        product: {
                            id: product.id,
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            stock: product.stock,
                        },
                        quantity,
                    },
                ];
            }
        });

        console.log(cart);
    };

    const handleDeleteItems = (id) => {
        setCart((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleShopItems = async () => {
        const req = await axios.post("/sales", { products: cart });
        const res = req.data;
        console.log(res);
        if (res) {
            setCart([]);
            request();
        } else alert("Ha habido un error");
    };

    return (
        <>
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col selection:bg-[#FF2D20] selection:text-white">
                    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
                        <div className="w-full px-6">
                            <main className="mt-6 flex items-start space-x-6">
                                {/* Panel izquierdo (carrito) */}
                                <div className="w-1/3 bg-gray-800 text-white rounded-2xl p-6 shadow-md h-full">
                                    <CartButton
                                        cartCount={cart.length}
                                        items={cart}
                                        handleShopItems={handleShopItems}
                                        handleDeleteItems={handleDeleteItems}
                                    />
                                </div>

                                {/* Grid de productos (derecha) */}
                                <div className="w-2/3 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <div
                                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg transition-shadow p-5 flex flex-col hover:cursor-pointer hover:bg-gray-800"
                                            key={product.id}
                                            onClick={() => openModal(product)}
                                        >
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                                {product.name}
                                            </h3>

                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">
                                                {product.description}
                                            </p>
                                            <div className="mt-auto">
                                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                    Precio: $ {product.price}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Stock: {product.stock}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de producto */}
            <ProductModal
                auth={true} // Cambiar a `auth` verdadero o falso según si el usuario está autenticado
                isOpen={isOpen}
                product={selectedProduct}
                onClose={closeModal}
                onAddToCart={addToCart}
            />
        </>
    );
};

export default Shopping;
