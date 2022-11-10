import { VotersList } from "../../components/VotersList";
import { useState, useEffect } from "react"
import { getActiveVoters } from "../../funcs";

const VotedVoters = () => {

    const [voters, setVoters] = useState([])
    const [refresh, setRefresh] = useState(true)

    const fetchVoters = async () => {
        const newVoters = await getActiveVoters()
        setVoters(newVoters)
    }

    useEffect(() => {
        if (!refresh) return
        setRefresh(false)
        fetchVoters()
    }, [refresh])

    return (
        <VotersList voters={voters}/>
    );
}

export { VotedVoters };