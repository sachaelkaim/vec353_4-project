import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Tab,
  Tabs,
  Form,
  Container,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

/*8*/
const SymptomsFollowUp = () => {
  const [medicNumber, setMedicNumber] = useState("");
  const [dob, setDob] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [temperature, setTemperature] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [alertResponse, setAlertResponse] = useState("");

  const submitFollowUp = async () => {
    setAlertResponse("");
    let body = {
      medicNumber: medicNumber,
      dob: dob,
      date: date,
      time: time,
      temperature: temperature,
      symptoms: symptoms,
    };
    const response = await axios
      .post("/back-end/symptomsFollowUp/symptomsFollowUp.php", body)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data);
          setAlertResponse(response.data);
          console.log(alertResponse);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="home">
      <div className="person-title">8.Symptoms Follow Up</div>
      <hr />
      <Container style={{ maxWidth: "40%" }}>
        <Form>
          <Form.Group as={Row} contolID="">
            <Form.Label column sm="5">
              Medicare Number
            </Form.Label>
            <Col sm="5">
              <Form.Control
                type="text"
                placeholder=""
                value={medicNumber}
                onChange={(e) => {
                  setMedicNumber(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} contolID="">
            <Form.Label column sm="5">
              Date Of Birth (DD-MM-YYYY)
            </Form.Label>
            <Col sm="5">
              <Form.Control
                type="text"
                placeholder=""
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} contolID="">
            <Form.Label column sm="5">
              Today's Date (YYYY-MM-DD)
            </Form.Label>
            <Col sm="5">
              <Form.Control
                type="text"
                placeholder=""
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} contolID="">
            <Form.Label column sm="5">
              Time
            </Form.Label>
            <Col sm="5">
              <Form.Control
                type="text"
                placeholder=""
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} contolID="">
            <Form.Label column sm="5">
              Your Body Temperature
            </Form.Label>
            <Col sm="5">
              <Form.Control
                type="text"
                placeholder=""
                value={temperature}
                onChange={(e) => {
                  setTemperature(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} contolID="">
            <Form.Label column sm="5">
              All Symptoms
            </Form.Label>
            <Col sm="5">
              <Form.Control
                type="text"
                placeholder=""
                value={symptoms}
                onChange={(e) => {
                  setSymptoms(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Button className="submit" onClick={submitFollowUp}>
            Submit
          </Button>
        </Form>
        {alertResponse}
      </Container>
    </div>
  );
};
export default SymptomsFollowUp;
