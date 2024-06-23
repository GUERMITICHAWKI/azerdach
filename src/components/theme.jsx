import React, { Fragment, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

function Theme() {
    const [navbarColor, setNavbarColor] = useState("red");
    const [footerColor, setFooterColor] = useState("blue");
  

  const themeupload = async () => {
      try {
        const data  ={
            navbarColor : navbarColorc
            

        }
        await axios.post("http://localhost:3001/color/" , data).then((response) => {
            console.log(response.data)
        });
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <>
      <Fragment>
        <h2 className="mt-4 mb-4" style={{ textAlign: "center" }}>Ajouter Theme</h2>
        <Form className="p-4 border text-center">
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formFirstName">
                <Form.Label>navbarColor</Form.Label>
                <Form.Control type="text" placeholder="Enter your first name"
                onChange={(e)=> {
                    setcolor(e.target.value)
                    console.log(e.target.value)}} />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="button" onClick={Colorupload}>
            Send
          </Button>
          <br></br><br></br><br></br>
          <Row className="mb-3">
          <Col>
              <Form.Group controlId="formFirstName">
                <Form.Label>font</Form.Label>
                <Form.Control type="text" placeholder="Enter your first name"
                onChange={(e)=> {
                    setfont(e.target.value)
                    console.log(e.target.value)}} />
              </Form.Group>
            </Col>         
          </Row>

          <Button variant="primary" type="submit">
            Send
          </Button>
          <br></br><br></br><br></br>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formEmail">
              <div className="flex w-full h-screen items-center justify-center bg-grey-lighter">
    <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">


        <span className="mt-2 text-base leading-normal">Select a file</span>
        <input type='file' className="hidden"  onChange={(e)=> {
            setimg(e.target.files[0])
            console.log(e.target.files[0])}}  />
    </label>
</div>

              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Upload
          </Button>
          <br></br><br></br><br></br>

        </Form>
      </Fragment>
    </>
  );
}

export default Theme;
