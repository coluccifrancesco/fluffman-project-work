import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import HomePage from "../pages/HomePage";
import DogProducts from "../components/DogProducts";
import CatProducts from "../components/CatProducts";
import OtherAnimalProducts from "../components/OtherAnimalProducts";



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/DogProducts" element={<DogProducts />} />
            <Route path="/CatProducts" element={<CatProducts />} />
            <Route path="/OtherAnimalProducts" element={<OtherAnimalProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
