import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { registerVoter, registerNewId } from '../funcs'
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import { useState } from 'react';

function RegisterVoterForm() {

  const [facultades, setFacultades] = useState(['Est. Juridicos y Politicos', 'Ciencias y Artes', 'Cs. Econ. y Sociales','Ingenieria'])
  const [facultadesSeleccionadas, setFacultadesSeleccionadas] = useState([])
  const [carrerasSeleccionadas, setCarrerasSeleccionadas] = useState([])
  const [newCarreras, setNewCarreras] = useState(new Set())
  
  const carrerasDict = {
    'Est. Juridicos y Politicos': ['Estudios Liberales', 'Derecho'],
    'Ciencias y Artes':['Educacion', 'Psicologia','Idiomas Modernos', 'Mate. Industrial'], 
    'Cs. Econ. y Sociales': ['Ciencias Administrativas', 'Economia','Contaduria Publica'],
    'Ingenieria': ['Ing. Quimica', 'Ing. de Produccion','Ing. Mecanica', 'Ing. Civil', 'Ing. Electrica', 'Ing. Sistemas']
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = e.target[0].value
    await registerNewId(id)
    await registerVoter(id, facultadesSeleccionadas, carrerasSeleccionadas)
  }

  const handleClick = (e) => {
    e.preventDefault()
    const facultadSelect = e.target.text
    const newFacultades = facultades.filter((facultad) => facultadSelect != facultad)
    const newFacultadesSeleccionadas = facultades.filter((facultad) => facultadSelect == facultad)
    setFacultades(newFacultades)
    setFacultadesSeleccionadas(facultadesSeleccionadas.concat(newFacultadesSeleccionadas))
  }
  
  const handleCarrera = (e) => {
    e.preventDefault()
    const carreraSelect = e.target.text
    newCarreras.add(carreraSelect)
    const carrerasLista = [...newCarreras]
    setCarrerasSeleccionadas(carrerasLista)
  }

  const mystyle = {
    width: '50vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '#0d6efd solid',
    borderRadius: '50px',
    padding: '20px',
    // background: '#212529',
    color: 'white'
  }

  return (
    <Form style={mystyle} className='ml' onSubmit={handleSubmit}>
      <br />
      <h2>Registra un votante</h2>
      <br />
      <div>Cedula: </div>
      <Form.Group key = "CedulaForm">
        <Form.Control type="input" placeholder="Cedula" key = "CI"/>
      </Form.Group>
      <br />
      <>
        <div>Elige tu Facultad:
          <br/>
          <SplitButton key= 'Facultad' title='Facultades'>
            {facultades.map((facultad,i) => (
              <Dropdown.Item eventKey={i} key= {facultad} title = {facultad} onClick={handleClick}>{facultad}</Dropdown.Item>
              )
            )}
          </SplitButton>
          <br />
          <div>Tus facultades seleccionadas son: {facultadesSeleccionadas.map((facultad)=>(
            <div>{facultad}</div>
          ))} </div>
        </div>
      </>
      <br/>
      <>
        <div>Elige tu Carrera:
        <br/>
          <SplitButton key= 'Carrera' title='Carrera'>
              {facultadesSeleccionadas.map((facultad,i) => (
                carrerasDict[facultad].map((carrera) => (
                  <Dropdown.Item eventKey={i} key= {carrera} onClick = {handleCarrera}>{carrera}</Dropdown.Item>
                ))
              ))}
          </SplitButton>
          <br/>
          Carreras Seleccionadas:
          <br/>
          {carrerasSeleccionadas.map((carrera) => (
            <div>{carrera}</div>
          ))}
        </div>
      </>
      <Row>
      </Row>
      <br/>
      <Button variant="primary" type="submit" className='mb-4'>
        Registrar
      </Button>
    </Form>
  );
}

export { RegisterVoterForm };