import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { VoteModal } from './VoteModal';

function CandidateCard(props) {

  const [modalShow, setModalShow] = useState(false);

  return (
    <Card style={{ width: '18rem' }} key = "{props.id}">
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.party}</Card.Text>
        <Card.Text>{props.degree}</Card.Text>
        <Card.Text>{props.id}</Card.Text>
        {/* <Button variant="primary" onClick={() => {vote(props.id)}}>Votar</Button> */}
        <Button variant="primary" onClick={() => setModalShow(true)}>Votar</Button>
        <VoteModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        candidateId = {props.id}
        candidateName = {props.name}
      />
      </Card.Body>
    </Card>
  );
}

export { CandidateCard };