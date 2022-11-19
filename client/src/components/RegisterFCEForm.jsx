import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {registerCandidateJDFCE, registerCandidateCCFCE, registerConsejoFacultad, registerConsejoEscuela} from '../funcs'
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';

function RegisterFCEForm() {
    
    const [facultades, setFacultades] = useState(['Est. Juridicos y Politicos', 'Ciencias y Artes', 'Cs. Econ. y Sociales','Ingenieria'])
    const [facultadesSeleccionadas, setFacultadesSeleccionadas] = useState([])
    const [carrerasSeleccionadas, setCarrerasSeleccionadas] = useState([])
    const [newCarreras, setNewCarreras] = useState( new Set() )
    const [formValue, setFormValue] = useState({})

    const carrerasDict = {
        'Est. Juridicos y Politicos': ['Estudios Liberales', 'Derecho'],
        'Ciencias y Artes':['Educacion', 'Psicologia','Idiomas Modernos', 'Mate. Industrial'], 
        'Cs. Econ. y Sociales': ['Ciencias Administrativas', 'Economia','Contaduria Publica'],
        'Ingenieria': ['Ing. Quimica', 'Ing. de Produccion','Ing. Mecanica', 'Ing. Civil', 'Ing. Electrica', 'Ing. Sistemas']
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await registerCandidateJDFCE(formValue["agrupacion"], formValue["siglas"])
        if (formValue["checkbox"] ="on") await registerCandidateCCFCE(formValue["agrupacion"], formValue["siglas"])
        
        facultadesSeleccionadas.map(async (facultad) => {
            await registerConsejoFacultad(formValue[facultad], formValue["siglas"], facultad)
            carrerasSeleccionadas.map(async (carrera) => {
                await registerConsejoEscuela(formValue[carrera], formValue["siglas"], carrera)
            }) 
        })
    }
//CLEEEEEEEEEEAN
    const handleChange = ({target}) => {
        setFormValue((prev) => {
            return {...prev, [target.name] : target.value}
        })
    }

    const handleCarrera = (e) => {
        e.preventDefault()
        const carreraSelect=e.target.text
        newCarreras.add(carreraSelect)
        const carrerasLista=[...newCarreras]
        console.log(newCarreras)
        setCarrerasSeleccionadas(carrerasLista)
    }

    const handleClick = (e) => {
        e.preventDefault()
        const facultadSelect = e.target.text
        const newFacultades = facultades.filter((facultad) => facultadSelect != facultad)
        const newFacultadesSeleccionadas = facultades.filter((facultad) => facultadSelect == facultad)
        setFacultades(newFacultades)
        setFacultadesSeleccionadas(facultadesSeleccionadas.concat(newFacultadesSeleccionadas))
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
            <Form.Group className="mb-3" controlid="formAgrup">
                <Form.Control type="input" key="Agrupacion" placeholder="Agrupacion" name="agrupacion" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlid="formSiglas">
                <Form.Control type="input" placeholder="Siglas" key="siglas" name="siglas" onChange={handleChange}/>
            </Form.Group>
            <Row/>
            <Form.Check type='checkbox' name="checkbox" key="checkbox" onChange={handleChange} label='Checkbox para agregar su junta a la Coordinacion de la FCE'>
            </Form.Check>
            <Row/>
            <>
                <h4>Facultades a participar</h4>
                <SplitButton key= 'Facultad' title='Facultades'>
                    {facultades.map((facultad,i) => (
                    <Dropdown.Item eventKey={i} key= {facultad} title = {facultad} onClick={handleClick}>{facultad}</Dropdown.Item>
                    ))}
                </SplitButton>
                <br />
                <div>Indique el nombre de cada Participante</div>
                {facultadesSeleccionadas.map((facultad)=>(
                    <Form.Group className = "facultades" controlid="formFacultades">
                        <br />
                        <Form.Control type="input" placeholder={facultad} name={facultad} key={facultad} onChange={handleChange}></Form.Control>
                    </Form.Group>
                ))} 
            </>
            <br />
            <>
                <h4>Carreras a Participar</h4>
                <SplitButton key= 'Carrera' title='Carrera'>
                    {facultadesSeleccionadas.map((facultad,i) => (
                        carrerasDict[facultad].map((carrera) => (
                        <Dropdown.Item eventKey={i} key= {carrera} onClick={handleCarrera}>{carrera}</Dropdown.Item>
                        ))
                    ))}
                </SplitButton>
                <br/>
                <div>Indique el nombre de cada Participante</div>
                {carrerasSeleccionadas.map((carrera) => (
                    <Form.Group className = "carreras" >
                        <br />
                        <Form.Control type = "input" name={carrera} placeholder = {carrera} key= {carrera} onChange={handleChange}></Form.Control>
                    </Form.Group>
                ))}
            </>
            <br/>
            <Button variant="primary" type="submit" className='mb-4'>
                Registrar
            </Button>
       </Form>
    )
}

export { RegisterFCEForm };