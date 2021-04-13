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

/* 1. */
const Person = () => {
  /* ALL PERSON ID'S */
  const [allID, setAllID] = useState([]);

  const getAllPeopleID = async () => {
    const response = await axios
      .get("/back-end/person/allID.php")
      .catch((err) => console.log("Error", err));
    if (response && response.data) {
      console.log(response.data);
      setAllID(response.data);
    }
  };

  /* CREATE PERSON */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [medicNumber, setMedicNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [telNumber, setTelNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [refreshDropdownCreate, setRefreshDropdownCreate] = useState(false);

  const createPerson = async () => {
    setRefreshDropdownCreate(!refreshDropdownCreate);
    let body = {
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      medicNumber: medicNumber,
      address: address,
      city: city,
      province: province,
      telNumber: telNumber,
      postalCode: postalCode,
      email: email,
      citizenship: citizenship,
    };
    console.log(body);
    const response = await axios
      .post("/back-end/person/createPerson.php", body)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /* DELETE PERSON */
  const [deleteID, setDeleteID] = useState("");
  const [refreshDropdownDelete, setRefreshDropdownDelete] = useState(false);
  const handleSelectDeleteID = (e) => {
    setDeleteID(e);
  };

  const deletePerson = async () => {
    if (deleteID !== "") {
      setRefreshDropdownDelete(!refreshDropdownDelete);
      const response = await axios
        .post("/back-end/person/deletePerson.php", deleteID)
        .catch((error) => {
          console.error(error);
        });
    }
  };

  /* EDIT PERSON */
  const [editPersonID, setEditPersonID] = useState("");
  const [editColumn, setEditColumn] = useState("");
  const [editChange, setEditChange] = useState("");

  const handleSelectEditID = (e) => {
    setEditPersonID(e);
  };

  const handleSelectEditColumn = (e) => {
    setEditColumn(e);
  };

  const editPerson = async () => {
    if (editPersonID !== "" && editColumn !== "" && editChange !== "") {
      let body = {
        editPersonID,
        editColumn,
        editChange,
      };
      console.log(body);
      const response = await axios
        .post("/back-end/person/editPerson.php", body)
        .catch((error) => {
          console.error(error);
        });
    }
  };

  /* DISPLAY PERSON */
  const [personID, setPersonID] = useState("");
  const [person, setPerson] = useState([]);

  const getPersonInfo = async () => {
    if (personID !== "") {
      const response = await axios
        .post("/back-end/person/displayPerson.php", personID)
        .then((response) => {
          if (response && response.data) {
            console.log(response.data);
            setPerson(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSelectDisplayID = (e) => {
    setPersonID(e);
  };

  /* DISPLAY DROPDOWN ID'S */
  useEffect(() => {
    getAllPeopleID();
  }, [refreshDropdownDelete, refreshDropdownCreate]);

  return (
    <div className="home">
      <div className="person-title">1.PERSON</div>
      <Tabs id="uncontrolled-tab-example">
        <Tab eventKey="Create" title="Create">
          <br />
          <Container style={{ maxWidth: "40%" }}>
            <Form>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  First Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Last Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  DoB
                </Form.Label>
                <Col sm="10">
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
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Medicare Number
                </Form.Label>
                <Col sm="10">
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
                  City
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Province
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Telephone Number
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={telNumber}
                    onChange={(e) => {
                      setTelNumber(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Postal Code
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={postalCode}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Email Address
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Citizenship
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={citizenship}
                    onChange={(e) => {
                      setCitizenship(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Button className="submit" onClick={createPerson}>
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
                  title="Person ID"
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
                  title="Person ID"
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
                  <Dropdown.Item eventKey="FirstName">FirstName</Dropdown.Item>
                  <Dropdown.Item eventKey="LastName">LastName</Dropdown.Item>
                  <Dropdown.Item eventKey="DoB">DoB</Dropdown.Item>
                  <Dropdown.Item eventKey="MedicareNum">
                    MedicareNum
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Address">Address</Dropdown.Item>
                  <Dropdown.Item eventKey="City">City</Dropdown.Item>
                  <Dropdown.Item eventKey="Province">Province</Dropdown.Item>
                  <Dropdown.Item eventKey="Telephone Number">
                    Telephone Number
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Postal Code">
                    Postal Code
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Email Address">
                    Email Address
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Citizenship">
                    Citizenship
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
                <Button onClick={editPerson} className="submit">
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
                  title="Person ID"
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
                <Button className="submit" onClick={getPersonInfo}>
                  Submit
                </Button>
              </Form.Group>
            </Form>
            <div>
              <span style={{ fontWeight: "bold" }}>First Name:</span> &nbsp;
              {person[0]}
              <br />
              <span style={{ fontWeight: "bold" }}>Last Name:</span>&nbsp;
              {person[1]}
              <br />
              <span style={{ fontWeight: "bold" }}>DoB:</span>&nbsp;
              {person[2]}
              <br />
              <span style={{ fontWeight: "bold" }}>MedicareNum:</span>&nbsp;
              {person[3]}
              <br />
              <span style={{ fontWeight: "bold" }}>Address:</span>&nbsp;
              {person[4]}
              <br />
              <span style={{ fontWeight: "bold" }}>City:</span>&nbsp;
              {person[5]}
              <br />
              <span style={{ fontWeight: "bold" }}>Province:</span>&nbsp;
              {person[6]}
              <br />
              <span style={{ fontWeight: "bold" }}>Telephone Num:</span>&nbsp;
              {person[7]}
              <br />
              <span style={{ fontWeight: "bold" }}>Postal Code:</span>&nbsp;
              {person[8]}
              <br />
              <span style={{ fontWeight: "bold" }}>Email:</span>&nbsp;
              {person[9]}
              <br />
              <span style={{ fontWeight: "bold" }}>Citizenship:</span>&nbsp;
              {person[10]}
              <br />
            </div>
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Person;
