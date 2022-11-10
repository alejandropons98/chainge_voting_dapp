import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {registerCandidate} from '../funcs'
import {useState} from 'react';
import { Navigate, useNavigate } from "react-router-dom";

function RegisterCandidateForm() {
  
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e)
    const name = e.target[0].value
    const party = e.target[1].value
    const degree = e.target[2].value
    await registerCandidate(name, degree, party)
    // console.log(candidates)
    navigate('/vote')
  }

  const mystyle = {
    width: '50vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '#0d6efd solid',
    borderRadius: '50px',
    padding: '20px',
    background: '#212529',
    color: 'white'
  };


  return (
    <Form style={mystyle} className='ml' onSubmit={handleSubmit}>
        <br />
        <h2>Registra un candidato</h2>
        {/* <Row>
            <Col className='m-2'> */}
      <Form.Group className="mb-3" controlId="formName">
        {/* <Form.Label>Name</Form.Label> */}
        <Form.Control type="input" placeholder="Nombre" />
      </Form.Group>
        {/* </Col> */}
        {/* <Col className='m-2'> */}
      <Form.Group className="mb-3" controlId="formParty">
        {/* <Form.Label>Bounty</Form.Label> */}
        <Form.Control type="input" placeholder="Partido" />
      </Form.Group>
        {/* </Col> */}
        {/* </Row> */}
      <Row>
        </Row>
      <Button variant="primary" type="submit" className='mb-4'>
        Registrar
      </Button>
    </Form>
  );
}

export { RegisterCandidateForm };