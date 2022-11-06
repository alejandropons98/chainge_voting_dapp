import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { registerVoter, getActiveVoters } from '../funcs'

function RegisterVoterForm() {

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e)
    const address = e.target[0].value
    const id = e.target[1].value
    const carrera = e.target[2].value
    await registerVoter(id, address, carrera)
    const voters = await getActiveVoters()
    console.log(voters)

  }

  return (
    <Form style={{ width: '50vw', marginLeft: 'auto', marginRight: 'auto' }} className='ml' onSubmit={handleSubmit}>
      <br />
      <h2>Registra un votante</h2>
      <Row>
        <Col className='m-2'>
          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Control type="input" placeholder="Wallet Address" />
          </Form.Group>
        </Col>
        <Col className='m-2'>
          <Form.Group className="mb-3" controlId="formId">
            <Form.Control type="input" placeholder="Correo" />
          </Form.Group>
        </Col>
        <Col className='m-2'>
          <Form.Group className="mb-3" controlId="formMajor">
            <Form.Control type="input" placeholder="Carrera" />
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

export { RegisterVoterForm };