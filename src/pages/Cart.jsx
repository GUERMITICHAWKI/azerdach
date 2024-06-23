import { useEffect, useState, Fragment } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import MainContainer from "../containers/MainContainer";
import axios from "axios";

const Cart = () => {
  const data = JSON.parse(localStorage.getItem('data'));

  const [onclick, setOnClick] = useState(false);
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [Numero_telephone, setNumero_telephone] = useState("");
  const [email, setEmail] = useState("");
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [errors, setErrors] = useState({});

  const fetchProductsBycategory = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:2000/api/commande", {
        Nom,
        Prénom: Prenom,
        Adresse,
        Numero_telephone,
        email,
        products: updatedProducts,
        id_boutique: data?._id,
        prix: calculateTotal(),
      });
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    setUpdatedProducts(products);
    window.scrollTo(0, 0);
  }, []);

  const updateQuantity = (index) => {
    const updatedProductsCopy = [...updatedProducts];
    updatedProductsCopy[index].quantity += 1;
    setUpdatedProducts(updatedProductsCopy);
    localStorage.setItem("products", JSON.stringify(updatedProductsCopy));
  };

  const updateQuantitydes = (index) => {
    const updatedProductsCopy = [...updatedProducts];
    updatedProductsCopy[index].quantity -= 1;
    setUpdatedProducts(updatedProductsCopy);
    localStorage.setItem("products", JSON.stringify(updatedProductsCopy));
  };

  const calculateTotal = () => {
    const total = updatedProducts.reduce((total, item) => total + item.Prix * item.quantity, 0);
    return total;
  };

  const handleDeleteProduct = (index) => {
    const updatedProductsCopy = [...updatedProducts];
    updatedProductsCopy.splice(index, 1);
    setUpdatedProducts(updatedProductsCopy);
    localStorage.setItem("products", JSON.stringify(updatedProductsCopy));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!Nom) newErrors.Nom = "Le nom est obligatoire";
    if (!Prenom) newErrors.Prenom = "Le prénom est obligatoire";
    if (!Adresse) newErrors.Adresse = "L'adresse est obligatoire";
    if (!Numero_telephone) newErrors.Numero_telephone = "Le numéro de téléphone est obligatoire";
    if (!email) newErrors.email = "L'email est obligatoire";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <MainContainer>
      <section className="cart-items">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              {updatedProducts.length === 0 && <h1 className="no-items product">No Items are added in Cart</h1>}
              {updatedProducts.map((item, index) => {
                const productQty = item.Prix * item.quantity;
                return (
                  <div className="cart-list" key={item._id}>
                    <Row>
                      <Col className="image-holder" sm={4} md={3}>
                        <img src={`http://localhost:2000/product/${item.image_url[0]}`} alt="" />
                      </Col>
                      <Col sm={8} md={9}>
                        <Row className="cart-content justify-content-center">
                          <Col xs={12} sm={9} className="cart-details">
                            <h3>{item.Nom_produit}</h3>
                            <h4>
                              ${item.Prix}.00 * {item.quantity}
                              <span>${productQty}.00</span>
                            </h4>
                          </Col>
                          <Col xs={12} sm={3} className="cartControl">
                            <button className="incCart" onClick={() => updateQuantity(index)}>
                              <i className="fa-solid fa-plus"></i>
                            </button>
                            <button className="desCart" onClick={() => updateQuantitydes(index)}>
                              <i className="fa-solid fa-minus"></i>
                            </button>
                          </Col>
                        </Row>
                      </Col>
                      <button className="delete" onClick={() => handleDeleteProduct(index)}>
                        <ion-icon name="close"></ion-icon>
                      </button>
                    </Row>
                  </div>
                );
              })}
            </Col>
            <Col md={4}>
              <div className="cart-total">
                <h2>Cart Summary</h2>
                <div className="d-flex justify-content-between">
                  <h4>Total Price:</h4>
                  <h3>${calculateTotal()}.00</h3>
                </div>
              </div>
              <Row className="justify-content-center">
                <Button variant="primary" type="button" onClick={() => setOnClick(true)}>
                  Place order
                </Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      {onclick && (
        <Fragment>
          <h2 className="mt-4 mb-4" style={{ textAlign: "center" }}>
            Client Details
          </h2>
          <Form className="p-4 border text-center">
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    onChange={(e) => setNom(e.target.value)}
                    isInvalid={!!errors.Nom}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Nom}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    onChange={(e) => setPrenom(e.target.value)}
                    isInvalid={!!errors.Prenom}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Prenom}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    onChange={(e) => setNumero_telephone(e.target.value)}
                    isInvalid={!!errors.Numero_telephone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Numero_telephone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your address"
                    onChange={(e) => setAdresse(e.target.value)}
                    isInvalid={!!errors.Adresse}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Adresse}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <br></br>
            <Button onClick={() => fetchProductsBycategory()} variant="primary" type="button">
              Send
            </Button>
          </Form>
        </Fragment>
      )}
    </MainContainer>
  );
};

export default Cart;
