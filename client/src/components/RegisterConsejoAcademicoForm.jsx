import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerConsejoAcademico } from '../funcs'
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react"
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { db } from '../utils/firebase-config.js'

function RegisterConsejoAcademicoForm() {
    
    const [carreraSeleccionada, setCarreraSeleccionada] = useState("Carrera")
    const carreras = ['Estudios Liberales', 'Derecho','Educacion', 'Psicologia','Idiomas Modernos','Mate. Industrial', 'Ciencias Administrativas', 'Economia','Contaduria Publica','Ingenieria Quimica', 'Ingenieria de Produccion','Ingenieria Mecanica', 'Ingenieria Civil', 'Ingenieria Electrica', 'Ingenieria Sistemas']  
    
    const handleCarrera = (e) => {
        e.preventDefault()
        setCarreraSeleccionada(e.target.text)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const id = e.target[0].value
        const nombreCA = e.target[1].value
        await registerConsejoAcademico(nombreCA, carreraSeleccionada, id)
        await db.collection("pairsCA").add({
            nombre: nombreCA,
            escuela: carreraSeleccionada,
            id: id
        });
    }

    const mystyle = {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '#0d6efd solid',
        borderRadius: '50px',
        padding: '20px',
        // background: '#212529',
        color: 'white'
      };
    
    return (
        <Form style={mystyle} className='ml' onSubmit={handleSubmit}>
            <br />
            <h2>Registro de Consejero Academico</h2>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Control type="input" placeholder="Cedula" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Control type="input" placeholder="Nombre" />
            </Form.Group>
            <SplitButton key= 'Carrera' title={carreraSeleccionada}>
                {carreras.map((carrera) => (
                    <Dropdown.Item key= {carrera} onClick={handleCarrera}>{carrera}</Dropdown.Item>
                ))}
            </SplitButton>
            <br />
            <br />
            <Button variant="primary" type="submit" className='mb-4'>
                Registrar
            </Button>
            <br />
       </Form>
    )
}

export { RegisterConsejoAcademicoForm };