import React from "react";
import NavBar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const MainContainer = ({ children  }) => {
  const dataObject = localStorage.getItem('data');
  const data = JSON.parse(dataObject);

  console.log("data2" , data)

  // const { nom } = useParams();
  // const [theme, settheme] = useState({
  //   navbar_color: "white",
  //   footer_color: "white",
  //   background_color: "white",
  // });
  // const [boutiqueData, setBoutiqueData] = useState({});
  // const [contact, setContact] = useState({});
  // const getData = async () => {
  //   try {
  //     // const id = "663c9fd795379d04ef8b5626";
  //     const response = await axios.get(
  //       "http://localhost:3000/api/boutique/" + nom
  //     );
  //     setBoutiqueData(response.data);
  //     setContact(response.data.contact);
  //     console.log("response from server :");
  //     console.log(response.data);
  //     console.log(typeof response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   try {
  //     // const id = "663c8d7b2eaacd9b6056006a";
  //     const response = await axios.get(
  //       "http://localhost:3000/api/theme/" + boutiqueData.id_theme
  //     );
  //     // settheme(response.data);
  //     settheme(response.data);
  //     console.log("response from server :");
  //     console.log(response.data);
  //     console.log(typeof response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // getData();
  // useEffect(() => {
  //   getData();
  // });
  return (
    <div>
      <NavBar
        navbarColor={data.id_theme.navbar_color}
        nomBoutique={data.Nom_boutique}
        logo={"http://localhost:2000/logo/" + data.logo_url}
        nom={data.Nom_boutique}
      />
      <div style={{ backgroundColor: data.id_theme.background_color }}>{children}</div>
      <Footer
        nom={data.Nom_boutique}
        footerColor={data.id_theme.footer_color}
        img={"http://localhost:2000/logo/" + data.logo_url}
        nomBoutique={data.Nom_boutique}
        email={data.email}
        location={data.location}
        phone={data.phone}
      />
    </div>
  );
};

export default MainContainer;
