import React from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";

const Footer = ({ footerColor, img, nomBoutique, location, email, phone }) => {
  return (
    <footer>
      <Container
        style={
          footerColor == "black"
            ? { color: "white", backgroundColor: footerColor }
            : { color: "black", backgroundColor: footerColor }
        }
      >
        {/* <Container style={{ backgroundColor: "black" }}> */}
        <Row className="footer-row">
          <Col md={3} sm={5} className="box">
            <div className="logo">
              <img
                className="h-40 w-40 rounded-full object-cover object-center"
                src={img}
                alt="Logo"
                width={50}
                height={50}
              />
              <h1>{nomBoutique}</h1>
            </div>
            <p>
              Welcome to our online store, your one-stop shop for all your
              shopping needs! Explore our wide range of products.
            </p>
          </Col>

          <Col md={3} sm={5} className="box">
            <h2>Contact Us</h2>
            <ul>
              <li>Localisation: {location}</li>
              <li>Email: {email}</li>
              <li>Phone: {phone}</li>
              <br />
              <br />
              <h5 style={{ color: "white", opacity: "1" }}>
                {" "}
                © 2024 MADE BY :eCommerceMaker{" "}
              </h5>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
