// SPDX-Licence-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./CandidateList.sol";
import "./StringCompare.sol";
import "./ListaVotantes.sol";


contract Eleccion {
    string nombre;
    address owner;



    CandidateList candidatos = new CandidateList();
    ListaVotantes votantes = new ListaVotantes();

    constructor () {
        owner = msg.sender;
    }

    function agregarIDARegistro(uint _id) public {
        votantes.addIDARegistro(_id);
    }

    function agregarVotante(uint _id, string[] memory _carreras) public {
        votantes.registrarVotante(_id, _carreras);
    }

    function getVotante(uint _id) public view returns (Votante) {
        return votantes.getVotante(_id);
    }

    function agregarCandidatoConsejoAcademico(string memory _nombre, uint _id, string memory _carrera) public {
        candidatos.addCandidateConsejoAcademico(_nombre, _id, _carrera);
    }

    function getCandidateConsejoAcademico(uint _id) public view returns (string memory, uint, string memory, uint) {
        return candidatos.getCandidateConsejoAcademico(_id);
    }

    function voteCandidateConsejoAcademico(uint _id, uint _voterID) public {
        candidatos.voteConsejoAcademico(_id);
        votantes.getVotante(_voterID).votarConsejoAcademico();
    }


    function agregarCandidatoJuntaDirectivaFCE(string memory _agrupacion, string memory _siglas) public {
        candidatos.addCandidateJuntaDirectivaFCE(_agrupacion, _siglas);
    }

    function getCandidateJuntaDirectivaFCE(string memory _siglas) public view returns (string memory, string memory, uint) {
        return candidatos.getCandidateJuntaDirectivaFCE(_siglas);
    }

    function voteCandidateJuntaDirectivaFCE(string memory _siglas, uint _voterID) public {
        candidatos.voteJuntaDirectivaFCE(_siglas);
        votantes.getVotante(_voterID).votarJuntaDirectivaFCE();
    }

    function agregarCandidatoCoordinacionFCE(string memory _agrupacion, string memory _siglas) public {
        candidatos.addCandidateCoordinacionFCE(_agrupacion, _siglas);
    }

    function getCandidatoCoordinacionFCE(string memory _siglas) public view returns (string memory, string memory, uint) {
        return candidatos.getCandidateCoordinacionFCE(_siglas);
    }

    function voteCandidateCoordinacionFCE(string memory _siglas, uint _voterID) public {
        candidatos.voteCoordinacionFCE(_siglas);
        votantes.getVotante(_voterID).votarCoordinacionFCE();
    }

    function agregarCandidatoCentroEstudiantes(string memory _nombre, string memory _siglas, string memory _escuela) public {
        candidatos.addCandidateCentroEstudiantes(_nombre, _siglas, _escuela);
    }

    function getCandidatoCentroEstudiantes(string memory _siglas, string memory _escuela) public view returns (string memory, string memory, string memory, uint) {
        return candidatos.getCandidateCentroEstudiantes(_siglas, _escuela);
    }

    function voteCandidateCentroEstudiantes(string memory _siglas, string memory _escuela, uint _voterID) public {
        candidatos.voteCentroEstudiantes(_siglas, _escuela);
        votantes.getVotante(_voterID).votarCentroEstudiantes();
    }

    function agregarCandidatoConsejoEscuela(string memory _nombre, string memory _siglas, string memory _escuela) public {
        candidatos.addCandidateConsejoEscuela(_nombre, _siglas, _escuela);
    }

    function getCandidatoConsejoEscuela(string memory _siglas, string memory _escuela) public view returns (string memory, string memory, string memory, uint) {
        return candidatos.getCandidateConsejoEscuela(_siglas, _escuela);
    }

    function voteCandidateConsejoEscuela(string memory _siglas, string memory _escuela, uint _voterID) public {
        candidatos.voteConsejoEscuela(_siglas, _escuela);
        votantes.getVotante(_voterID).votarConsejoEscuela();
    }

    function agregarCandidatoConsejoFacultad(string memory _nombre, string memory _siglas, string memory _facultad) public {
        candidatos.addCandidateConsejoFacultad(_nombre, _siglas, _facultad);
    }

    function getCandidatoConsejoFacultad(string memory _siglas, string memory _facultad) public view returns (string memory, string memory, string memory, uint) {
        return candidatos.getCandidateConsejoFacultad(_siglas, _facultad);
    }

    function voteCandidateConsejoFacultad(string memory _siglas, string memory _facultad, uint _voterID) public {
        candidatos.voteConsejoFacultad(_siglas, _facultad);
        votantes.getVotante(_voterID).votarConsejoFacultad();
    }


}