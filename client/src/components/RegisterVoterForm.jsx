import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RegisterVoterForm() {
  return (
    <Form style={{width: '50vw', marginLeft: 'auto', marginRight: 'auto'}} className='ml'>
        <br />
        <h2>Registra un votante</h2>
        <Row>
            <Col className='m-2'>
      <Form.Group className="mb-3" controlId="formAddress">
        {/* <Form.Label>Name</Form.Label> */}
        <Form.Control type="input" placeholder="Wallet Address" />
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