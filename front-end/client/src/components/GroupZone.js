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

/* 5. */
const GroupZone = () => {
  /* ALL GROUP ZONE ID'S */
  const [allID, setAllID] = useState([]);

  const getAllGroupID = async () => {
    const response = await axios
      .get("/back-end/groupZone/allGroupID.php")
      .catch((err) => console.log("Error", err));
    if (response && response.data) {
      console.log(response.data);
      setAllID(response.data);
    }
  };

  /* CREATE GROUP ZONE */
  const [zoneName, setZoneName] = useState("");
  const [zoneAddress, setZoneAddress] = useState("");
  const [zoneDescription, setZoneDescription] = useState("");

  const [refreshDropdownCreate, setRefreshDropdownCreate] = useState(false);

  const createGroupZone = async () => {
    setRefreshDropdownCreate(!refreshDropdownCreate);
    let body = {
      zoneName: zoneName,
      zoneAddress: zoneAddress,
      zoneDescription: zoneDescription,
    };
    console.log(body);
    const response = await axios
      .post("back-end/groupZone/createGroup.php", body)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /* DELETE GROUP ZONE */
  const [deleteID, setDeleteID] = useState("");
  const [refreshDropdownDelete, setRefreshDropdownDelete] = useState(false);
  const handleSelectDeleteID = (e) => {
    setDeleteID(e);
  };
  const deleteGroup = async () => {
    console.log(deleteID);
    if (deleteID !== "") {
      setRefreshDropdownDelete(!refreshDropdownDelete);
      const response = await axios
        .post("/back-end/groupZone/deleteGroup.php", deleteID)
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

  /* EDIT GROUP ZONE */
  const [editGroupID, setEditGroupID] = useState("");
  const [editColumn, setEditColumn] = useState("");
  const [editChange, setEditChange] = useState("");

  const handleSelectEditID = (e) => {
    setEditGroupID(e);
  };

  const handleSelectEditColumn = (e) => {
    setEditColumn(e);
  };

  const editGroup = async () => {
    if (editGroupID !== "" && editColumn !== "" && editChange !== "") {
      let body = {
        editGroupID,
        editColumn,
        editChange,
      };
      console.log(body);
      const response = await axios
        .post("/back-end/groupZone/editGroup.php", body)
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

  /* DISPLAY GROUP ZONE */
  const [groupID, setGroupID] = useState("");
  const [groupZone, setGroupZone] = useState([]);

  const getGroupZoneInfo = async () => {
    if (groupID !== "") {
      const response = await axios
        .post("/back-end/groupZone/displayGroup.php", groupID)
        .then((response) => {
          if (response && response.data) {
            console.log(response.data);
            setGroupZone(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSelectDisplayID = (e) => {
    setGroupID(e);
  };

  /* DISPLAY DROPDOWN ID'S */
  useEffect(() => {
    getAllGroupID();
  }, [refreshDropdownDelete, refreshDropdownCreate]);

  return (
    <div className="home">
      <div className="person-title">5. GROUP ZONE</div>
      <Tabs id="uncontrolled-tab-example">
        <Tab eventKey="Create" title="Create">
          <br />
          <Container style={{ maxWidth: "40%" }}>
            <Form>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Zone Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={zoneName}
                    onChange={(e) => {
                      setZoneName(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Zone Address
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={zoneAddress}
                    onChange={(e) => {
                      setZoneAddress(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Zone Description
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={zoneDescription}
                    onChange={(e) => {
                      setZoneDescription(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Button className="submit" onClick={createGroupZone}>
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
                  title="Group Zone ID"
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
                <Button className="submit" onClick={deleteGroup}>
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
                  title="Group Zone ID"
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
                  <Dropdown.Item eventKey="Zone Name">
                    {" "}
                    GroupZone Name{" "}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Zone Address">
                    {" "}
                    GroupZone Address{" "}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Zone Description">
                    {" "}
                    GroupZone Description{" "}
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
                <Button onClick={editGroup} className="submit">
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
                  title="Group Zone ID"
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
                <Button className="submit" onClick={getGroupZoneInfo}>
                  Submit
                </Button>
              </Form.Group>
            </Form>
            <div>
              <span style={{ fontWeight: "bold" }}>Group Zone Name:</span>{" "}
              &nbsp;
              {groupZone[0]}
              <br />
              <span style={{ fontWeight: "bold" }}>Group Zone Address:</span>
              &nbsp;
              {groupZone[1]}
              <br />
              <span style={{ fontWeight: "bold" }}>
                Group Zone Description:
              </span>
              &nbsp;
              {groupZone[2]}
              <br />
            </div>
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
};

export default GroupZone;
