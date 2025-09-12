import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation(); //adds location for component based on CURRENT path

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); //scrolls back to top of page, without reloading page
  }, [pathname]); //executes the function for each path change

  // se vogliamo la ricarica della pagina dobbiamo togliere Link o usare preventDefault

  return null; //non renderizza NON TOCCARE
}
