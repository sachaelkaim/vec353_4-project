import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

/* 12. */
const AllFacilities = () => {
  const [allFacilities, setAllFacilities] = useState([]);

  const getAllFacilities = async () => {
    const response = await axios
      .get("/back-end/allFacilities/getAllFacilities.php")
      .then((response) => {
        if (response && response.data) {
            console.log(response.data);
            setAllFacilities(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const clear = async () => {
    setAllFacilities([]);
  };

  return (
    <div className="home">
      <div className="person-title">12.LIST OF ALL FACILITIES</div>
          <hr/>
      <Container>
        <Form>
          <Form.Group
            as={Row}
            controlId=""
            className="justify-content-sm-center"
          >
            <Button onClick={getAllFacilities} className="submit">
              Submit
            </Button>
            &nbsp;
            <Button onClick={clear} className="submit">
              Clear
            </Button>
          </Form.Group>
        </Form>
        <br />
        <br />
        {allFacilities.map((item) => (
          <div
            style={{ width: "600px", display: "inline-block" }}
            controlId=""
            key={item}
          >
           <div style={{textAlign: "left"}}>
              <span style={{ fontWeight: "bold" }}>FacilityID:</span> &nbsp;
              {item[0]}
              <br />
              <span style={{ fontWeight: "bold" }}>Type:</span>&nbsp;
              {item[1]}
              <br />
              <span style={{ fontWeight: "bold" }}>Web Address:</span>&nbsp;
              {item[2]}
              <br />
              <span style={{ fontWeight: "bold" }}>Phone Number:</span>&nbsp;
              {item[3]}
              <br />
              <span style={{ fontWeight: "bold" }}>Address:</span>&nbsp;
              {item[4]}
              <br />
              <span style={{ fontWeight: "bold" }}>Name:</span>&nbsp;
              {item[5]}
              <br />
              <span style={{ fontWeight: "bold" }}>Testing Method:</span>&nbsp;
              {item[6]}
              <br />
              <span style={{ fontWeight: "bold" }}>Drive Thru Testing:</span>&nbsp;
              {item[7]}
              <br />
              <span style={{ fontWeight: "bold" }}>Total workers:</span>&nbsp;
              {item[8]}
            </div>
            <br />
            <br />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default AllFacilities;
