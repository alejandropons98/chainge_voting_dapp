import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {registerCandidateJDFCE, registerCandidateCCFCE, registerConsejoAcademico, registerConsejoFacultad, registerConsejoEscuela} from '../funcs'
import { Navigate, useNavigate } from "react-router-dom";

function RegisterFCEForm() {
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const agrupacion = e.target[0].value
        const siglas = e.target[1].value
        //Funcion que registra la junta Directiva FCE
        registerCandidateJDFCE(agrupacion, siglas)
        registerCandidateCCFCE(agrupacion, siglas)

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
            <Button variant="primary" type="submit" className='mb-4'>
                Registrar
            </Button>
       </Form>
    )
}

export { RegisterFCEForm };