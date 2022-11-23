import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { registerConsejoFacultad, registerConsejoEscuela } from '../funcs'
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';

function RegisterConsejoEstudiantilForm() {
    
    const [facultades, setFacultades] = useState(['Est. Juridicos y Politicos', 'Ciencias y Artes', 'Cs. Econ. y Sociales','Ingenieria'])
    const [facultadesSeleccionadas, setFacultadesSeleccionadas] = useState([])
    const [carrerasSeleccionadas, setCarrerasSeleccionadas] = useState([])
    const [newCarreras, setNewCarreras] = useState( new Set() )
    const [formValue, setFormValue] = useState({})

    const carrerasDict = {
        'Est. Juridicos y Politicos': ['Estudios Liberales', 'Derecho'],
        'Ciencias y Artes':['Educacion', 'Psicologia','Idiomas Modernos', 'Mate. Industrial'], 
        'Cs. Econ. y Sociales': ['Ciencias Administrativas', 'Economia','Contaduria Publica'],
        'Ingenieria': ['Ingenieria Quimica', 'Ingenieria de Produccion','Ingenieria Mecanica', 'Ingenieria Civil', 'Ingenieria Electrica', 'Ingenieria Sistemas']
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        facultadesSeleccionadas.map(async (facultad) => {
            await registerConsejoFacultad(formValue[facultad], formValue["siglas"+" "+facultad], facultad)
            await db.collection("pairsCF").add({
                facultad: formValue[facultad],
                siglas: formValue["siglas"]
            });
            carrerasSeleccionadas.map(async (carrera) => {
                await registerConsejoEscuela(formValue[carrera], formValue["siglas"+" "+carrera], carrera)
                await db.collection("pairsCEs").add({
                    escuela: formValue[carrera],
                    siglas: formValue["siglas"]
                });
            }) 
        })
    }

    const handleChange = ({target}) => {
        console.log(target.text)
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
    }

    return (
        <Form style={mystyle} className='ml' onSubmit={handleSubmit}>
            <>
                <h4>Consejo de Facultades</h4>
                <div>Indique el nombre y siglas del Participante a Consejo de las Facultades seleccionadas</div>
                <br/>
                <SplitButton key= 'Facultad' title='Facultades'>
                    {facultades.map((facultad) => (
                        <Dropdown.Item key= {facultad} title = {facultad} onClick={handleClick}>{facultad}</Dropdown.Item>
                    ))}
                </SplitButton>
                <br />
                {facultadesSeleccionadas.map((facultad)=>(
                    <Form.Group className = "facultades">
                        <br />
                        <Form.Control type="input" placeholder={facultad} name={facultad} key={"form" + facultad} onChange={handleChange}></Form.Control>
                        <br />
                        <Form.Control type = "input" name= {"siglas"+" "+facultad} placeholder = "Siglas" key= {"formSiglas" + facultad} onChange={handleChange}></Form.Control>
                    </Form.Group>
                ))} 
            </>
            <br />
            <>
                <h4>Consejo de Escuelas</h4>
                <div>Indique el nombre y siglas del Participante a Consejo de las Escuelas seleccionadas</div>
                <br/>
                <SplitButton key= 'Carrera' title='Carrera'>
                    {facultadesSeleccionadas.map((facultad,i) => (
                        carrerasDict[facultad].map((carrera) => (
                        <Dropdown.Item eventKey={i} key= {carrera} onClick={handleCarrera}>{carrera}</Dropdown.Item>
                        ))
                    ))}
                </SplitButton>
                <br />
                {carrerasSeleccionadas.map((carrera,i) => (
                    <Form.Group className = "carreras" >
                        <br />
                        <Form.Control type = "input" name= "{carrera}" placeholder = {carrera} key= {"form" + carrera} onChange={handleChange}></Form.Control>
                        <br />
                        <Form.Control type = "input" name= {"siglas"+" "+carrera} placeholder = "Siglas" key= {"formSiglas" + carrera} onChange={handleChange}></Form.Control>
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

export { RegisterConsejoEstudiantilForm };