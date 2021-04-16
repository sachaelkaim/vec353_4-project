import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

/* 14. */
const ResultTestPeople = () => {
  const [date, setDate] = useState("");
  const [people, setPeople] = useState([]);

  const getPeople = async () => {
    let body = {
        date: date,
    };
    const response = await axios
      .post("/back-end/resultTestPeople/getInfo.php", body)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data);
          setPeople(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="home">
      <div className="person-title">14.LIST OF PEOPLE WHO GOT TEST RESULT ON SPECIFIC DATE</div>
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
                placeholder="Enter Date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
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
              <span style={{ fontWeight: "bold" }}>TestID:</span> &nbsp;
              {item[0]}
              <br />
              <span style={{ fontWeight: "bold" }}>PersonID:</span>&nbsp;
              {item[1]}
              <br />
              <span style={{ fontWeight: "bold" }}>Test Result:</span>&nbsp;
              {item[2]}
              <br />
              <span style={{ fontWeight: "bold" }}>FirstName:</span>&nbsp;
              {item[3]}
              <br />
              <span style={{ fontWeight: "bold" }}>LastName:</span>&nbsp;
              {item[4]}
              <br />
              <span style={{ fontWeight: "bold" }}>Dob:</span>&nbsp;
              {item[5]}
              <br />
              <span style={{ fontWeight: "bold" }}>Phone:</span>&nbsp;
              {item[6]}
              <br />
              <span style={{ fontWeight: "bold" }}>Email:</span>&nbsp;
              {item[7]}
              <br />
            </div>
            <br />
            <br />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default ResultTestPeople;
