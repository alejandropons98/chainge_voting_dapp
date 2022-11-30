import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../index.css'
import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import { useAuth } from "../context/authContext";

const VoteModal = (props) => {

    const { isLoggedIn, user } = useAuth();
    const [cedulaDatum, setCedulaDatum] = useState("Error")

    const handleClick = async () => {
        const docRef = doc(db, "usuarios", user.email);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        setCedulaDatum(userData.cedula)
        console.log(cedulaDatum)
        switch (props.params){
            case "Onlysiglas":
                console.log(props.params)
                props.voteFunction(props.candidateSiglas,cedulaDatum)
                break
            case "siglasEscuela":
                props.voteFunction(props.candidateSiglas, props.escuela,cedulaDatum)
                break
            case "siglasFacultad":
                props.voteFunction(props.candidateSiglas,props.facultad, cedulaDatum)
                break
            case "consejeroId":
                props.voteFunction(props.candidateCAId, cedulaDatum)
                break
       }
    };
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Seguro que quiere votar por el {props.votingType} <strong>{props.candidateName}</strong>?</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button id='botonModal' onClick={handleClick}>Votar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export { VoteModal };