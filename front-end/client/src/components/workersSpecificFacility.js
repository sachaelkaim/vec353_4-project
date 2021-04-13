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

/* 15. */
const WorkersSpecificFacility = () => {
  /* ALL PUBLIC HEALTH FACILITY ID'S */
  const [allID, setAllID] = useState([]);

  const getAllFacilityID = async () => {
    const response = await axios
      .get("/healthCenter/allFacilityID.php")
      .catch((err) => console.log("Error", err));
    if (response && response.data) {
      console.log(response.data);
      setAllID(response.data);
    }
  };

  /* DISPLAY DROPDOWN ID'S */
  useEffect(() => {
    getAllFacilityID();
  }, []);

  return (
    <div className="home">
      <div className="person-title">
        15.LIST OF ALL WORKERS IN SPECIFIC FACILITY
      </div>
      <Container>
        <Form>
          <Form.Group
            as={Row}
            controlId=""
            className="justify-content-sm-center"
          >
            <DropdownButton
              className="dropdown-scroll"
              title="Facility ID"
              variant="dark"
            >
              {allID.map((item) => (
                <div key={item}>
                  <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
                </div>
              ))}
            </DropdownButton>
            &nbsp;&nbsp;&nbsp;
            <Button className="submit">Submit</Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default WorkersSpecificFacility;
