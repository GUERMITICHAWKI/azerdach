import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";

const ProductDetails = ({ selectedProduct }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handlePrevSlide = () => {
    const newIndex = activeIndex === 0 ? selectedProduct.image_url.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  const handleNextSlide = () => {
    const newIndex = activeIndex === selectedProduct.image_url.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1); // Ensure quantity is at least 1
  };

  const handleAdd = () => {
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div
              id="carouselBasicExample"
              className="carousel slide carousel-fade"
              data-mdb-ride="carousel"
            >
              <div className="carousel-indicators">
                {selectedProduct?.image_url.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={index === activeIndex ? "active" : ""}
                    aria-current={index === activeIndex ? "true" : "false"}
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                ))}
              </div>

              <div className="carousel-inner">
                {selectedProduct?.image_url.map((item, index) => (
                  <div key={index} className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
                    <img
                      src={"http://localhost:2000/product/" + item}
                      className="d-block w-100"
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                onClick={handlePrevSlide}
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                onClick={handleNextSlide}
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.Nom_produit}</h2>
            <div className="info">
              <span className="price">${selectedProduct?.Prix}</span>
              <span className="category">Category: {selectedProduct?.id_categorie?.Nom_categorie}</span>
            </div>
            <p>{selectedProduct?.shortDesc}</p>
            <input
              className="qty-input"
              type="number"
              min="1"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              aria-label="Add"
              type="button"
              className="add"
              onClick={handleAdd}
            >
              Add To Cart
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
