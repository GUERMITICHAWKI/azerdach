import React, { Fragment } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import axios from "axios";
import MainContainer from "../containers/MainContainer";

function Buy() {
  return (
    <MainContainer>
      <Fragment>
        <h2 className="mt-4 mb-4" style={{ textAlign: "center" }}>
          Client Details
        </h2>
        <Form className="p-4 border text-center">
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your first name" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your last name" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                />
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
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPayment">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control as="select">
                  <option>PayPal</option>
                  <option>Credit Card</option>
                  <option>Cash</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <br></br>
          <br></br>
          <br></br>
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </Fragment>
    </MainContainer>
  );
}

export default Buy;
