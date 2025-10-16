import { StyleSheet, Text, View } from 'react-native'
import { createContext, useState } from "react";


// Creamos el contexto
export const CartContext = createContext();

// Creamos el proveedor
export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const AnadirProductoAlCarrito = (producto) => {
        const productoExistente = carrito.find((prod) => prod.id === producto.id);

        if (productoExistente) {
        // Si ya existe, actualizamos la cantidad
            const carritoActualizado = carrito.map((prod) =>
            prod.id === productoExistente.id
                ? { ...prod, cantidad: prod.cantidad + producto.cantidad }
                : prod
            );
            setCarrito(carritoActualizado);
        } else {
        // Si no existe, lo agregamos al carrito
            setCarrito([...carrito, producto]);
        }
    };

    const cantidadTotal = () => {
        return carrito.reduce((total, producto) => total + producto.cantidad, 0);
    };

    const precioTotal = () => {
    return carrito.reduce(
            (total, producto) => total + producto.precio * producto.cantidad,
        );
    };

    const borrarProductoCarritoPorId = (id) => {
        setCarrito(carrito.filter((producto) => producto.id !== id));
    };

    const borrarProductosCarrito = () => {
        setCarrito([]);
    };

    return (
        <CartContext.Provider
        value={{
            carrito,
            AnadirProductoAlCarrito,
            cantidadTotal,
            precioTotal,
            borrarProductoCarritoPorId,
            borrarProductosCarrito,
        }}
    >
        {children}
    </CartContext.Provider>
    );
};
