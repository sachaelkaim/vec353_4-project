import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Container,
  Row,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

/* 15. */
const WorkersSpecificFacility = () => {
  const [facilityID, setfacilityID] = useState([]);
  const [workers, setWorkers] = useState([]);
  /* ALL PUBLIC HEALTH FACILITY ID'S */
  const [allID, setAllID] = useState([]);

  const getAllFacilityID = async () => {
    const response = await axios
      .get("/back-end/healthCenter/allFacilityID.php")
      .catch((err) => console.log("Error", err));
    if (response && response.data) {
      console.log(response.data);
      setAllID(response.data);
    }
  };

  const getWorkersFacility = async () => {
    if (facilityID !== null || facilityID !== "") {
      console.log(facilityID)
      const response = await axios
        .post("/back-end/specificFacility/getWorkers.php", facilityID)
        .then((response) => {
          if (response && response.data) {
            console.log(response.data);
            setWorkers(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleFacilityID = (e) => {
    setfacilityID(e);
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
      <hr />
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
                  <Dropdown.Item eventKey={item} onSelect={handleFacilityID}>{item}</Dropdown.Item>
                </div>
              ))}
            </DropdownButton>
            &nbsp;&nbsp;&nbsp;
            <Button className="submit" onClick={getWorkersFacility}>Submit</Button>
          </Form.Group>
        </Form>
        {workers !== null && workers.map((item) => (
          <div
            style={{ width: "350px", display: "inline-block" }}
            controlId=""
            key={item}
          >
           <div style={{textAlign: "center"}}>
              <span style={{ fontWeight: "bold" }}>EmployeeID:</span> &nbsp;
              {item[0]}
              <br />
              <span style={{ fontWeight: "bold" }}>PersonID:</span>&nbsp;
              {item[1]}
              <br />
              <span style={{ fontWeight: "bold" }}>Schedule:</span>&nbsp;
              {item[2]}
              <br />
              <span style={{ fontWeight: "bold" }}>FirstName:</span>&nbsp;
              {item[3]}
              <br />
              <span style={{ fontWeight: "bold" }}>LastName:</span>&nbsp;
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

export default WorkersSpecificFacility;
