import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

/* 10. */
const AllMessages = () => {
    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState([]);
    const [messages, setMessages] = useState([]);
    
    const getAllMessages = async () => {
      if(date1 != "" && date2 != null){
        let body = {
          date1: date1,
          date2: date2
        };
        const response = await axios
          .post("/back-end/allMessages/getAllMessages.php", body)
          .then((response) => {
            if (response && response.data) {
              console.log(response.data);
              setMessages(response.data);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };
  
    return (
      <div className="home">
        <div className="person-title">10.ALL MESSAGES WITHIN A SPECIFIC PERIOD OF TIME</div>
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
              <Col sm="2">
                <Form.Control
                  type="text"
                  placeholder="Enter date"
                  value={date2}
                  onChange={(e) => {
                    setDate2(e.target.value);
                  }}
                />
              </Col>
              <Button onClick={getAllMessages} className="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
          <br />
          <br />
          {messages.map((item) => (
            <div
              style={{ width: "350px", display: "inline-block"}}
              controlId=""
              key={item}
            >
               <div style={{textAlign: "center"}}>
                <span style={{ fontWeight: "bold" }}>MessageID:</span> &nbsp;
                {item[0]}
                <br />
                <span style={{ fontWeight: "bold" }}>Date:</span>&nbsp;
                {item[1]}
                <br />
                <span style={{ fontWeight: "bold" }}>Time:</span>&nbsp;
                {item[2]}
                <br />
                <span style={{ fontWeight: "bold" }}>PersonID:</span>&nbsp;
                {item[3]}
                <br />
                <span style={{ fontWeight: "bold" }}>Email:</span>&nbsp;
                {item[4]}
                <br />
                <span style={{ fontWeight: "bold" }}>Message:</span>&nbsp;
                {item[5]}
                <br />
                <span style={{ fontWeight: "bold" }}>New Alert:</span>&nbsp;
                {item[6]}
                <br />
                <span style={{ fontWeight: "bold" }}>Old Alert:</span>&nbsp;
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

export default AllMessages;
