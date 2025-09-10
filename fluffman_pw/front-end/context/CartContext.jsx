import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cartlist")) || [];
    });

    useEffect(() => {
        localStorage.setItem("cartlist", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (id, quantity = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === id);
            if (existing) {
                return prev.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                return [...prev, { id, quantity }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCart(prev => prev.map(item =>
            item.id === id ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
