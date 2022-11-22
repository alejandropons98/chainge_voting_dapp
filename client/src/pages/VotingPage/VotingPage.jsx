import CandidateCardGrid from "../../components/CandidateCardGrid"
import { getJuntaFCECandidates, getCoordinacionFCECandidates, getCentroEstudiantesCandidates, getConsejoEscuelaCandidates, getConsejoFacultadCandidates, getConsejoAcademicoCandidates, voteCandidateJDFCE, voteCandidateCoordFCE   } from "../../funcs"
import { useEffect, useState } from "react"


const VotingPage = () => {

    const[refresh, setRefresh]=useState(true)
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