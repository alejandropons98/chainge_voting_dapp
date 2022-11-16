// SPDX-Licence-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./CandidateList.sol";
import "./StringCompare.sol";
import "./Votante.sol";

contract Eleccion {
    string nombre;
    address owner;



    CandidateList candidatos;

    constructor (string memory _nombre) {
        nombre = _nombre;
        owner = msg.sender;
    }

    

}