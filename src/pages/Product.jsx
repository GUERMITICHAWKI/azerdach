import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from "axios";
import MainContainer from "../containers/MainContainer";
import { useLocation } from 'react-router-dom';

const Product = () => {
  const location = useLocation();
  const pro  = location.state;
  console.log(pro.productId)

  const [data , setdata] = useState()
  const [listBoutique, setListBoutique] = useState();
  const fetchProducts = async (id) => {
    try {
      console.log(id)
      const response = await axios.get(
        "http://localhost:2000/api/produit/"+pro.productId
      );
      console.log(response.data?.id_categorie?.Nom_categorie);
      setListBoutique(response.data);
      fetchProductsBycategory(response.data?.id_categorie?._id , id)

    } catch (error) {
      console.log(error);
    }
  };

  const [maydata , setmaydata] = useState([])
  const fetchProductsBycategory = async (id , boutique) => {
    try {
      console.log("id_category" , id)
      console.log("boutique" , boutique)
      const response = await axios.post("http://localhost:2000/api/all-produitcategory/"+boutique, {id_categorie : id});
      setmaydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(  () => {
    const getdata =  localStorage.getItem('data');
    const da = JSON.parse(getdata)
    setdata(JSON.parse(getdata))
    fetchProducts(da?._id);
  }, []);

  // const [selectedProduct, setSelectedProduct] = useState(
  //   listBoutique.filter((item) => parseInt(item._id) === parseInt(data?._id))[0]
  // );
  // const [relatedProducts, setRelatedProducts] = useState([]);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   setSelectedProduct(
  //     listBoutique.filter((item) => parseInt(item._id) === parseInt())[0]
  //   );
  //   setRelatedProducts(
  //     listBoutique.filter(
  //       (item) =>
  //         item.category === selectedProduct?.category &&
  //         item._id !== selectedProduct?._id
  //     )
  //   );
  // }, [selectedProduct]);

  useWindowScrollToTop();

  return (
      <MainContainer>
    <Fragment>
        <Banner title={listBoutique?.Nom_produit} />
        <ProductDetails selectedProduct={listBoutique} />
        {/* <ProductReviews selectedProduct={listBoutique} /> */}
        <section className="related-products">
          <Container>
            <h3>You might also like</h3>
          </Container>
          <ShopList productItems={maydata} />
        </section>
    </Fragment>
      </MainContainer>
  );
};

export default Product;
