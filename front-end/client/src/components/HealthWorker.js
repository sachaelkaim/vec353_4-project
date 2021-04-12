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

const HealthWorker = () => {
  /* ALL PUBLIC HEALTH WORKER ID'S */
  const [allID, setAllID] = useState([]);

  const getAllPeopleID = async () => {
    const response = await axios
      .get("/healthWorker/allEmployeeID.php")
      .catch((err) => console.log("Error", err));
    if (response && response.data) {
      console.log(response.data);
      setAllID(response.data);
    }
  };

  /* CREATE PUBLIC HEALTH WORKER */
  const [schedule, setSchedule] = useState("");
  const [facility, setFacility] = useState("");
  const [personID, setPersonID] = useState("");

  const [refreshDropdownCreate, setRefreshDropdownCreate] = useState(false);

  const createEmployee = async () => {
    setRefreshDropdownCreate(!refreshDropdownCreate);
    let body = {
      schedule: schedule,
      facility: facility,
      personID: personID
    };
    console.log(body);
    const response = await axios
      .post("/healthWorker/createEmployee.php", body)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /* DELETE PUBLIC HEALTH WORKER */
  const [deleteID, setDeleteID] = useState("");
  const [refreshDropdownDelete, setRefreshDropdownDelete] = useState(false);
  const handleSelectDeleteID = (e) => {
    setDeleteID(e);
  };

  const deletePerson = async () => {
    console.log(deleteID);
    if (deleteID !== "") {
      setRefreshDropdownDelete(!refreshDropdownDelete);
      const response = await axios
        .post("/healthWorker/deleteEmployee.php", deleteID)
        .then((response) => {
          if (response && response.data) {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  /* EDIT PUBLIC HEALTH WORKER */
  const [editEmployeeID, setEditEmployeeID] = useState("");
  const [editColumn, setEditColumn] = useState("");
  const [editChange, setEditChange] = useState("");

  const handleSelectEditID = (e) => {
    setEditEmployeeID(e);
  };

  const handleSelectEditColumn = (e) => {
    setEditColumn(e);
  };

  const editEmployee = async () => {
    if (editEmployeeID !== "" && editColumn !== "" && editChange !== "") {
      let body = {
        editEmployeeID,
        editColumn,
        editChange,
      };
      console.log(body);
      const response = await axios
        .post("/healthWorker/editEmployee.php", body)
        .catch((error) => {
          console.error(error);
        });
    }
  };

  /* DISPLAY PUBLIC HEALTH WORKER */
  const [employeeID, setEmployeeID] = useState("");
  const [employee, setEmployee] = useState([]);

  const getEmployeeInfo = async () => {
    if (employeeID !== "") {
      const response = await axios
        .post("/healthWorker/displayEmployee.php", employeeID)
        .then((response) => {
          if (response && response.data) {
            console.log(response.data);
            setEmployee(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSelectDisplayID = (e) => {
    setEmployeeID(e);
  };

  /* DISPLAY DROPDOWN ID'S */
  useEffect(() => {
    getAllPeopleID();
  }, [refreshDropdownDelete, refreshDropdownCreate]);

  return (
    <div className="home">
      <div className="person-title">PUBLIC HEALTH WORKER</div>
      <Tabs id="uncontrolled-tab-example">
        <Tab eventKey="Create" title="Create">
          <br />
          <Container style={{ maxWidth: "40%" }}>
            <Form>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Schedule
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={schedule}
                    onChange={(e) => {
                      setSchedule(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Facility ID
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={facility}
                    onChange={(e) => {
                      setFacility(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Person ID
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={personID}
                    onChange={(e) => {
                      setPersonID(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Button className="submit" onClick={createEmployee}>
                Submit
              </Button>
            </Form>
          </Container>
        </Tab>
        <Tab eventKey="Delete" title="Delete">
          <br />
          <Container>
            <Form>
              <Form.Group
                as={Row}
                controlId=""
                className="justify-content-sm-center"
              >
                <DropdownButton
                  className="dropdown-scroll"
                  title="Employee ID"
                  onSelect={handleSelectDeleteID}
                  variant="dark"
                >
                  {allID.map((item) => (
                    <div key={item}>
                      <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
                    </div>
                  ))}
                </DropdownButton>
                &nbsp;&nbsp;&nbsp;
                <Button className="submit" onClick={deletePerson}>
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </Tab>
        <Tab eventKey="Edit" title="Edit">
          <br />
          <Container>
            <Form>
              <Form.Group
                as={Row}
                controlId=""
                className="justify-content-sm-center"
              >
                <DropdownButton
                  className="dropdown-scroll"
                  title="Employee ID"
                  onSelect={handleSelectEditID}
                  variant="dark"
                >
                  {allID.map((item) => (
                    <div key={item}>
                      <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
                    </div>
                  ))}
                </DropdownButton>
                &nbsp;&nbsp;&nbsp;
                <DropdownButton
                  className="dropdown-scroll"
                  title="Choose Field"
                  onSelect={handleSelectEditColumn}
                >
                  <Dropdown.Item eventKey="Schedule">Schedule</Dropdown.Item>
                  <Dropdown.Item eventKey="Facility">FacilityID</Dropdown.Item>
                  <Dropdown.Item eventKey="PersonID">PersonID</Dropdown.Item>
                </DropdownButton>
                <Col sm="5">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={editChange}
                    onChange={(e) => {
                      setEditChange(e.target.value);
                    }}
                  />
                </Col>
                <Button onClick={editEmployee} className="submit">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </Tab>
        <Tab eventKey="Display" title="Display">
          <br />
          <Container>
            <Form>
              <Form.Group
                as={Row}
                controlId=""
                className="justify-content-sm-center"
              >
                <DropdownButton
                  className="dropdown-scroll"
                  title="Employee ID"
                  onSelect={handleSelectDisplayID}
                  variant="dark"
                >
                  {allID.map((item) => (
                    <div key={item}>
                      <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
                    </div>
                  ))}
                </DropdownButton>
                &nbsp;&nbsp;&nbsp;
                <Button className="submit" onClick={getEmployeeInfo}>
                  Submit
                </Button>
              </Form.Group>
            </Form>
            <div style={{ fontWeight: "bold" }}>
              Schedule: &nbsp;{employee[0]}
              <br />
              FacilityID:&nbsp;{employee[1]}
              <br />
              PersonID:&nbsp;{employee[2]}
              <br />
            </div>
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
};

export default HealthWorker;
