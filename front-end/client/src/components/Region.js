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

/* 4. */
const Region = () => {
  /* ALL REGION ID'S */
  const [allID, setAllID] = useState([]);

  const getAllRegionID = async () => {
    const response = await axios
      .get("/back-end/region/allRegionID.php")
      .catch((err) => console.log("Error", err));
    if (response && response.data) {
      console.log(response.data);
      setAllID(response.data);
    }
  };

  /* CREATE REGION */
  const [regionName, setRegionName] = useState("");
  const [alert, setAlert] = useState("");

  const [refreshDropdownCreate, setRefreshDropdownCreate] = useState(false);

  const createRegion = async () => {
    setRefreshDropdownCreate(!refreshDropdownCreate);
    let body = {
      regionName: regionName,
      alert: alert,
    };
    console.log(body);
    const response = await axios
      .post("back-end/region/createRegion.php", body)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /* DELETE REGION */
  const [deleteID, setDeleteID] = useState("");
  const [refreshDropdownDelete, setRefreshDropdownDelete] = useState(false);
  const handleSelectDeleteID = (e) => {
    setDeleteID(e);
  };
  const deleteRegion = async () => {
    console.log(deleteID);
    if (deleteID !== "") {
      setRefreshDropdownDelete(!refreshDropdownDelete);
      const response = await axios
        .post("/back-end/region/deleteRegion.php", deleteID)
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

  /* EDIT REGION */
  const [editRegionID, setEditRegionID] = useState("");
  const [editColumn, setEditColumn] = useState("");
  const [editChange, setEditChange] = useState("");
  const [alertResponse, setAlertResponse] = useState("");
  const handleSelectEditID = (e) => {
    setEditRegionID(e);
  };

  const handleSelectEditColumn = (e) => {
    setEditColumn(e);
  };

  const editRegion = async () => {
    setAlertResponse("");
    if (editRegionID !== "" && editColumn !== "" && editChange !== "") {
      let body = {
        editRegionID,
        editColumn,
        editChange,
      };
      console.log(body);
      const response = await axios
        .post("/back-end/region/editRegion.php", body)
        .then((response) => {
          if (response && response.data) {
            setAlertResponse(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  /* DISPLAY REGION */
  const [regionID, setRegionID] = useState("");
  const [region, setRegion] = useState([]);

  const getRegionInfo = async () => {
    if (regionID !== "") {
      const response = await axios
        .post("/back-end/region/displayRegion.php", regionID)
        .then((response) => {
          if (response && response.data) {
            console.log(response.data);
            setRegion(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSelectDisplayID = (e) => {
    setRegionID(e);
  };

  /* DISPLAY DROPDOWN ID'S */
  useEffect(() => {
    getAllRegionID();
  }, [refreshDropdownDelete, refreshDropdownCreate]);

  return (
    <div className="home">
      <div className="person-title">4.Region</div>
      <Tabs id="uncontrolled-tab-example">
        <Tab eventKey="Create" title="Create">
          <br />
          <Container style={{ maxWidth: "40%" }}>
            <Form>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Region Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={regionName}
                    onChange={(e) => {
                      setRegionName(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Alert
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={alert}
                    onChange={(e) => {
                      setAlert(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Button className="submit" onClick={createRegion}>
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
                  title="Region ID"
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
                <Button className="submit" onClick={deleteRegion}>
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
                  title="Region ID"
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
                  <Dropdown.Item eventKey="Region Name">
                    Region Name
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Alert ">
                    Alert 
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
                <Button onClick={editRegion} className="submit">
                  Submit
                </Button>
              </Form.Group>
            </Form>
            {alertResponse}
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
                  title="Region ID"
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
                <Button className="submit" onClick={getRegionInfo}>
                  Submit
                </Button>
              </Form.Group>
            </Form>
            <div>
              <span style={{ fontWeight: "bold" }}>Region Name:</span> &nbsp;
              {region[0]}
              <br />
              <span style={{ fontWeight: "bold" }}>Alert:</span>&nbsp;
              {region[1]}
              <br />
            </div>
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Region;
