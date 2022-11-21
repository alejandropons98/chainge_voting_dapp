import CandidateCardGrid from "../../components/CandidateCardGrid"
import { getJuntaFCECandidates, getCoordinacionFCECandidates, getCentroEstudiantesCandidates, getConsejoEscuelaCandidates, getConsejoFacultadCandidates, getConsejoAcademicoCandidates   } from "../../funcs"
import { useEffect, useState } from "react"
import { ElectionContract } from "../../abi/abi"


const VotingPage = () => {

    const [refresh, setRefresh] = useState(true)
    const [candidates, setCandidates] = useState([
        {
            id: 10,
            name: 'Monkey D. Luffy',
            party: 'Straw Hat Pirates',
            degree: 'Future King of the Pirates',
            image: 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2022/04/luffy-imagen-autor-slam-dunk.jpg?fit=1280%2C720&quality=80&ssl=1'
        },
        {
            id: 11,
            name: 'Trafalgar D. Water Law',
            party: 'Heart Pirates',
            degree: 'Surgeon of Death',
            image: 'https://www.geekmi.news/__export/1623595176216/sites/debate/img/2021/06/13/law1.jpg_375108060.jpg'
        },
        {
            id: 12,
            name: 'Eustass Kid',
            party: 'Kid Pirates',
            degree: 'Jaggy',
            image: 'https://staticg.sportskeeda.com/editor/2022/04/fc655-16489222173135-1920.jpg'
        },
        {
            id: 13,
            name: 'Marshall D. Teach',
            party: 'Blackbeard Pirates',
            degree: 'Blackbeard',
            image: 'https://sportshub.cbsistatic.com/i/2021/03/18/31419e70-d586-4b8e-a869-12e09c2ee16b/one-piece-blackbeard-1202711.jpg?width=1200'
        },
    ])

    const fetchCandidates = async () => {
        console.log(await getConsejoEscuelaCandidates())
        // console.log(await getCoordinacionFCECandidates())
        // console.log(await getJuntaFCECandidates())

    }

    useEffect(() => {
        if(!refresh) return
        setRefresh(false)
        fetchCandidates()

    }, [refresh,candidates])

    return (
        <CandidateCardGrid candidates={candidates} />
    );
}

export { VotingPage }