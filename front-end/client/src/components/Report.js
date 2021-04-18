import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

/* 17. */
const Report = () => {
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState([]);
  const [info, setInfo] = useState([]);
  
  const getInfo = async () => {
    if(data1 != "" && data2 != null){
      let body = {
        data1: data1,
        data2: data2
      };
      const response = await axios
        .post("/back-end/report/get.php", body)
        .then((response) => {
          if (response && response.data) {
            console.log(response.data);
            setInfo(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="home">
      <div className="person-title">17.REPORT</div>
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
                value={data1}
                onChange={(e) => {
                  setData1(e.target.value);
                }}
              />
            </Col>
            <Col sm="2">
              <Form.Control
                type="text"
                placeholder="Enter date"
                value={data2}
                onChange={(e) => {
                  setData2(e.target.value);
                }}
              />
            </Col>
            <Button onClick={getInfo} className="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
        <br />
        <br />
        {info.map((item) => (
          <div
            style={{ width: "350px", display: "inline-block"}}
            controlId=""
            key={item}
          >
             <div style={{textAlign: "center"}}>
              <span style={{ fontWeight: "bold" }}>Region:</span> &nbsp;
              {item[0]}
              <br />
              <span style={{ fontWeight: "bold" }}>Positive:</span>&nbsp;
              {item[1]}
              <br />
              <span style={{ fontWeight: "bold" }}>Negative:</span>&nbsp;
              {item[2]}
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

export default Report;
