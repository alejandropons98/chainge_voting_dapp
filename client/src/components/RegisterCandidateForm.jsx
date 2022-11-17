import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {registerCandidateJDFCE, registerCandidateCCFCE, registerConsejoAcademico, registerConsejoFacultad, registerConsejoEscuela} from '../funcs'
import { Navigate, useNavigate } from "react-router-dom";

function RegisterCandidateForm() {
  
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e)
    const agrupacion = e.target[0].value
    const siglas = e.target[1].value
    //Funcion que registra la junta Directiva FCE
    registerCandidateJDFCE(agrupacion, siglas)

    const agrupacionCCFCE = e.target[2].value
    const siglasCCFE = e.target[3].value
    //Funcion que registra la Candidato de coordinacion FCE
    registerCandidateCCFCE(agrupacionCCFCE, siglasCCFE)

    const nombreCA1 = e.target[4].value
    const carreraCA1 = e.target[5].value
    const id1 = 1 
    //Funcion que registra la consejos Academicos
    registerConsejoAcademico(nombreCA1, carreraCA1, id1)

    const nombreCFac = e.target[8].value
    const siglasCFac = e.target[9].value
    const facultadCFac = e.target[10].value
    //Funcion que registra Consejo de facultad
    registerConsejoFacultad(nombreCFac, siglasCFac, facultadCFac)

    const nombreCEsc = e.target[11].value
    const siglasCEsc = e.target[12].value
    const escuelaCEsc = e.target[13].value
    //Funcion que registra Consejo de Escuela
    registerConsejoFacultad(nombreCEsc, siglasCEsc, escuelaCEsc)
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
        <h2>Registro de Junta Directiva FCE</h2>
        {/* <Row>
            <Col className='m-2'> */}
      <Form.Group className="mb-3" controlId="formAgrup">
        {/* <Form.Label>Name</Form.Label> */}
        <Form.Control type="input" placeholder="Agrupacion" />
      </Form.Group>
        {/* </Col> */}
        {/* <Col className='m-2'> */}
      <Form.Group className="mb-3" controlId="formSiglas">
        {/* <Form.Label>Bounty</Form.Label> */}
        <Form.Control type="input" placeholder="Siglas" />
      </Form.Group>
        {/* </Col> */}
        {/* </Row> */}
      <Row>
        </Row>
      <br />
        <h2>Registro de Candidato de Coordinacion FCE</h2>
        {/* <Row>
            <Col className='m-2'> */}
      <Form.Group className="mb-3" controlId="formAgrup">
        {/* <Form.Label>Name</Form.Label> */}
        <Form.Control type="input" placeholder="Agrupacion" />
      </Form.Group>
        {/* </Col> */}
        {/* <Col className='m-2'> */}
      <Form.Group className="mb-3" controlId="formSiglas">
        {/* <Form.Label>Bounty</Form.Label> */}
        <Form.Control type="input" placeholder="Siglas" />
      </Form.Group>
        {/* </Col> */}
        {/* </Row> */}
      <Row>
        </Row>
      <br />
        <h2>Registro de Consejo de Facultad</h2>
        {/* <Row>
            <Col className='m-2'> */}
      <Form.Group className="mb-3" controlId="formName">
        {/* <Form.Label>Name</Form.Label> */}
        <Form.Control type="input" placeholder="Nombre" />
      </Form.Group>
        {/* </Col> */}
        {/* <Col className='m-2'> */}
      <Form.Group className="mb-3" controlId="formSiglas">
        {/* <Form.Label>Bounty</Form.Label> */}
        <Form.Control type="input" placeholder="Siglas" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFacultad">
        {/* <Form.Label>Bounty</Form.Label> */}
        <Form.Control type="input" placeholder="Facultad" />
      </Form.Group>
      <br />
        <h2>Registro de Consejo de Escuela</h2>
        {/* <Row>
            <Col className='m-2'> */}
      <Form.Group className="mb-3" controlId="formName">
        {/* <Form.Label>Name</Form.Label> */}
        <Form.Control type="input" placeholder="Nombre" />
      </Form.Group>
        {/* </Col> */}
        {/* <Col className='m-2'> */}
      <Form.Group className="mb-3" controlId="formSiglas">
        {/* <Form.Label>Bounty</Form.Label> */}
        <Form.Control type="input" placeholder="Siglas" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEscuela">
        {/* <Form.Label>Bounty</Form.Label> */}
        <Form.Control type="input" placeholder="Escuela" />
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