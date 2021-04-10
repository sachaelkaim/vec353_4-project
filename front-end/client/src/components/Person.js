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

const Person = () => {
  /* ALL PERSON ID'S */
  const [allID, setAllID] = useState([]);

  const getAllPeopleID = async () => {
    const response = await axios
      .get("/person/allID.php")
      .catch((err) => console.log("Error", err));
    if (response && response.data) {
      console.log(response.data);
      setAllID(response.data);
    }
  };

  /* DELETE PERSON */
  const [deleteID, setDeleteID] = useState("");
  const [refreshDropdownDelete, setRefreshDropdownDelete] = useState(false);
  const handleSelectDeleteID = (e) => {
    setDeleteID(e);
  };

  const deletePerson = async () => {
    if(deleteID !== ""){
        setRefreshDropdownDelete(!refreshDropdownDelete);
        const response = await axios
      .post("/person/deletePerson.php", deleteID)
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
    if(editPersonID !== "" && editColumn !== "" && editChange !== ""){
    let body = {
      editPersonID,  
      editColumn,
      editChange,
    };
    console.log(body);
    const response = await axios
      .post("/person/editPerson.php", body)
      .catch((error) => {
        console.error(error);
      });
    }
  };

  /* DISPLAY PERSON */
  const [personID, setPersonID] = useState("");
  const [person, setPerson] = useState([]);

  const getPersonInfo = async () => {
    if(personID !== ""){
        const response = await axios
      .post("/person/displayPerson.php", personID)
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
  }, [refreshDropdownDelete]);

  return (
    <div className="home">
      <div className="person-title">PERSON</div>
      <Tabs id="uncontrolled-tab-example">
        <Tab eventKey="Create" title="Create">
          <div>asdasd</div>
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
                  <Dropdown.Item eventKey="MedicareNum">MedicareNum</Dropdown.Item>
                  <Dropdown.Item eventKey="Address">Address</Dropdown.Item>
                  <Dropdown.Item eventKey="City">City</Dropdown.Item>
                  <Dropdown.Item eventKey="Province">Province</Dropdown.Item>
                  <Dropdown.Item eventKey="Telephone Number">Telephone Number</Dropdown.Item>
                  <Dropdown.Item eventKey="Postal Code">Postal Code</Dropdown.Item>
                  <Dropdown.Item eventKey="Email Address">Email Address</Dropdown.Item>
                  <Dropdown.Item eventKey="Citizenship">Citizenship</Dropdown.Item>
                </DropdownButton>
                <Col sm="5">
                  <Form.Control
                    type="text"
                    placeholder="ID"
                    value={editChange}
                    onChange={(e) => {
                      setEditChange(e.target.value);
                    }}
                  />
                </Col>
                <Button onClick={editPerson} className="submit">Submit</Button>
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
            {person.map((item) => (
              <div key={item.FirstName} style={{ fontWeight: "bold" }}>
                {item}
              </div>
            ))}
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Person;
