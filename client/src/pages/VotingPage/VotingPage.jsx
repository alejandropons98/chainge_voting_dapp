import CandidateCardGrid from "../../components/CandidateCardGrid"
import { getJuntaFCECandidates, getVoterInfo, getCoordinacionFCECandidates, getCentroEstudiantesCandidates, getConsejoEscuelaCandidates, getConsejoFacultadCandidates, getConsejoAcademicoCandidates, voteCandidateJDFCE, voteCandidateCoordFCE,voteCandidateConsejoAcademico, voteCentroEstudiantes,voteCandidateConsejoEscuela, voteCandidateConsejoFacultad } from "../../funcs"
import { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase-config";
import { useAuth } from "../../context/authContext";


const VotingPage = () => {
  const { isLoggedIn, user, loading } = useAuth();

  const[refresh, setRefresh]=useState(true)
  const[cedulaUser, setCedulaUser]=useState("")
  const[facultadesUser, setFacultadesUser]=useState([])
  const[carrerasUser, setCarrerasUser] = useState([])
  const[coordFCECandidates,setCoordFCECandidates]=useState([])
  const[consejoEscuelaCandidates,setConsejoEscuelaCandidates]=useState([])
  const[consejoFacultadCandidates,setConsejoFacultadCandidates]=useState([])
  const[centroEstudiantesCandidates,setCentroEstudiantesCandidates]=useState([])
  const[consejoAcademico,setConsejoAcademico]=useState([])
  const[juntaFCECandidates,setJuntaFCECandidates]=useState([
    {
      nombre: 'Monkey D. Luffy',
      siglas: 'Straw Hat Pirates',
    },
    {
      nombre: 'Trafalgar D. Water Law',
      siglas: 'Heart Pirates',
    },
    {
      nombre: 'Eustass Kid',
      siglas: 'Kid Pirates',
    },
    {
      nombre: 'Marshall D. Teach',
      siglas: 'Blackbeard Pirates',
    },
  ])

  const getDataVoter = async() => {

    const docRef = doc(db, "usuarios", user.correo);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    const userDatum = await getVoterInfo(userData.cedula)
    const facultades = []
    const carreras = []
    userDatum[1].map((data) => {
      facultades.push(data)
    })
    userDatum[2].map((data) => {
      carreras.push(data)
    })
    setCedulaUser(userDatum[0])
    setFacultadesUser(facultades)
    setCarrerasUser(carreras)
    
  }
   
  const needSpace = {
    marginTop:"3rem"
  }

  const fetchPairsCE = () => {
    const pairs = db.collection("pairsCE");
    pairs
      .get()
      .then((data) => {
        const pairsArray = [];
        data.docs.forEach((element) => {
          const pair = { ...element.data() };
          pairsArray.push(pair);
        });
        setCentroEstudiantesCandidates(pairsArray)
      })
      .catch((error) => {
        console.log(error);
      });
  };
      
  const fetchPairsCF = () => {
    const pairs = db.collection("pairsCF");
    pairs
      .get()
      .then((data) => {
        const pairsArray = [];
        data.docs.forEach((element) => {
          const pair = { ...element.data() };
          pairsArray.push(pair);
        });
        setConsejoFacultadCandidates(pairsArray)
      })  
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPairsCEs = () => {
    const pairs = db.collection("pairsCEs");
    pairs
      .get()
      .then((data) => {
        const pairsArray = [];
        data.docs.forEach((element) => {
          const pair = { ...element.data() };
          pairsArray.push(pair);
        });
        setConsejoEscuelaCandidates(pairsArray)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCandidates = async () => {
    const newFCECandidates = (await getJuntaFCECandidates()).map((list,i) => (
      {"nombre": list[0], "siglas":list[1]}
    ));
    setJuntaFCECandidates(juntaFCECandidates.concat(newFCECandidates))

    const newCoordFCE = (await getCoordinacionFCECandidates()).map((list,i) => (
      {"nombre": list[0], "siglas":list[1]}
    ));
    setCoordFCECandidates(newCoordFCE)
    const newConsejoAcademico = (await getConsejoAcademicoCandidates()).map((list,i) => (
      {"nombre": list[0], "id":list[1], "escuela":list[2] }
    ));
    setConsejoAcademico(newConsejoAcademico)
  }

  useEffect(() => {
      if(!refresh) return
      if(loading) return
      setRefresh(false)
      fetchPairsCE()
      fetchPairsCF()
      fetchPairsCEs()
      fetchCandidates()
      getDataVoter()
      // fetchPairsCA()
      // fetchCentroEstudiantesCandidates()
  }, [loading, refresh, carrerasUser, facultadesUser, cedulaUser, juntaFCECandidates, coordFCECandidates, centroEstudiantesCandidates, consejoEscuelaCandidates, consejoFacultadCandidates, consejoAcademico])

  return (
      <div style = {needSpace}>
          <h3 style={{color: "#0d6efd"}}>
              Candidatos a Junta Directiva FCE
              <CandidateCardGrid candidates={juntaFCECandidates} type="Junta Directiva" vote={voteCandidateJDFCE} params="Onlysiglas" cedulaUser={cedulaUser} carrerasUser={carrerasUser} facultadesUser={facultadesUser}/>
          </h3>
          <h3 style={{color: "#0d6efd"}}>
              Candidatos a Coordinacion FCE
              <CandidateCardGrid candidates={coordFCECandidates} type="Coordinacion FCE" vote={voteCandidateCoordFCE} params="Onlysiglas" cedulaUser={cedulaUser} carrerasUser={carrerasUser} facultadesUser={facultadesUser}/>
          </h3>
          <h3 style={{color: "#0d6efd"}}>
              Candidatos a Centro de Estudiantes
              <CandidateCardGrid candidates={centroEstudiantesCandidates} type="Centro de Estudiantes" vote={voteCentroEstudiantes} params="siglasEscuela" cedulaUser={cedulaUser} carrerasUser={carrerasUser} facultadesUser={facultadesUser}/>
          </h3>
          <h3 style={{color: "#0d6efd"}}>
              Candidatos a Consejero Academico
              <CandidateCardGrid candidates={consejoAcademico} type="Consejero Academico" vote={voteCandidateConsejoAcademico} params="consejeroId"/>
          </h3>
          <h3 style={{color: "#0d6efd"}}>
              Candidatos a Consejo de Facultad
              <CandidateCardGrid candidates={consejoFacultadCandidates} type="Consejo de Facultad" vote={voteCandidateConsejoFacultad} params="siglasFacultad" cedulaUser={cedulaUser} carrerasUser={carrerasUser} facultadesUser={facultadesUser}/>
          </h3>
          <h3 style={{color: "#0d6efd"}}>
              Candidatos a Consejo de Escuela
              <CandidateCardGrid candidates={consejoEscuelaCandidates} type="Consejo Escuela" vote={voteCandidateConsejoEscuela} params="siglasEscuela" cedulaUser={cedulaUser} carrerasUser={carrerasUser} facultadesUser={facultadesUser}/>
          </h3>
      </div>

  );
}


export { VotingPage }