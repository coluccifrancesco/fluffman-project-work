import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";

export default function DefaultLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Header />
      {loading ? <Loading /> : <Outlet />}
      <Footer />
    </>
  );
}
