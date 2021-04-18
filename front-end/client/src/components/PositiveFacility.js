import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

/* 16. */
const PositiveFacility = () => {
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [positives, setPositives] = useState([]);
  const [employees, setEmployees] = useState([]);

  const getInfo = async () => {
    if(data1 != "" && data2 != ""){
    setPositives([]);
    setEmployees([]);
    let body = {
      data1: data1,
      data2: data2,
    };
    const response = await axios
      .post("/back-end/positiveFacility/get.php", body)
      .then((response) => {
        if (response && response.data) {
          setPositives(response.data.positives);
          setEmployees(response.data.employees);
          Array.prototype.push.apply(employees, response.data.employees);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };

  return (
    <div className="home">
      <div className="person-title">
        16.POSITIVE WORKERS CERTAIN DATE + EMPLOYEES OF FACILITY
      </div>
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
                placeholder="Facility ID"
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
        <div style={{ fontSize: "22px", marginBottom: "50px" }}>
          POSITIVE WORKERS
        </div>
        {positives != null &&
          positives.map((item) => (
            <div
              style={{ width: "350px", display: "inline-block" }}
              controlId=""
              key={item}
            >
              <span style={{ textAlign: "center" }}>
                <span style={{ fontWeight: "bold" }}>TestID:</span> &nbsp;
                {item[0]}
                <br />
                <span style={{ fontWeight: "bold" }}>Result Date:</span>&nbsp;
                {item[1]}
                <br />
                <span style={{ fontWeight: "bold" }}>Date:</span>&nbsp;
                {item[2]}
                <br />
                <span style={{ fontWeight: "bold" }}>EmployeeID:</span>&nbsp;
                {item[3]}
                <br />
                <span style={{ fontWeight: "bold" }}>PersonID:</span>&nbsp;
                {item[4]}
                <br />
                <span style={{ fontWeight: "bold" }}>FacilityID:</span>&nbsp;
                {item[5]}
                <br />
                <span style={{ fontWeight: "bold" }}>Test Result:</span>&nbsp;
                {item[6]}
                <br />
              </span>
              <br />
              <br />
            </div>
          ))}
        <div style={{ fontSize: "22px", marginBottom: "50px" }}>
          EMPLOYEES WORKING IN THAT FACILITY
        </div>
        {employees != null &&
          employees.map((item) => (
            <div
              style={{ width: "350px", display: "inline-block" }}
              controlId=""
              key={item}
            >
              <div style={{ textAlign: "center" }}>
                <span style={{ fontWeight: "bold" }}>EmployeeID:</span> &nbsp;
                {item[0]}
                <br />
                <span style={{ fontWeight: "bold" }}>Schedule:</span>&nbsp;
                {item[1]}
                <br />
                <span style={{ fontWeight: "bold" }}>FacilityID:</span>&nbsp;
                {item[2]}
                <br />
                <span style={{ fontWeight: "bold" }}>PersonID:</span>&nbsp;
                {item[3]}
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

export default PositiveFacility;
