import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

/* 11. */
const SpecificAddress = () => {
  const [address, setAddress] = useState("");
  const [people, setPeople] = useState([]);
  const getPeople = async () => {
    let body = {
      address: address,
    };
    const response = await axios
      .post("/back-end/specificAddress/getPeople.php", body)
      .then((response) => {
        if (response && response.data) {
          setPeople(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="home">
      <div className="person-title">11.LIST OF PEOPLE IN SPECIFIC ADDRESS</div>
      <hr />
      <Container>
        <Form>
          <Form.Group
            as={Row}
            controlId=""
            className="justify-content-sm-center"
          >
            <Col sm="5">
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </Col>
            <Button onClick={getPeople} className="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
        <br />
        <br />
        {people.map((item) => (
          <div
            style={{ width: "350px", display: "inline-block" }}
            controlId=""
            key={item}
          >
             <div style={{textAlign: "center"}}>
              <span style={{ fontWeight: "bold" }}>PersonID:</span> &nbsp;
              {item[0]}
              <br />
              <span style={{ fontWeight: "bold" }}>FirstName:</span>&nbsp;
              {item[1]}
              <br />
              <span style={{ fontWeight: "bold" }}>LastName:</span>&nbsp;
              {item[2]}
              <br />
              <span style={{ fontWeight: "bold" }}>DoB:</span>&nbsp;
              {item[3]}
              <br />
              <span style={{ fontWeight: "bold" }}>MedicareNum:</span>&nbsp;
              {item[4]}
              <br />
              <span style={{ fontWeight: "bold" }}>Name:</span>&nbsp;
              {item[5]}
              <br />
              <span style={{ fontWeight: "bold" }}>Address:</span>&nbsp;
              {item[6]}
              <br />
              <span style={{ fontWeight: "bold" }}>City:</span>&nbsp;
              {item[7]}
              <br />
              <span style={{ fontWeight: "bold" }}>Province:</span>&nbsp;
              {item[8]}
              <br />
              <span style={{ fontWeight: "bold" }}>Postal Code:</span>&nbsp;
              {item[9]}
              <br />
              <span style={{ fontWeight: "bold" }}>Email Address:</span>&nbsp;
              {item[10]}
              <br />
              <span style={{ fontWeight: "bold" }}>Citizenship:</span>&nbsp;
              {item[11]}
            </div>
            <br />
            <br />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default SpecificAddress;
