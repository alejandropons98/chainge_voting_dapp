// SPDX-Licence-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Candidate.sol";


contract CandidateList {
    address public owner;
    
    mapping (uint => ConsejoAcademico) public candidatosConsejoAcademico;
    mapping (string => JuntaDirectivaFCE) public candidatosJuntaFCE;
    mapping (string => CoordinacionFCE) public candidatosCoordinacionFCE;
    mapping (string => mapping (string => CentroEstudiantes)) public candidatosCentroEstudiantes;
    mapping (string => mapping (string => ConsejoEscuela)) public candidatosConsejoEscuela;
    mapping (string => mapping (string => ConsejoFacultad)) public candidatosConsejoFacultad;

    constructor () {
        owner = msg.sender;
    }
    // address[] public candidatosConsejoAcademicoAccts;
    // address[] public candidatosFCEAccts;
    // address[] public candidatosCentroEstudiantesAccts;
    // address[] public candidatosConsejoEscuelaAccts;
    // address[] public candidatosConsejoFacultadAccts;

    function addCandidateConsejoAcademico(string memory _name, uint _id, string memory _carrera) public {
        ConsejoAcademico candidate = new ConsejoAcademico(_name, _id, _carrera);
        candidatosConsejoAcademico[_id] = candidate;
    }

    function getCandidateConsejoAcademico(uint _id) public view returns (string memory, uint, string memory, uint) {
        return (candidatosConsejoAcademico[_id].name(), candidatosConsejoAcademico[_id].id(), candidatosConsejoAcademico[_id].carrera(), candidatosConsejoAcademico[_id].totalVotes());
    }

    function voteConsejoAcademico(uint _id) public {
        candidatosConsejoAcademico[_id].vote();
    }

    function addCandidateJuntaDirectivaFCE(string memory _agrupacion, string memory _siglas) public {
        JuntaDirectivaFCE candidate = new JuntaDirectivaFCE(_agrupacion, _siglas);
        candidatosJuntaFCE[_siglas] = candidate;
    }

    function getCandidateJuntaDirectivaFCE(string memory _siglas) public view returns (string memory, string memory, uint) {
        return (candidatosJuntaFCE[_siglas].agrupacion(), candidatosJuntaFCE[_siglas].siglas(), candidatosJuntaFCE[_siglas].totalVotes());
    }

    function voteJuntaDirectivaFCE(string memory _siglas) public {
        candidatosJuntaFCE[_siglas].vote();
    }

    function addCandidateCoordinacionFCE(string memory _agrupacion, string memory _siglas) public {
        CoordinacionFCE candidate = new CoordinacionFCE(_agrupacion, _siglas);
        candidatosCoordinacionFCE[_siglas] = candidate;
    }

    function getCandidateCoordinacionFCE(string memory _siglas) public view returns (string memory, string memory, uint) {
        return (candidatosCoordinacionFCE[_siglas].agrupacion(), candidatosCoordinacionFCE[_siglas].siglas(), candidatosCoordinacionFCE[_siglas].totalVotes());
    }

    function voteCoordinacionFCE(string memory _siglas) public {
        candidatosCoordinacionFCE[_siglas].vote();
    }

    function addCandidateCentroEstudiantes(string memory _nombre, string memory _siglas, string memory _escuela) public {
        CentroEstudiantes candidate = new CentroEstudiantes(_nombre, _siglas, _escuela);
        candidatosCentroEstudiantes[_escuela][_siglas] = candidate;
    }

    function getCandidateCentroEstudiantes(string memory _escuela, string memory _siglas) public view returns (string memory, string memory, string memory, uint) {
        return (candidatosCentroEstudiantes[_escuela][_siglas].nombre(), candidatosCentroEstudiantes[_escuela][_siglas].siglas(), candidatosCentroEstudiantes[_escuela][_siglas].escuela(), candidatosCentroEstudiantes[_escuela][_siglas].totalVotes());
    }

    function voteCentroEstudiantes(string memory _escuela, string memory _siglas) public {
        candidatosCentroEstudiantes[_escuela][_siglas].vote();
    }

    function addCandidateConsejoEscuela(string memory _nombre, string memory _siglas, string memory _escuela) public {
        ConsejoEscuela candidate = new ConsejoEscuela(_nombre, _siglas, _escuela);
        candidatosConsejoEscuela[_escuela][_siglas] = candidate;
    }

    function getCandidateConsejoEscuela(string memory _escuela, string memory _siglas) public view returns (string memory, string memory, string memory, uint) {
        return (candidatosConsejoEscuela[_escuela][_siglas].nombre(), candidatosConsejoEscuela[_escuela][_siglas].siglas(), candidatosConsejoEscuela[_escuela][_siglas].escuela(), candidatosConsejoEscuela[_escuela][_siglas].totalVotes());
    }

    function voteConsejoEscuela(string memory _escuela, string memory _siglas) public {
        candidatosConsejoEscuela[_escuela][_siglas].vote();
    }

    function addCandidateConsejoFacultad(string memory _nombre, string memory _siglas, string memory _facultad) public {
        ConsejoFacultad candidate = new ConsejoFacultad(_nombre, _siglas, _facultad);
        candidatosConsejoFacultad[_facultad][_siglas] = candidate;
    }

    function getCandidateConsejoFacultad(string memory _facultad, string memory _siglas) public view returns (string memory, string memory, string memory, uint) {
        return (candidatosConsejoFacultad[_facultad][_siglas].nombre(), candidatosConsejoFacultad[_facultad][_siglas].siglas(), candidatosConsejoFacultad[_facultad][_siglas].facultad(), candidatosConsejoFacultad[_facultad][_siglas].totalVotes());
    }

    function voteConsejoFacultad(string memory _facultad, string memory _siglas) public {
        candidatosConsejoFacultad[_facultad][_siglas].vote();
    }


}