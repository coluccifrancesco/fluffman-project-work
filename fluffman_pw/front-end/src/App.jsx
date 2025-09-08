import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import CheckOutPage from "../pages/CheckOutPage";
import ErrorPage from '../pages/ErrorPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/AboutUs" element={<AboutUsPage />} />
            <Route path="/DogProducts" element={<DogProductsPage />} />
            <Route path="/CatProducts" element={<CatProductsPage />} />
            <Route path="/Wishlist" element={<WishlistPage />} />
            <Route path="/404" element={< ErrorPage />} />
            <Route
              path="/OtherAnimalProducts"
              element={<OtherAnimalProductsPage />}
            />
            <Route path="/SingleProductPage/:slug" element={<SingleProductPage />} />
            <Route path="/Contacts" element={<ContactsPage />} />
            <Route path="checkout" element={<CheckOutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
