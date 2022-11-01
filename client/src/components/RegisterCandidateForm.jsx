import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {load, getVoters, registerCandidate, getCandidates} from '../funcs'

function RegisterCandidateForm() {

  const noHayRegistros = [
    {
      id: 10,
      name: 'Monkey D. Luffy',
      party: 'Straw Hat Pirates',
      degree: 'Future King of the Pirates',
      image: 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2022/04/luffy-imagen-autor-slam-dunk.jpg?fit=1280%2C720&quality=80&ssl=1'
    },
    {
      id: 11,
      name: 'Trafalgar D. Water Law',
      party: 'Heart Pirates',
      degree: 'Surgeon of Death',
      image: 'https://www.geekmi.news/__export/1623595176216/sites/debate/img/2021/06/13/law1.jpg_375108060.jpg'
    },
    {
      id: 12,
      name: 'Eustass Kid',
      party: 'Kid Pirates',
      degree: 'Jaggy',
      image: 'https://staticg.sportskeeda.com/editor/2022/04/fc655-16489222173135-1920.jpg'
    },
    {
      id: 13,
      name: 'Marshall D. Teach',
      party: 'Blackbeard Pirates',
      degree: 'Blackbeard',
      image: 'https://sportshub.cbsistatic.com/i/2021/03/18/31419e70-d586-4b8e-a869-12e09c2ee16b/one-piece-blackbeard-1202711.jpg?width=1200'
    },
  ]
  
  const [count, setCount] = useState(0)
  const [registry, setRegistry] = useState(0)
  const [accounts, setAccounts] = useState([])
  const [voters, setVoters] = useState([])
  const [candidates, setCandidates] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e)
    const name = e.target[0].value
    const party = e.target[1].value
    const degree = e.target[2].value
    // await registerCandidate(name, degree, party)
    // const info = await getCandidates()
    // console.log(candidates)
  }




  return (
    <Form style={{width: '50vw', marginLeft: 'auto', marginRight: 'auto'}} className='ml' onSubmit={handleSubmit}>
        <br />
        <h2>Registra un candidato</h2>
        <Row>
            <Col className='m-2'>
      <Form.Group className="mb-3" controlId="formName">
        {/* <Form.Label>Name</Form.Label> */}
        <Form.Control type="input" placeholder="Nombre" />
      </Form.Group>
        </Col>
        <Col className='m-2'>
      <Form.Group className="mb-3" controlId="formParty">
        {/* <Form.Label>Bounty</Form.Label> */}
        <Form.Control type="input" placeholder="Partido" />
      </Form.Group>
        </Col>
        </Row>
      <Row>
        </Row>
      <Button variant="primary" type="submit" className='mb-4'>
        Registrar
      </Button>
    </Form>
  );
}

export { RegisterCandidateForm };