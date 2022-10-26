import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CandidateCard } from './CandidateCard';

function CandidateCardGrid(props) {

  const candidates = props.candidates;

  return (
    <Row xs={1} md={2} className="g-4">
      {candidates.map((candidate) => (
        <Col key = {candidate.id}>
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