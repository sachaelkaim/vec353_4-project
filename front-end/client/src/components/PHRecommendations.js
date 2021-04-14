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

/* 6. */
const PHRecommendations = () => {
  /* ALL RECOMMENDATION ID'S */
  const [allID, setAllID] = useState([]);

  const getAllRecommendationID = async () => {
    const response = await axios
      .get("/back-end/PHRecommendations/allID.php")
      .catch((err) => console.log("Error", err));
    if (response && response.data) {
      console.log(response.data);
      setAllID(response.data);
    }
  };

  /* CREATE A RECOMMENDATION */
  const [instruction, setInstruction] = useState("");

  const [refreshDropdownCreate, setRefreshDropdownCreate] = useState(false);

  const createRecommendation = async () => {
    setRefreshDropdownCreate(!refreshDropdownCreate);
    let body = {
        instruction: instruction
    };
    console.log(body);
    const response = await axios
      .post("/back-end/PHRecommendations/create.php", body)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /* DELETE A RECOMMENDATION */
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
        .post("/back-end/PHRecommendations/delete.php", deleteID)
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

  /* EDIT A RECOMMENDATION */
  const [editInformationID, setEditInformationID] = useState("");
  const [editChange, setEditChange] = useState("");

  const handleSelectEditID = (e) => {
    setEditInformationID(e);
  };

  const editGroup = async () => {
    if (editInformationID !== "" && editChange !== "") {
      let body = {
        editInformationID,
        editChange,
      };
      console.log(body);
      const response = await axios
        .post("/back-end/PHRecommendations/edit.php", body)
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

  /* DISPLAY ALL RECOMMENDATIONS */
  const [allRecommendations, setAllRecommendations] = useState([]);

  const getAllRecommendations = async () => {
      const response = await axios
        .get("/back-end/PHRecommendations/displayAll.php")
        .then((response) => {
          if (response && response.data) {
            console.log(response.data);
            setAllRecommendations(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const clear = async () => {
    setAllRecommendations([]);
  };

  /* DISPLAY DROPDOWN ID'S */
  useEffect(() => {
    getAllRecommendationID();
  }, [refreshDropdownDelete, refreshDropdownCreate]);

  return (
    <div className="home">
      <div className="person-title">6. PUBLIC HEALTH RECOMMENDATIONS</div>
      <Tabs id="uncontrolled-tab-example">
        <Tab eventKey="Create" title="Create">
          <br />
          <Container style={{ maxWidth: "40%" }}>
            <Form>
              <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                  Instruction
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={instruction}
                    onChange={(e) => {
                      setInstruction(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Button className="submit" onClick={createRecommendation}>
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
                  title="Instruction ID"
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
                  title="Instruction ID"
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
                <Button className="submit" onClick={getAllRecommendations}>
                  Submit
                </Button>
                &nbsp;
            <Button onClick={clear} className="submit">
              Clear
            </Button>
              </Form.Group>
            </Form>
            {allRecommendations.map((item) => (
          <div
            controlId=""
            key={item}
          >
           <div style={{textAlign: "left"}}>
              <span style={{ fontWeight: "bold" }}>ID:</span> &nbsp;
              {item[0]}
              <br />
              <span style={{ fontWeight: "bold" }}>Recommendation:</span>&nbsp;
              {item[1]}
              <br />
            </div>
            <br />
            <br />
          </div>
        ))}
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
};

export default PHRecommendations;