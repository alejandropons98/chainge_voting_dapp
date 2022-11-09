import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { vote } from '../funcs';
import '../index.css'

const VoteModal = (props) => {
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
                    Confirmacion de voto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Seguro que quiere votar por <strong>{props.candidateName}</strong>?</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {vote(props.candidateId)}} id='botonModal'>Votar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export { VoteModal };