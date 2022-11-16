import { Card } from "react-bootstrap";


function AuditVotesCard() {

return (
    <Card style={{ width: '40rem' }} >
        <Card.Body>
        <Card.Title>Votantes Registrados: "Numero"</Card.Title>
          <Card.Title>Votos Emitidos: "Numero"</Card.Title>
          <Card.Title>Votos No Emitidos: "Numero"</Card.Title>
          <Card.Text>
            Estadisticas de las Votaciones de Chainge
          </Card.Text>
        </Card.Body>
    </Card>
    )
}

export { AuditVotesCard };