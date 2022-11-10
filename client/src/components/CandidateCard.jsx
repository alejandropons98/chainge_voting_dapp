import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { VoteModal } from './VoteModal';

function CandidateCard(props) {

  const [modalShow, setModalShow] = useState(false);

  const mystyle = {
    width: '222px',
    height: '125px'
  };

  const mystyle2 = {
    width: '18rem',
    height: '28rem'
  };

  const mystyle3 = {
    position: 'absolute',
    bottom:10,
    left:110,

  };

  return (
    <Card style={mystyle2} border="primary" key = "{props.id}" className="bg-dark text-white">
      <Card.Img variant="top" src={props.image} style={mystyle} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.party}</Card.Text>
        <Card.Text>{props.degree}</Card.Text>
        <Card.Text>{props.id}</Card.Text>
        {/* <Button variant="primary" onClick={() => {vote(props.id)}}>Votar</Button> */}
        <Button style={mystyle3} variant="primary" onClick={() => setModalShow(true)}>Votar</Button>
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