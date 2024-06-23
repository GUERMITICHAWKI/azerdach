import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState  , useEffect} from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import MainContainer from "../containers/MainContainer";
import axios from "axios";

const Shop = () => {

  
  const [data , setdata] = useState()
  const [listBoutique, setListBoutique] = useState([]);

  const fetchProducts = async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/produitByBoutique/"+id
      );
      console.log(response.data);
      setListBoutique(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [filterList, setFilterList] = useState(
    listBoutique.filter((item) => item.category === "sofa")
  );
  useWindowScrollToTop();

  useEffect(  () => {
    const getdata =  localStorage.getItem('data');
    const da = JSON.parse(getdata)
    setdata(JSON.parse(getdata))
    fetchProducts(da?._id);
  }, []);


  return (
    <MainContainer>
      <Fragment>
        <Banner title="product" />
        <section className="filter-bar">
          <Container className="filter-bar-contianer">
            <Row className="justify-content-center">
              <Col md={4}>
                <FilterSelect setFilterList={listBoutique} />
              </Col>
              <Col md={8}>
                <SearchBar setFilterList={listBoutique} />
              </Col>
            </Row>
          </Container>
          <Container>
            <ShopList productItems={listBoutique} />
          </Container>
        </section>
      </Fragment>
    </MainContainer>
  );
};

export default Shop;
