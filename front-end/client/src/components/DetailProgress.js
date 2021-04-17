import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

/* 10. */
const DetailProgress = () => {
    const [date1, setDate1] = useState("");
    const [progress, setProgress] = useState([]);
    
    const getProgress = async () => {
      let body = {
        date1: date1
      };
      const response = await axios
        .post("/back-end/detailProgress/get.php", body)
        .then((response) => {
          if (response && response.data) {
            console.log(response.data);
            setProgress(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    return (
      <div className="home">
        <div className="person-title">9.DETAIL PROGRESS FOR THOSE TESTING POSITIVE ON SPECIFIC DAY</div>
        <hr />
        <Container>
          <Form>
            <Form.Group
              as={Row}
              controlId=""
              className="justify-content-sm-center"
            >
              <Col sm="2">
                <Form.Control
                  type="text"
                  placeholder="Enter date"
                  value={date1}
                  onChange={(e) => {
                    setDate1(e.target.value);
                  }}
                />
              </Col>
              <Button onClick={getProgress} className="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
          <br />
          <br />
          {progress.map((item) => (
            <div
              style={{ width: "350px", display: "inline-block"}}
              controlId=""
              key={item}
            >
               <div style={{textAlign: "center"}}>
                <span style={{ fontWeight: "bold" }}>TestID:</span> &nbsp;
                {item[0]}
                <br />
                <span style={{ fontWeight: "bold" }}>Report Time:</span>&nbsp;
                {item[1]}
                <br />
                <span style={{ fontWeight: "bold" }}>Report Date:</span>&nbsp;
                {item[2]}
                <br />
                <span style={{ fontWeight: "bold" }}>Temperature:</span>&nbsp;
                {item[3]}
                <br />
                <span style={{ fontWeight: "bold" }}>Symptoms:</span>&nbsp;
                {item[4]}
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

export default DetailProgress;
