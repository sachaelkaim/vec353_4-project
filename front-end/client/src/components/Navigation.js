import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">VEC353_4</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">1-6</Nav.Link>
          <Nav.Link href="/1">7-13</Nav.Link>
          <Nav.Link href="/2">14-17</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Navigation;
