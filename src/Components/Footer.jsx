import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { FaRegCopyright } from "react-icons/fa6";
function Footer() {
  return (

 
      <Container fluid  className="bg-dark ">
        <Row className="pt-2">
          <p style={{ textAlign: "center", color: "white" }}><FaRegCopyright /> Quiz 2024. All Rights Reserved.</p>
        </Row>
      </Container>
  



  )
}

export default Footer