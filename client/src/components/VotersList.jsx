import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from "react"
import { getActiveVoters } from "../funcs"
import { ListGroupItem } from 'react-bootstrap';

const VotersList = (params) => {

    const voters = params.voters

    return (
        <ListGroup>
            {voters.map((voter) => (
                <ListGroupItem key={voter}>
                    {voter}
                </ListGroupItem>
            ))}
        </ListGroup>
    );
}

export { VotersList };