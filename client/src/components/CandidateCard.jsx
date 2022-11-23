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
    height: '15rem'
  };

  const mystyle3 = {
    position: 'absolute',
    bottom:10,
    left:110,

  };

  return (
    <Card style={mystyle2} border="primary" key = "{props.id}" className="bg-dark text-white">
      <Card.Body>
        <Card.Title>{props.nombre}</Card.Title>
        <Card.Text>{props.siglas}</Card.Text>
        {/* <Button variant="primary" onClick={() => {vote(props.id)}}>Votar</Button> */}
        <Button style={mystyle3} variant="primary" onClick={() => setModalShow(true)}>Votar</Button>
        <VoteModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          candidateName = {props.nombre}
          candidateCentroEstudiante = {props.nombrePlancha}
          candidateSiglas = {props.siglas}
          votingType={props.type}
          voteFunction={props.vote}
          candidateCAId = {props.id}
          facultad = {props.facultad}
          escuela = {props.escuela}
          params = {props.params}
      />
      </Card.Body>
    </Card>
  );
}

export { CandidateCard };