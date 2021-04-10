import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">VEC353_4</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/">Alerts</Nav.Link>
          <Nav.Link href="/">Other</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Navigation;
