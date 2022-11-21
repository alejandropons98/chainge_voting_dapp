// SPDX-Licence-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Candidate.sol";
import "./StringCompare.sol";
import "./Votante.sol";


contract Eleccion {
    string nombre;
    address owner;

    uint[] public registroElectoral;

    string[] public escuelas;

    mapping (uint => Votante) public votantesRegistrados;
    uint public numeroVotantesRegistrados;
    mapping (uint => ConsejoAcademico) public candidatosConsejoAcademico;
    uint public numeroCandidatosConsejoAcademico;
    mapping (string => JuntaDirectivaFCE) public candidatosJuntaFCE;
    string[] public candidatosJuntaFCEKeys;
    mapping (string => CoordinacionFCE) public candidatosCoordinacionFCE;
    string[] public candidatosCoordinacionFCEKeys;
    mapping (string => mapping (string => CentroEstudiantes)) public candidatosCentroEstudiantes;
    string[] public candidatosCentroEstudiantesKeys;
    mapping (string => mapping (string => ConsejoEscuela)) public candidatosConsejoEscuela;
    string[] public candidatosConsejoEscuelaKeys;
    mapping (string => mapping (string => ConsejoFacultad)) public candidatosConsejoFacultad;
    string[] public candidatosConsejoFacultadKeys;

    constructor () {
        owner = msg.sender;
    }

    function agregarIDARegistro(uint _id) public {
        require(!checkRegistroElectoral(_id), "Ya se encuentra en el registro electoral");
        registroElectoral.push(_id);
    }

    function checkRegistroElectoral(uint _id) public view returns (bool) {
        for (uint i = 0; i < registroElectoral.length; i++) {
            if (registroElectoral[i] == _id) {
                return true;
            }
        }
        return false;
    }

    function agregarVotante(uint _id, string[] memory _carreras, string[] memory _facultades) public {
        require(checkRegistroElectoral(_id), "No se encuentra en el registro electoral");
        votantesRegistrados[_id] = new Votante(_id, _carreras, _facultades);
        numeroVotantesRegistrados++;
    }

    function getVotanteInfo(uint _id) public view returns (uint, string[] memory, string[] memory) {
        return (votantesRegistrados[_id].getID(), votantesRegistrados[_id].getCarreras(), votantesRegistrados[_id].getFacultades());
    }

    function getVotanteCulminoVotacion(uint _id) public view returns (bool) {
        return votantesRegistrados[_id].getVoted();
    }

    function getVotanteSeccionesVotadas(uint _id) public view returns (bool, bool, bool, bool, bool, bool) {
        return (votantesRegistrados[_id].getVotedConsejoAcademico(), votantesRegistrados[_id].getVotedJuntaDirectivaFCE(), votantesRegistrados[_id].getVotedCoordinacionFCE(), votantesRegistrados[_id].getVotedCentroEstudiantes(), votantesRegistrados[_id].getVotedConsejoEscuela(), votantesRegistrados[_id].getVotedConsejoFacultad());
    }

    function getVotanteNumeroVotos(uint _id) public view returns (uint, uint, uint) {
        return (votantesRegistrados[_id].getNumeroVotosCentroEst(), votantesRegistrados[_id].getNumeroVotosCF(), votantesRegistrados[_id].getNumeroVotosCE());
    }

    function agregarCandidatoConsejoAcademico(string memory _nombre, uint _id, string memory _carrera) public {
        // TODO: Check if candidate already exists
        candidatosConsejoAcademico[_id] = new ConsejoAcademico(_nombre, _id, _carrera);
        numeroCandidatosConsejoAcademico++;
    }

    function getCandidatoConsejoAcademico(uint _id) public view returns (string memory, uint, string memory, uint) {
        return (candidatosConsejoAcademico[_id].name(), candidatosConsejoAcademico[_id].id(), candidatosConsejoAcademico[_id].carrera(), candidatosConsejoAcademico[_id].totalVotes());
    }

    function voteCandidatoConsejoAcademico(uint _id, uint _voterID) public {
        ConsejoAcademico candidato = candidatosConsejoAcademico[_id];
        candidato.vote();
        Votante votante = votantesRegistrados[_voterID];
        votante.votarConsejoAcademico();
    }


    function agregarCandidatoJuntaDirectivaFCE(string memory _agrupacion, string memory _siglas) public {
        // TODO: Check if candidate already exists
        candidatosJuntaFCE[_siglas] = new JuntaDirectivaFCE(_agrupacion, _siglas);
        candidatosJuntaFCEKeys.push(_siglas);
    }

    function getCandidatoJuntaDirectivaFCE(string memory _siglas) public view returns (string memory, string memory, uint) {
        return (candidatosJuntaFCE[_siglas].agrupacion(), candidatosJuntaFCE[_siglas].siglas(), candidatosJuntaFCE[_siglas].totalVotes());
    }

    function voteCandidatoJuntaDirectivaFCE(string memory _siglas, uint _voterID) public {
        JuntaDirectivaFCE candidato = candidatosJuntaFCE[_siglas];
        candidato.vote();
        Votante votante = votantesRegistrados[_voterID];
        votante.votarJuntaDirectivaFCE();
    }

    function agregarCandidatoCoordinacionFCE(string memory _agrupacion, string memory _siglas) public {
        candidatosCoordinacionFCE[_siglas] = new CoordinacionFCE(_agrupacion, _siglas);
        candidatosCoordinacionFCEKeys.push(_siglas);
    }

    function getCandidatoCoordinacionFCE(string memory _siglas) public view returns (string memory, string memory, uint) {
        return (candidatosCoordinacionFCE[_siglas].agrupacion(), candidatosCoordinacionFCE[_siglas].siglas(), candidatosCoordinacionFCE[_siglas].totalVotes());
    }

    function voteCandidatoCoordinacionFCE(string memory _siglas, uint _voterID) public {
        CoordinacionFCE candidato = candidatosCoordinacionFCE[_siglas];
        candidato.vote();
        Votante votante = votantesRegistrados[_voterID];
        votante.votarCoordinacionFCE();
    }

    function agregarCandidatoCentroEstudiantes(string memory _nombre, string memory _siglas, string memory _escuela) public {
        candidatosCentroEstudiantes[_escuela][_siglas] = new CentroEstudiantes(_nombre, _siglas, _escuela);
        candidatosCentroEstudiantesKeys.push(_siglas);
    }

    function getCandidatoCentroEstudiantes(string memory _siglas, string memory _escuela) public view returns (string memory, string memory, string memory, uint) {
        return (candidatosCentroEstudiantes[_escuela][_siglas].nombre(), candidatosCentroEstudiantes[_escuela][_siglas].siglas(), candidatosCentroEstudiantes[_escuela][_siglas].escuela(), candidatosCentroEstudiantes[_escuela][_siglas].totalVotes());
    }

    function voteCandidatoCentroEstudiantes(string memory _siglas, string memory _escuela, uint _voterID) public {
        CentroEstudiantes candidato = candidatosCentroEstudiantes[_escuela][_siglas];
        candidato.vote();
        Votante votante = votantesRegistrados[_voterID];
        votante.votarCentroEstudiantes();
    }

    function agregarCandidatoConsejoEscuela(string memory _nombre, string memory _siglas, string memory _escuela) public {
        candidatosConsejoEscuela[_escuela][_siglas] = new ConsejoEscuela(_nombre, _siglas, _escuela);
        candidatosConsejoEscuelaKeys.push(_siglas);
    }

    function getCandidatoConsejoEscuela(string memory _siglas, string memory _escuela) public view returns (string memory, string memory, string memory, uint) {
        return (candidatosConsejoEscuela[_escuela][_siglas].nombre(), candidatosConsejoEscuela[_escuela][_siglas].siglas(), candidatosConsejoEscuela[_escuela][_siglas].escuela(), candidatosConsejoEscuela[_escuela][_siglas].totalVotes());
    }

    function voteCandidatoConsejoEscuela(string memory _siglas, string memory _escuela, uint _voterID) public {
        ConsejoEscuela candidato = candidatosConsejoEscuela[_escuela][_siglas];
        candidato.vote();
        Votante votante = votantesRegistrados[_voterID];
        votante.votarConsejoEscuela();
    }

    function agregarCandidatoConsejoFacultad(string memory _nombre, string memory _siglas, string memory _facultad) public {
        candidatosConsejoFacultad[_facultad][_siglas] = new ConsejoFacultad(_nombre, _siglas, _facultad);
        candidatosConsejoFacultadKeys.push(_siglas);
    }

    function getCandidatoConsejoFacultad(string memory _siglas, string memory _facultad) public view returns (string memory, string memory, string memory, uint) {
        return (candidatosConsejoFacultad[_facultad][_siglas].nombre(), candidatosConsejoFacultad[_facultad][_siglas].siglas(), candidatosConsejoFacultad[_facultad][_siglas].facultad(), candidatosConsejoFacultad[_facultad][_siglas].totalVotes());
    }

    function voteCandidatoConsejoFacultad(string memory _siglas, string memory _facultad, uint _voterID) public {
        ConsejoFacultad candidato = candidatosConsejoFacultad[_facultad][_siglas];
        candidato.vote();
        Votante votante = votantesRegistrados[_voterID];
        votante.votarConsejoFacultad();
    }

    function getCandidatosJuntaFCELength() public view returns (uint) {
        return candidatosJuntaFCEKeys.length;
    }

    function getCandidatosCoordinacionFCELength() public view returns (uint) {
        return candidatosCoordinacionFCEKeys.length;
    }

    function getCandidatosCentroEstudiantesLength() public view returns (uint) {
        return candidatosCentroEstudiantesKeys.length;
    }

    function getCandidatosConsejoEscuelaLength() public view returns (uint) {
        return candidatosConsejoEscuelaKeys.length;
    }

    function getCandidatosConsejoFacultadLength() public view returns (uint) {
        return candidatosConsejoFacultadKeys.length;
    }

    function getEscuelasLength() public view returns (uint) {
        return escuelas.length;
    }

}