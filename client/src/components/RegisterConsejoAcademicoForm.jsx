import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { registerConsejoAcademico } from '../funcs'
import { Navigate, useNavigate } from "react-router-dom";

function RegisterConsejoAcademicoForm() {
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const nombreCA = e.target[0].value
        const carreraCA = e.target[1].value
        const id = 2 
    //Funcion que registra la consejos Academicos
    registerConsejoAcademico(nombreCA, carreraCA, id)
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
            <h2>Registro de Consejero Academico</h2>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Control type="input" placeholder="Nombre" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCarrera">
                <Form.Control type="input" placeholder="Carrera" />
            </Form.Group>
            <Button variant="primary" type="submit" className='mb-4'>
                Registrar
            </Button>
       </Form>
    )
}

export { RegisterConsejoAcademicoForm };