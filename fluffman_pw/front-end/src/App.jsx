import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WishlistProvider } from "../context/WishlistContext";
import { CartProvider } from "../context/CartContext";
import DefaultLayout from "../layouts/DefaultLayout";
import HomePage from "../pages/HomePage";
import DogProductsPage from "../pages/DogProductsPage";
import CatProductsPage from "../pages/CatProductsPage";
import OtherAnimalProductsPage from "../pages/OtherAnimalsPage";
import AboutUsPage from "../pages/AboutUsPage";
import SingleProductPage from "../pages/SingleProductPage";
import ContactsPage from "../pages/ContactsPage";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import WishlistPage from "../pages/WishlistPage";
import CartPage from "../pages/CartPage";
import ProductsPage from "../pages/ProductsPage";
import CheckOutPage from "../pages/CheckOutPage";
import ErrorPage from '../pages/ErrorPage';

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/aboutUs" element={<AboutUsPage />} />
              <Route path="/dogproducts" element={<DogProductsPage />} />
              <Route path="/catproducts" element={<CatProductsPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/404" element={<ErrorPage />} />
              <Route path="/checkout" element={<CheckOutPage />} />
              <Route
                path="/otheranimalproducts"
                element={<OtherAnimalProductsPage />}
              />
              <Route path="/products/:slug" element={<SingleProductPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/cart" element={<CartPage />} />
              {/* Catch-all per 404 */}
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;