import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CandidateCard } from './CandidateCard';

function CandidateCardGrid(props) {

  const candidates = props.candidates
  const type = props.type
  const vote = props.vote
  const mystyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    
  };

  const mystyle2 = {
    margin: '10px',
    marginTop: '20px'
  };
  
  return (
    <Row xs={1} md={2} className="g-4"  style={mystyle2}>
      {candidates.map((candidate,id) => (
        <Col key = {id} style={mystyle}>
          <CandidateCard 
          nombre = {candidate.nombre}
          siglas = {candidate.siglas}
          type = {type}
          vote = {vote}
          />
        </Col>
      ))}
    </Row>
  );
}

export default CandidateCardGrid;