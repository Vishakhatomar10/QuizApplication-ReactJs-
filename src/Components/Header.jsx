import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = (props) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ boxShadow: '2px 2px 10px rgb(255, 215, 194)' }}>
      <Container fluid >
        <Navbar.Brand href="#">
          <img
            src="https://cdn-icons-png.flaticon.com/256/5732/5732153.png"
            width="40"
            height="40"
            className="d-inline-block align-top ms-4 me-3"
            alt="Logo"
          />

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className=" justify-content-center">
          <Nav className="w-100" style={{ justifyContent: "space-around" }}>

            <Nav.Link href="/" style={{ color: "white" }}>Home</Nav.Link>
            <Nav.Link href="#" style={{ color: "white" }}>Courses</Nav.Link>
            <Nav.Link href="/login" style={{ color: "white" }}>Quiz</Nav.Link>
            <Nav.Link href="#" style={{ color: "white" }}>Contact Us</Nav.Link>
            <Nav.Link href="/aboutUs" style={{ color: "white" }}>About Us</Nav.Link>
            {props?.children}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;