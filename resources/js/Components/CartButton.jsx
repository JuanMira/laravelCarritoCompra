const CartButton = ({ cartCount, handleShopItems, items, handleDeleteItems }) => {
    console.log(items);

    return (
        <>
            <div className="w-46 bg-gray-800 text-white px-4 py-6">
                <h2>Carrito: {cartCount}</h2>
                <div className="space-y-4 overflow-y-auto h-96">
                    {items.length === 0 ? (
                        <div className="text-center text-gray-500">
                            Tu carrito está vacío
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.product.id}
                                className="flex justify-between w-full items-center bg-gray-700 p-4 rounded-lg"
                            >
                                <div>
                                    <h3 className="text-sm font-semibold">
                                        {item.product.name}
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        x{item.quantity}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold">
                                        $
                                        {(item.product.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </span>
                                    <button
                                        onClick={() => handleDeleteItems(item.id)}
                                        className="bg-red-600 text-white p-2 rounded-md text-xs"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>      
                <button
                    className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-xl transition-all"
                    onClick={handleShopItems}
                >
                    Comprar
                </button>
            </div>
        </>
    );
};

export default CartButton;
