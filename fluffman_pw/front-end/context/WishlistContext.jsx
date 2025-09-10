import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        return JSON.parse(localStorage.getItem("wishlist")) || [];
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (id) => {
        if (!wishlist.some(item => item.id === id)) {
            setWishlist([...wishlist, { id }]);
        }
    };

    const removeFromWishlist = (id) => {
        setWishlist(wishlist.filter(item => item.id !== id));
    };

    const toggleWishlist = (id) => {
        if (wishlist.some(item => item.id === id)) {
            removeFromWishlist(id);
        } else {
            addToWishlist(id);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}
