import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import HomePage from "../pages/HomePage";
import DogProductsPage from "../pages/DogProductsPage";
import CatProductsPage from "../pages/CatProductsPage";
import OtherAnimalProductsPage from "../pages/OtherAnimalsPage";
import AboutUsPage from '../pages/AboutUsPage'
import SingleProductPage from "../pages/SingleProductPage";
import ContactsPage from "../pages/ContactsPage";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/aboutUs" element={<AboutUsPage />} />
            <Route path="/DogProducts" element={<DogProductsPage />} />
            <Route path="/CatProducts" element={<CatProductsPage />} />
            <Route
              path="/OtherAnimalProducts"
              element={<OtherAnimalProductsPage />}
            />
            <Route path="/SingleProductPage" element={<SingleProductPage />} />
            <Route path="/Contacts" element={<ContactsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
