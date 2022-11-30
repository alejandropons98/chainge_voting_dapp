import CandidateCardGrid from "../../components/CandidateCardGrid"
import { getJuntaFCECandidates, getCoordinacionFCECandidates, getCentroEstudiantesCandidates, getConsejoEscuelaCandidates, getConsejoFacultadCandidates, getConsejoAcademicoCandidates, voteCandidateJDFCE, voteCandidateCoordFCE,voteCandidateConsejoAcademico, voteCentroEstudiantes,voteCandidateConsejoEscuela, voteCandidateConsejoFacultad } from "../../funcs"
import { useEffect, useState } from "react";
import {db} from "../../utils/firebase-config.js"



const VotingPage = () => {

    const[refresh, setRefresh]=useState(true)
    const [pairsCE, setPairsCE] = useState([]);
    const [pairsCF, setPairsCF] = useState([]);
    const [pairsCEs, setPairsCEs] = useState([]);
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
            setPairsCE(pairsArray)
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
            setPairsCF(pairsArray);
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
            setPairsCEs(pairsArray);
            setConsejoEscuelaCandidates(pairsArray)
          })
          .catch((error) => {
            console.log(error);
          });
      };

    const fetchCentroEstudiantesCandidates = async() => {
        // No se me actualizaba el useState y mande la info de los candidatos por el fetch de arriba
        fetchPairsCE();
        for(let i = 0; i < pairsCE.length; i++){
            var candidato = await getCentroEstudiantesCandidates(pairsCE[i].siglas, pairsCE[i].escuela)
            console.log(candidato)
        }
    }
    const fetchConsejoFacultadCandidates = async() => {
        fetchPairsCF();
        for(let i = 0; i < pairsCF.length; i++){
            var candidato = await getConsejoFacultadCandidates(pairsCF[i].siglas, pairsCF[i].facultad)
            console.log(candidato)
        }
    }
    const fetchConsejoEscuelaCandidates = async() => {
        fetchPairsCEs();
        for(let i = 0; i < pairsCEs.length; i++){
            var candidato = await getConsejoEscuelaCandidates(pairsCEs[i].siglas, pairsCEs[i].escuela)
            console.log(candidato)
        }
    }

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
        setRefresh(false)
        fetchPairsCE()
        fetchPairsCF()
        // fetchPairsCA()
        fetchPairsCEs()
        // fetchCentroEstudiantesCandidates()
        fetchCandidates()
    }, [refresh,juntaFCECandidates, coordFCECandidates, centroEstudiantesCandidates, consejoEscuelaCandidates, consejoFacultadCandidates, consejoAcademico])

    return (
        <div style = {needSpace}>
            <h3 style={{color: "#0d6efd"}}>
                Candidatos a Junta Directiva FCE
                <CandidateCardGrid candidates={juntaFCECandidates} type="Junta Directiva" vote={voteCandidateJDFCE} params="Onlysiglas"/>
            </h3>
            <h3 style={{color: "#0d6efd"}}>
                Candidatos a Coordinacion FCE
                <CandidateCardGrid candidates={coordFCECandidates} type="Coordinacion FCE" vote={voteCandidateCoordFCE} params="Onlysiglas"/>
            </h3>
            <h3 style={{color: "#0d6efd"}}>
                Candidatos a Centro de Estudiantes
                <CandidateCardGrid candidates={centroEstudiantesCandidates} type="Centro de Estudiantes" vote={voteCentroEstudiantes} params="siglasEscuela"/>
            </h3>
            <h3 style={{color: "#0d6efd"}}>
                Candidatos a Consejero Academico
                <CandidateCardGrid candidates={consejoAcademico} type="Consejero Academico" vote={voteCandidateConsejoAcademico} params="consejeroId"/>
            </h3>
            <h3 style={{color: "#0d6efd"}}>
                Candidatos a Consejo de Facultad
                <CandidateCardGrid candidates={consejoFacultadCandidates} type="Consejo de Facultad" vote={voteCandidateConsejoFacultad} params="siglasFacultad" />
            </h3>
            <h3 style={{color: "#0d6efd"}}>
                Candidatos a Consejo de Escuela
                <CandidateCardGrid candidates={consejoEscuelaCandidates} type="Consejo Escuela" vote={voteCandidateConsejoEscuela} params="siglasEscuela" />
            </h3>
        </div>

    );
}

export { VotingPage }