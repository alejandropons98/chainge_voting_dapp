import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CandidateCard } from './CandidateCard';

function CandidateCardGrid(props) {

  const candidates = props.candidates
  const type = props.type
  const vote = props.vote
  const params = props.params
  const cedulaUser = props.cedulaUser
  const facultadesUser = props.facultadesUser
  const carrerasUser = props.carrerasUser
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
            siglas = {candidate.siglas}
            nombre = {candidate.nombre}
            nombrePlancha = {candidate.nombrePlancha}
            type = {type}
            vote = {vote}
            id = {candidate.id}
            escuela = {candidate.escuela}
            facultad = {candidate.facultad}
            params = {params}
            carrerasUser={carrerasUser}
            cedulaUser={cedulaUser}
            facultadesUser={facultadesUser}
          />
        </Col>
      ))}
    </Row>
  );
}

export default CandidateCardGrid;