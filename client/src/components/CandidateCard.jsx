import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { vote } from '../funcs';

function CandidateCard(props) {
  return (
    <Card style={{ width: '18rem' }} key = "{props.id}">
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.party}</Card.Text>
        <Card.Text>{props.degree}</Card.Text>
        <Card.Text>{props.id}</Card.Text>
        <Button variant="primary" onClick={() => {vote(props.id)}}>Votar</Button>
      </Card.Body>
    </Card>
  );
}

export { CandidateCard };