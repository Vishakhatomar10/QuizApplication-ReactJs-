import { Col, ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Btn from '../../Components/Btn';

function Block(props) {
  return (
    <Col >
    <Card  style={{ width: '17rem', height: '370px', marginBottom:"30px" , padding:"10px",textAlign:"center" , border:"2px 2px solid black"  }}
      className="shadow  rounded ">
      <Card.Img variant="top"src={props.Image} style={{ width: '100%', height: '150px' }} />
      <Card.Body >
        <Card.Title>{props.title}</Card.Title>
        <Card.Text >
            A simple quiz about {props.title} 
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{props.number} Quiz</ListGroup.Item>
       
        <ListGroup.Item><Btn onClick={props.onClick} name="Start" /></ListGroup.Item>
      </ListGroup>
     
    </Card>
    </Col>
  );
}

export default Block;