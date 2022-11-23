import CandidateCardGrid from "../../components/CandidateCardGrid"
import { getJuntaFCECandidates, getCoordinacionFCECandidates, getCentroEstudiantesCandidates, getConsejoEscuelaCandidates, getConsejoFacultadCandidates, getConsejoAcademicoCandidates, voteCandidateJDFCE, voteCandidateCoordFCE   } from "../../funcs"
import { useEffect, useState } from "react";
import {db} from "../../utils/firebase-config.js"



const VotingPage = () => {

    const[refresh, setRefresh]=useState(true)
    const [pairsCE, setPairsCE] = useState([]);
    const [pairsCF, setPairsCF] = useState([]);
    const [pairsCEs, setPairsCEs] = useState([]);
    const[coordFCECandidates,setCoordFCECandidates]=useState([])
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
            setPairsCE(pairsArray);
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
          })
          .catch((error) => {
            console.log(error);
          });
      };


    const fetchCentroEstudiantesCandidates = async() => {
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
        // console.log(await getConsejoEscuelaCandidates())
        const newFCECandidates = (await getJuntaFCECandidates()).map((list,i) => (
            {"nombre": list[0], "siglas":list[1]}
        ));
        setJuntaFCECandidates(juntaFCECandidates.concat(newFCECandidates))

        const newCoordFCE = (await getCoordinacionFCECandidates()).map((list,i) => (
            {"nombre": list[0], "siglas":list[1]}
        ));
        setCoordFCECandidates(newCoordFCE)
    }


    useEffect(() => {
        if(!refresh) return
        setRefresh(false)
        fetchCandidates()
    }, [refresh,juntaFCECandidates, coordFCECandidates])

    return (
        <div style = {needSpace}>
            <h3>
                Candidatos a Junta Directiva FCE
                <CandidateCardGrid candidates={juntaFCECandidates} type="Junta Directiva" vote={voteCandidateJDFCE}/>
            </h3>
            <h3>
                Candidatos a Coordinacion FCE
                <CandidateCardGrid candidates={coordFCECandidates} type="Coordinacion FCE" vote={voteCandidateCoordFCE}/>
            </h3>
        </div>

    );
}

export { VotingPage }