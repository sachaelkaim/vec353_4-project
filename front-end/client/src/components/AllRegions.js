import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

/* 13. */
const AllRegions = () => {
  const [allRegions, setAllRegions] = useState([]);

  const getAllRegions = async () => {
    const response = await axios
      .get("/back-end/allRegions/getAllRegions.php")
      .then((response) => {
        if (response && response.data) {
            console.log(response.data);
            setAllRegions(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const clear = async () => {
    setAllRegions([]);
  };

  return (
    <div className="home">
      <div className="person-title">13. DETAIL LIST OF ALL REGIONS</div>
          <hr/>
      <Container>
        <Form>
          <Form.Group
            as={Row}
            controlId=""
            className="justify-content-sm-center"
          >
            <Button onClick={getAllRegions} className="submit">
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
        {allRegions.map((item) => (
          <div
            style={{ width: "600px", display: "inline-block" }}
            controlId=""
            key={item}
          >
              {item.map((item1) => (
                <div
                controlId=""
                key={item1}
              >
                  {item1}
                  </div>
              ))}
            <br />
            <br />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default AllRegions;
