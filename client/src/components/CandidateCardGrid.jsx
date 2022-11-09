import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CandidateCard } from './CandidateCard';

function CandidateCardGrid(props) {

  const candidates = props.candidates;
  console.log("Grid " + candidates.length);

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
      {candidates.map((candidate) => (
        <Col key = {candidate.id} style={mystyle}>
          <CandidateCard 
          name = {candidate.name}
          party = {candidate.party}
          degree = {candidate.degree}
          image = {candidate.image}
          id = {candidate.id}
          />
        </Col>
      ))}
    </Row>
  );
}

export default CandidateCardGrid;