import { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Buy = lazy(() => import("./pages/Buy"));


const Product = lazy(() => import("./pages/Product"));

function App() {
  // const getAllTypesabInc = async () => {
  //   try {
  //     await axios
  //       .get("http://localhost:3001/routeur/theme/")
  //       .then((response) => {
  //         settheme(response.data[0]);
  //         setNavbarColor(response.data[0].color);
  //         setFooterColor(response.data[0].color);
  //         setimg(response.data[0].logo);
  //         settheme(response.data[0].theme);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getAllTypesabInc();
  // }, []);

  const [navbarColor, setNavbarColor] = useState("red");
  const [footerColor, setFooterColor] = useState("blue");

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="black"
        />
        {/* <NavBar navbarColor={navbarColor} /> */}
        <Routes>

          <Route path="/:nom/" element={<Home />} />
          <Route path="/:nom/shop" element={<Shop />} />
          <Route path="/:nom/product" element={<Product />} />
          <Route path="/:nom/cart" element={<Cart />} />
          <Route path="/:nom/buy" element={<Buy />} />
        </Routes>
        {/* <Footer footerColor={footerColor} /> */}
      </Router>
    </Suspense>
  );
}

export default App;
