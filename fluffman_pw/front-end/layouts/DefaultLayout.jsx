import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";

export default function DefaultLayout() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 500);
    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => setLoading(false), 1000);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      {loading && !isMobile ? <Loading /> : <Outlet />}
      <Footer />
    </>
  );
}
