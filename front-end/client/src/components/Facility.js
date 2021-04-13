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

/* 3. */
const Facility = () => {
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

  /* CREATE PUBLIC HEALTH FACILITY */
  const [type, setType] = useState("");
  const [webAddress, setWebAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [testingMethod, setTestingMethod] = useState("");
  const [driveThruTesting, setDriveThruTesting] = useState("");

  const [refreshDropdownCreate, setRefreshDropdownCreate] = useState(false);

  const createPublicHealthFacility = async () => {
    setRefreshDropdownCreate(!refreshDropdownCreate);
    let body = {
      type: type,
      webAddress: webAddress,
      phoneNumber: phoneNumber,
      address: address,
      name: name,
      testingMethod: testingMethod,
      driveThruTesting: driveThruTesting,
    };
    console.log(body);
    const response = await axios
      .post("/back-end/healthCenter/createFacility.php", body)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /* DELETE PUBLIC HEALTH FACILITY */
  const [deleteID, setDeleteID] = useState("");
  const [refreshDropdownDelete, setRefreshDropdownDelete] = useState(false);
  const handleSelectDeleteID = (e) => {
    setDeleteID(e);
  };
  const deleteFacility = async () => {
    console.log(deleteID);
    if (deleteID !== "") {
      setRefreshDropdownDelete(!refreshDropdownDelete);
      const response = await axios
        .post("/back-end/healthCenter/deleteFacility.php", deleteID)
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

  /* EDIT PUBLIC HEALTH FACILITY */
  const [editFacilityID, setEditFacilityID] = useState("");
  const [editColumn, setEditColumn] = useState("");
  const [editChange, setEditChange] = useState("");

  const handleSelectEditID = (e) => {
    setEditFacilityID(e);
  };

  const handleSelectEditColumn = (e) => {
    setEditColumn(e);
  };

  const editEmployee = async () => {
    if (editFacilityID !== "" && editColumn !== "" && editChange !== "") {
      let body = {
        editFacilityID,
        editColumn,
        editChange,
      };
      console.log(body);
      const response = await axios
        .post("/back-end/healthCenter/editHealthCenter.php", body)
        .catch((error) => {
          console.error(error);
        });
    }
  };

  /* DISPLAY PUBLIC HEALTH FACILITY */
  const [facilityID, setFacilityID] = useState("");
  const [facility, setfacility] = useState([]);

  const getFacilityInfo = async () => {
    if (facilityID !== "") {
      const response = await axios
        .post("/back-end/healthCenter/displayFacility.php", facilityID)
        .then((response) => {
          if (response && response.data) {
            console.log(response.data);
            setfacility(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSelectDisplayID = (e) => {
    setFacilityID(e);
  };

  /* DISPLAY DROPDOWN ID'S */
  useEffect(() => {
    getAllFacilityID();
  }, [refreshDropdownDelete, refreshDropdownCreate]);

  return (
    <div className="home">
      <div className="person-title">3.FACILITY</div>
      <Tabs id="uncontrolled-tab-example">
        <Tab eventKey="Create" title="Create">
          <br />
          <Container style={{ maxWidth: "40%" }}>
            <Form>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Type
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Web Address
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={webAddress}
                    onChange={(e) => {
                      setWebAddress(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Phone Number
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Address
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Testing Method
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={testingMethod}
                    onChange={(e) => {
                      setTestingMethod(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Drive Thru Testing
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={driveThruTesting}
                    onChange={(e) => {
                      setDriveThruTesting(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Button className="submit" onClick={createPublicHealthFacility}>
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
                  title="Facility ID"
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
                <Button className="submit" onClick={deleteFacility}>
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
                  title="Facility ID"
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
                  <Dropdown.Item eventKey="Type">Type</Dropdown.Item>
                  <Dropdown.Item eventKey="Web Address">
                    Web Address
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Phone Number">
                    Phone Number
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Address ">Address </Dropdown.Item>
                  <Dropdown.Item eventKey="Name ">Name </Dropdown.Item>
                  <Dropdown.Item eventKey="Testing Method ">
                    Testing Method{" "}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Drive Thru Testing ">
                    Drive Thru Testing{" "}
                  </Dropdown.Item>
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
                  title="Facility ID"
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
                <Button className="submit" onClick={getFacilityInfo}>
                  Submit
                </Button>
              </Form.Group>
            </Form>
            <div >
            <span style={{ fontWeight: "bold" }}>Type:</span> &nbsp;{facility[0]}
              <br />
              <span style={{ fontWeight: "bold" }}>Web Address:</span>&nbsp;{facility[1]}
              <br />
              <span style={{ fontWeight: "bold" }}>Phone Number:</span>&nbsp;{facility[2]}
              <br />
              <span style={{ fontWeight: "bold" }}>Address:</span>&nbsp;{facility[3]}
              <br />
              <span style={{ fontWeight: "bold" }}>Name:</span>&nbsp;{facility[4]}
              <br />
              <span style={{ fontWeight: "bold" }}>Testing Method:</span>&nbsp;{facility[5]}
              <br />
              <span style={{ fontWeight: "bold" }}>Drive Thru Testing:</span>&nbsp;{facility[6]}
              <br />
            </div>
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Facility;
