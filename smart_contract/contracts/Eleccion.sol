// SPDX-Licence-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Candidate.sol";
import "./StringCompare.sol";
import "./Votante.sol";


contract Eleccion {
    string nombre;
    address owner;

    uint[] public registroElectoral;

// TODO: Creo que he aqui el problema. Todas las funciones de agregar escriben a alguno de estos arreglos
// y al final las funciones de agarrar los ganadores los usan. Si guardamos esa info en una BD y se la 
// pasamos a las funciones de ganadores desde afuera creo que solventamos el bloat del contrato
    uint[] public IDsCandidatosConsejo;
    string[] public siglasPartidos;
    string[] public escuelas;
    string[] public facultades;

    mapping (uint => Votante) public votantesRegistrados;
    mapping (uint => ConsejoAcademico) public candidatosConsejoAcademico;
    mapping (string => JuntaDirectivaFCE) public candidatosJuntaFCE;
    mapping (string => CoordinacionFCE) public candidatosCoordinacionFCE;
    mapping (string => mapping (string => CentroEstudiantes)) public candidatosCentroEstudiantes;
    mapping (string => mapping (string => ConsejoEscuela)) public candidatosConsejoEscuela;
    mapping (string => mapping (string => ConsejoFacultad)) public candidatosConsejoFacultad;

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
        if (!checkInUintArray(IDsCandidatosConsejo, _id)){

            IDsCandidatosConsejo.push(_id);
        }
    }

    function checkInUintArray(uint[] memory _array, uint _value) public pure returns (bool) {
        for (uint i = 0; i < _array.length; i++) {
            if (_array[i] == _value) {
                return true;
            }
        }
        return false;
    }

    function checkInStringArray(string[] memory _array, string memory _value) public pure returns (bool) {
        for (uint i = 0; i < _array.length; i++) {
            if (StringCompare.compare(_array[i], _value)) {
                return true;
            }
        }
        return false;
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
        if (!checkInStringArray(siglasPartidos, _siglas)){
            siglasPartidos.push(_siglas);
        }
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
        if (!checkInStringArray(siglasPartidos, _siglas)){
            siglasPartidos.push(_siglas);
        }
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
        if (!checkInStringArray(siglasPartidos, _siglas)){
            siglasPartidos.push(_siglas);
        }
        if (!checkInStringArray(escuelas, _escuela)){
            escuelas.push(_escuela);
        }
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
        if (!checkInStringArray(siglasPartidos, _siglas)){
            siglasPartidos.push(_siglas);
        }
        if (!checkInStringArray(escuelas, _escuela)){
            escuelas.push(_escuela);
        }
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
        if (!checkInStringArray(siglasPartidos, _siglas)){
            siglasPartidos.push(_siglas);
        }
        if (!checkInStringArray(facultades, _facultad)){
            facultades.push(_facultad);
        }
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

    function getGanadorConsejoAcademico() public view returns (string memory, uint, uint, string memory, uint, uint) {
        uint maxVotes = 0;
        uint secondMaxVotes = 0;
        uint ganadorID;
        uint segundoGanadorID;
        for (uint i = 0; i < IDsCandidatosConsejo.length; i++){
            if (candidatosConsejoAcademico[IDsCandidatosConsejo[i]].totalVotes() > maxVotes){
                secondMaxVotes = maxVotes;
                maxVotes = candidatosConsejoAcademico[IDsCandidatosConsejo[i]].totalVotes();
                segundoGanadorID = ganadorID;
                ganadorID = IDsCandidatosConsejo[i];
            }
        }
        return (candidatosConsejoAcademico[ganadorID].name(), candidatosConsejoAcademico[ganadorID].id(), candidatosConsejoAcademico[ganadorID].totalVotes(), candidatosConsejoAcademico[segundoGanadorID].name(), candidatosConsejoAcademico[segundoGanadorID].id(), candidatosConsejoAcademico[segundoGanadorID].totalVotes());
    }

    function getGanadorJuntaDirectivaFCE() public view returns (string memory, string memory, uint) {
        uint maxVotes = 0;
        string memory ganadorSiglas;
        for (uint i = 0; i < siglasPartidos.length; i++){
            if (candidatosJuntaFCE[siglasPartidos[i]].totalVotes() > maxVotes){
                maxVotes = candidatosJuntaFCE[siglasPartidos[i]].totalVotes();
                ganadorSiglas = siglasPartidos[i];
            }
        }
        return (candidatosJuntaFCE[ganadorSiglas].agrupacion(), candidatosJuntaFCE[ganadorSiglas].siglas(), candidatosJuntaFCE[ganadorSiglas].totalVotes());
    }

    function getGanadorCoordinacionFCE() public view returns (string memory, string memory, uint) {
        uint maxVotes = 0;
        string memory ganadorSiglas;
        for (uint i = 0; i < siglasPartidos.length; i++){
            if (candidatosCoordinacionFCE[siglasPartidos[i]].totalVotes() > maxVotes){
                maxVotes = candidatosCoordinacionFCE[siglasPartidos[i]].totalVotes();
                ganadorSiglas = siglasPartidos[i];
            }
        }
        return (candidatosCoordinacionFCE[ganadorSiglas].agrupacion(), candidatosCoordinacionFCE[ganadorSiglas].siglas(), candidatosCoordinacionFCE[ganadorSiglas].totalVotes());
    }

    function getGanadorCentroEstudiantes(string memory _escuela) public view returns (string memory, string memory, uint) {
        uint maxVotes = 0;
        string memory ganadorSiglas;
        for (uint i = 0; i < siglasPartidos.length; i++){
            if (candidatosCentroEstudiantes[_escuela][siglasPartidos[i]].totalVotes() > maxVotes){
                maxVotes = candidatosCentroEstudiantes[_escuela][siglasPartidos[i]].totalVotes();
                ganadorSiglas = siglasPartidos[i];
            }
        }
        return (candidatosCentroEstudiantes[_escuela][ganadorSiglas].nombre(), candidatosCentroEstudiantes[_escuela][ganadorSiglas].siglas(), candidatosCentroEstudiantes[_escuela][ganadorSiglas].totalVotes());
    }

    function getGanadorConsejoEscuela(string memory _escuela) public view returns (string memory, string memory, uint) {
        uint maxVotes = 0;
        string memory ganadorSiglas;
        for (uint i = 0; i < siglasPartidos.length; i++){
            if (candidatosConsejoEscuela[_escuela][siglasPartidos[i]].totalVotes() > maxVotes){
                maxVotes = candidatosConsejoEscuela[_escuela][siglasPartidos[i]].totalVotes();
                ganadorSiglas = siglasPartidos[i];
            }
        }
        return (candidatosConsejoEscuela[_escuela][ganadorSiglas].nombre(), candidatosConsejoEscuela[_escuela][ganadorSiglas].siglas(), candidatosConsejoEscuela[_escuela][ganadorSiglas].totalVotes());
    }

    function getGanadorConsejoFacultad(string memory _facultad) public view returns (string memory, string memory, uint) {
        uint maxVotes = 0;
        string memory ganadorSiglas;
        for (uint i = 0; i < siglasPartidos.length; i++){
            if (candidatosConsejoFacultad[_facultad][siglasPartidos[i]].totalVotes() > maxVotes){
                maxVotes = candidatosConsejoFacultad[_facultad][siglasPartidos[i]].totalVotes();
                ganadorSiglas = siglasPartidos[i];
            }
        }
        return (candidatosConsejoFacultad[_facultad][ganadorSiglas].nombre(), candidatosConsejoFacultad[_facultad][ganadorSiglas].siglas(), candidatosConsejoFacultad[_facultad][ganadorSiglas].totalVotes());
    }


}