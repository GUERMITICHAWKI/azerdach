import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider"; // Ensure this path and export are correct
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import MainContainer from "../containers/MainContainer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { Carousel } from "@material-tailwind/react";


const Home = () => {
  const location = useLocation();
  const id_boutique = location.pathname ? location.pathname.slice(1) : '';

  const [boutique, setBoutique] = useState({
    _id: "",
    Description: "",
    id_theme: {
      navbar_color: "",
      footer_color: "",
      background_color: ""
    },
    Nom_boutique: "",
    logo_url: ""
  });

  const getBoutique = async () => {
    try {
      const response = await axios.get(`http://localhost:2000/api/boutiqueBynom/${id_boutique}`);
      setBoutique(response.data);
      console.log(response?.data);
      localStorage.setItem('data', JSON.stringify(response?.data));

      fetchProductsNew(response?.data?._id);
      fetchProductsBest(response?.data?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const [listBoutiqueNew, setListBoutiqueNew] = useState([]);

  const fetchProductsNew = async (id) => {
    try {
      const response = await axios.get(`http://localhost:2000/api/produitByBoutiqueNew/${id}`);
      setListBoutiqueNew(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [listBoutiqueBest, setListBoutiqueBest] = useState([]);

  const fetchProductsBest = async (id) => {
    try {
      const response = await axios.get(`http://localhost:2000/api/produitByBoutiqueBest/${id}`);
      setListBoutiqueBest(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getBoutique();
  }, [id_boutique]);

  useWindowScrollToTop();
  return (
    
    <MainContainer>
      <Fragment>
        {/* <SliderHome /> */}
        <Wrapper />
        {boutique ? (
          <>
            <Section
              title="New Arrivals"
              bgColor="white"
              productItems={listBoutiqueNew}
            />
            <Section
              title="Best Sales"
              bgColor="#f6f9fc"
              productItems={listBoutiqueBest}
            />
          </>
        ) : (
          <Alert variant="warning">No boutique found</Alert>
        )}
      </Fragment>
    </MainContainer>
  );
};

export default Home;
