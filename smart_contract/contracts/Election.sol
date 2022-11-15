// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./PartyLib.sol";


contract Election {
    using PartyLib for *;
    // Para llevar control de cada estado

    // TODO: esto es para despues
    // enum WorkflowStatus {
    //     RegisteringVoters,
    //     VotingSessionStarted,
    //     VotingSessionEnded,
    //     VotesTallied
    // }

    // modifier onlyRegisteredVoter() {
    //     require(
    //         votantes[msg.sender],
    //         "Only registered voters can call this function."
    //     );
    //     _;
    // }

    // modifier onlyDuringVotingSession() {
    //     require(
    //         workflowStatus == WorkflowStatus.VotingSessionStarted,
    //         "this function can be called only during voting sessions."
    //     );
    //     _;
    // }

    // event VoterRegisteredEvent(address voterAddress);
    // event CandidateRegisteredEvent(uint256 candidateId);
    // event VotingSessionStartedEvent();
    // event VotingSessionEndedEvent();
    // event VotedEvent(address voter, uint256 proposalId);
    // event VotesTalliedEvent();

    // event WorkflowStatusChangeEvent(
    //     WorkflowStatus previousStatus,
    //     WorkflowStatus newStatus
    // );

    function compareStrings(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        if (bytes(a).length != bytes(b).length) {
            return false;
        } else {
            return keccak256(abi.encodePacked((a))) ==
                keccak256(abi.encodePacked((b)));
        }
    }

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }



    // Election details

    string public name;
    string public description;

    address public owner;

    string[] private escuelas = [
        "Ing. Quimica",
        "Ing. de Sistemas",
        "Ing. Civil",
        "Ing. Mecanica",
        "Ing. de Produccion",
        "Ing. Electrica",
        "Administracion",
        "Contaduria",
        "Economia",
        "Educacion",
        "Idiomas",
        "Psicolologia",
        "Mate. Industriales",
        "Est. Liberales",
        "Derecho"
    ];

    string[] private facultades = [
        "Ingenieria",
        "Ciencias Economicas y Sociales",
        "Ciencias y Artes",
        "Estudios Juridicos y Politicos"
    ];


    // Agrupaciones

    // struct PartyLib.Party {
    //     string name;
    //     string siglas;
    // }

    // struct PartyLib.CandidateConsejero {
    //     string nombre;
    //     uint id;
    //     string degree;
    //     uint voteCount;
    // }

    // struct PartyLib.CandidateConsejoFacultad {
    //     string nombreAgrupacion;
    //     string siglasAgrupacion;
    //     uint voteCount;
    // }

    // struct PartyLib.CandidateConsejoEscuela {
    //     string nombreAgrupacion;
    //     string siglasAgrupacion;
    //     uint voteCount;
    // }

    // struct CandidateCentroEstudiantes {
    //     string nombreAgrupacion;
    //     string siglasAgrupacion;
    //     uint voteCount;
    // }

    // struct PartyLib.CandidateJuntaDirectiva {
    //     string nombreAgrupacion;
    //     string siglasAgrupacion;
    //     uint voteCount;
    // }

    // struct PartyLib.CandidateCoordinacion {
    //     string nombreAgrupacion;
    //     string siglasAgrupacion;
    //     uint voteCount;
    // }   

    PartyLib.Party[] public agrupacionesRegistradas;

    PartyLib.CandidateConsejero[] public candidatosConsejoAcademico;
    PartyLib.CandidateJuntaDirectiva[] public candidatosJuntaDirectivaFCE;
    PartyLib.CandidateCoordinacion[] public candidatosCoordinacionFCE;

    mapping (string => PartyLib.CandidateConsejoFacultad[]) public candidatosConsejoFacultad;
    mapping (string => PartyLib.CandidateConsejoEscuela[]) public candidatosConsejoEscuela;
    mapping (string => PartyLib.CandidateCentroEstudiantes[]) public candidatosCentroEstudiante;

    // TODO: Para los check puedo quitar la comparacion de las siglas para que sea mas eficiente, aunque quizas seria mejor
    // hacer la comparacion pero con un OR para que no se repitan siglas
    function addAgrupacion(string memory _name, string memory _siglas) public {
        PartyLib.addAgrupacion(_name, _siglas, owner, agrupacionesRegistradas);
    }

    function checkAgrupacion(string memory _name, string memory _siglas) public view returns (bool result) {
        return PartyLib.checkAgrupacion(_name, _siglas, agrupacionesRegistradas);
    }

    function getAgrupaciones() public view returns (PartyLib.Party[] memory) {
        return agrupacionesRegistradas;
    }

    function getAgrupacion(string memory _name) public view returns (PartyLib.Party memory agrupacion) {
        for (uint i = 0; i < agrupacionesRegistradas.length; ++i) {
            if(compareStrings(agrupacionesRegistradas[i].name, _name)) {
                return agrupacionesRegistradas[i];
            }
        }
    }

    function addConsejoFacultad(PartyLib.Party memory _agrupacion, string memory _facultad) public {
        PartyLib.addConsejoFacultad(_agrupacion, _facultad, owner, candidatosConsejoFacultad, agrupacionesRegistradas, facultades);
    }

    function checkConsejoFacultad(PartyLib.Party memory _agrupacion, string memory _facultad) public view returns (bool result) {
        return PartyLib.checkConsejoFacultad(_agrupacion, _facultad, candidatosConsejoFacultad);
    }

    function checkInFacultades(string memory _facultad) public view returns (bool result) {
        return PartyLib.checkInFacultades(_facultad, facultades);
    }

    function addConsejoEscuela(PartyLib.Party memory _agrupacion, string memory _escuela) public {
        PartyLib.addConsejoEscuela(_agrupacion, _escuela, owner, candidatosConsejoEscuela, agrupacionesRegistradas, escuelas);
    }

    function checkConsejoEscuela(PartyLib.Party memory _agrupacion, string memory _escuela) public view returns (bool result) {
        return PartyLib.checkConsejoEscuela(_agrupacion, _escuela, candidatosConsejoEscuela);
    }

    function checkInEscuelas(string memory _escuela) public view returns (bool result) {
        return PartyLib.checkInEscuelas(_escuela, escuelas);
    }

    function addCentroEstudiantes(PartyLib.Party memory _agrupacion, string memory _escuela) public {
        PartyLib.addCentroEstudiantes(_agrupacion, _escuela, owner, candidatosCentroEstudiante, agrupacionesRegistradas, escuelas);
    }

    function checkCentroEstudiantes(PartyLib.Party memory _agrupacion, string memory _escuela) public view returns (bool result) {
        return PartyLib.checkCentroEstudiantes(_agrupacion, _escuela, candidatosCentroEstudiante);
    }

    function addJuntaDirectivaFCE(PartyLib.Party memory _agrupacion) public {
        PartyLib.addJuntaDirectivaFCE(_agrupacion, owner, candidatosJuntaDirectivaFCE, agrupacionesRegistradas);
    }

    function checkJuntaDirectiva(PartyLib.Party memory _agrupacion) public view returns (bool result) {
        return PartyLib.checkJuntaDirectiva(_agrupacion, candidatosJuntaDirectivaFCE);
    }

    function addCoordinacionFCE(PartyLib.Party memory _agrupacion) public {
        PartyLib.addCoordinacionFCE(_agrupacion, owner, candidatosCoordinacionFCE, agrupacionesRegistradas);
    }

    function checkCoordinacion(PartyLib.Party memory _agrupacion) public view returns (bool result) {
        return PartyLib.checkCoordinacion(_agrupacion, candidatosCoordinacionFCE);
    }

    function addConsejeroAcademico(string memory _name, uint _id, string memory _major) public {
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar candidatos");
        require(!checkConsejeroAcademico(_id), "Consejero ya registrado");
        candidatosConsejoAcademico.push(PartyLib.CandidateConsejero(_name, _id, _major, 0));
    }

    function checkConsejeroAcademico(uint _id) public view returns (bool) {
        for (uint i = 0; i < candidatosConsejoAcademico.length; ++i) {
            if (candidatosConsejoAcademico[i].id == _id) {
                return true;
            }
        }
        return false;
    }

    function getCandidateConsejoAcademico(uint _id) public view returns (PartyLib.CandidateConsejero memory candidate) {
        for (uint i = 0; i < candidatosConsejoAcademico.length; ++i) {
            if (candidatosConsejoAcademico[i].id == _id) {
                return candidatosConsejoAcademico[i];
            }
        }
    }

    function getAllCandidatesConsejoAcademico() public view returns (PartyLib.CandidateConsejero[] memory) {
        return candidatosConsejoAcademico;
    }

    function getCandidatosConsejoFacultad(string memory _facultad) public view returns (PartyLib.CandidateConsejoFacultad[] memory) {
        return candidatosConsejoFacultad[_facultad];
    }

    function getCandidatosConsejoEscuela(string memory _escuela) public view returns (PartyLib.CandidateCentroEstudiantes[] memory) {
        return candidatosCentroEstudiante[_escuela];
    }

    function getCandidatosCentroEstudiante(string memory _escuela) public view returns (PartyLib.CandidateCentroEstudiantes[] memory) {
        return candidatosCentroEstudiante[_escuela];
    }

    function getCandidatosdCoordinacionFCE() public view returns (PartyLib.CandidateCoordinacion[] memory) {
        return candidatosCoordinacionFCE;
    }

    function getCandidatosJuntaDirectivaFCE() public view returns (PartyLib.CandidateJuntaDirectiva[] memory) {
        return candidatosJuntaDirectivaFCE;
    }

    function getJuntaDirectivaFCE(string memory _siglas) public view returns (PartyLib.CandidateJuntaDirectiva memory junta) {
        for (uint i = 0; i < candidatosJuntaDirectivaFCE.length; ++i) {
            if (keccak256(abi.encodePacked(candidatosJuntaDirectivaFCE[i].siglasAgrupacion)) == keccak256(abi.encodePacked(_siglas))) {
                return candidatosJuntaDirectivaFCE[i];
            }
        }
    }

    function getCoordinacionFCE(string memory _siglas) public view returns (PartyLib.CandidateCoordinacion memory coordinacion) {
        for (uint i = 0; i < candidatosCoordinacionFCE.length; ++i) {
            if (compareStrings(candidatosCoordinacionFCE[i].siglasAgrupacion, _siglas)) {
                return candidatosCoordinacionFCE[i];
            }
        }
    }

    function getCentroEstudiantes(string memory _siglas, string memory _escuela) public view returns (PartyLib.CandidateCentroEstudiantes memory centro) {
        for (uint i = 0; i < candidatosCentroEstudiante[_escuela].length; ++i) {
            if (compareStrings(candidatosCentroEstudiante[_escuela][i].siglasAgrupacion, _siglas)) {
                return candidatosCentroEstudiante[_escuela][i];
            }
        }
    }

    function getConsejoFacultad(string memory _siglas, string memory _facultad) public view returns (PartyLib.CandidateConsejoFacultad memory consejo) {
        for (uint i = 0; i < candidatosConsejoFacultad[_facultad].length; ++i) {
            if (compareStrings(candidatosConsejoFacultad[_facultad][i].siglasAgrupacion, _siglas)) {
                return candidatosConsejoFacultad[_facultad][i];
            }

        }
    }

    function getConsejeroAcademico(uint _id) public view returns (PartyLib.CandidateConsejero memory consejero) {
        for (uint i = 0; i < candidatosConsejoAcademico.length; ++i) {
            if (candidatosConsejoAcademico[i].id == _id) {
                return candidatosConsejoAcademico[i];
            }
        }
    }

    function getConsejoEscuela(string memory _siglas, string memory _escuela) public view returns (PartyLib.CandidateConsejoEscuela memory consejo) {
        for (uint i = 0; i < candidatosConsejoEscuela[_escuela].length; ++i) {
            if (compareStrings(candidatosConsejoEscuela[_escuela][i].siglasAgrupacion, _siglas)) {
                return candidatosConsejoEscuela[_escuela][i];
            }
        }
    }


    // Votantes

    struct Votante {
        uint id;
        string[] carreras;
        bool voted;
        bool votoCoordinacion;
        bool votoJuntaDirectiva;
        bool votoConsejoFacultad;
        bool votoCentroEstudiantes;
        bool votoConsejoAcademico;
        bool votoConsejoEscuela;
        uint votosConsejoEscuela;
        uint votosCentroEstudiantes;
        uint votosFacultad;
    }


    mapping (uint => Votante) votantes;
    mapping (uint => mapping (string => bool)) votantesFacultades;
    mapping (uint => bool) registroElectoral;
    // mapping(address => Voter) public voters;
    // Candidate[] public candidates;
    // string[] public parties;
    // WorkflowStatus public workflowStatus;
    // string[] public voterRegistry;

    function addVotante(uint _id, string[] memory _carreras) public {
        require(!checkRegisteredVoter(_id), "Votante ya registrado");
        require(inRegistroElectoral(_id), "Votante no registrado en el registro electoral");
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar votantes");
        votantes[_id] = Votante(_id, _carreras, false, false, false, false, false, false, false,0,0,0);
        registerVotanteFacultad(votantes[_id]);
    }

    function checkListoVotando(uint _id) public view returns (bool) {
        Votante memory votante = votantes[_id];
        return votante.votoCoordinacion && votante.votoJuntaDirectiva && votante.votoConsejoFacultad && votante.votoCentroEstudiantes && votante.votoConsejoAcademico && votante.votoConsejoEscuela;
    }

// TODO: implementar voto nulo
    function voteJunta(uint _id, string memory _siglas) public {
        require(!votantes[_id].voted, "Votante ya ha votado");
        require(checkRegisteredVoter(_id), "Votante no registrado en el registro electoral");
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar votantes");
        PartyLib.CandidateJuntaDirectiva memory candidato = getJuntaDirectivaFCE(_siglas);
        candidato.voteCount += 1;
        votantes[_id].votoJuntaDirectiva = true;
        if (checkListoVotando(_id)) {
            votantes[_id].voted = true;
        }
    }

    function voteCoordinacion(uint _id, string memory _siglas) public {
        require(!votantes[_id].votoCoordinacion, "Votante ya ha votado");
        require(checkRegisteredVoter(_id), "Votante no registrado en el registro electoral");
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar votantes");
        PartyLib.CandidateCoordinacion memory candidato = getCoordinacionFCE(_siglas);
        candidato.voteCount += 1;
        votantes[_id].votoCoordinacion = true;
        if (checkListoVotando(_id)) {
            votantes[_id].voted = true;
        }
    }
// TODO: creo que esta vaina es cero eficiente y me esta tumbando el contrato

    function voteConsejoAcademico(uint _id, uint _idCandidato) public {
        require(!votantes[_id].votoConsejoAcademico, "Votante ya ha votado");
        require(checkRegisteredVoter(_id), "Votante no registrado en el registro electoral");
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar votantes");
        PartyLib.CandidateConsejero memory candidato = getConsejeroAcademico(_idCandidato);
        candidato.voteCount += 1;
        votantes[_id].votoConsejoAcademico = true;
        if (checkListoVotando(_id)) {
            votantes[_id].voted = true;
        }
    }

    function voteConsejoFacultad(uint _id, string memory _facultad, string memory _siglas) public {
        require(!votantes[_id].votoConsejoFacultad, "Votante ya ha votado");
        require(checkRegisteredVoter(_id), "Votante no registrado en el registro electoral");
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar votantes");
        PartyLib.CandidateConsejoFacultad memory candidato = getConsejoFacultad(_siglas, _facultad);
        candidato.voteCount++;
        Votante memory votante = votantes[_id];
        votante.votosFacultad--;
        if (votante.votosFacultad == 0) {
            votantes[_id].votoConsejoFacultad = true;
        }
        if (checkListoVotando(_id)) {
            votantes[_id].voted = true;
        }
    }

    function voteConsejoEscuela(uint _id, string memory _escuela, string memory _siglas) public {
        require(!votantes[_id].votoConsejoEscuela, "Votante ya ha votado");
        require(checkRegisteredVoter(_id), "Votante no registrado en el registro electoral");
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar votantes");
        PartyLib.CandidateConsejoEscuela memory candidato = getConsejoEscuela(_siglas, _escuela);
        candidato.voteCount++;
        Votante memory votante = votantes[_id];
        votante.votosConsejoEscuela--;
        if (votante.votosConsejoEscuela == 0) {
            votantes[_id].votoConsejoEscuela = true;
        }
        if (checkListoVotando(_id)) {
            votantes[_id].voted = true;
        }
    }

    function voteCentroEstudiantes(uint _id, string memory _escuela, string memory _siglas) public {
        require(!votantes[_id].votoCentroEstudiantes, "Votante ya ha votado");
        require(checkRegisteredVoter(_id), "Votante no registrado en el registro electoral");
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar votantes");
        PartyLib.CandidateCentroEstudiantes memory candidato = getCentroEstudiantes(_siglas, _escuela);
        candidato.voteCount++;
        Votante memory votante = votantes[_id];
        votante.votosCentroEstudiantes--;
        if (votante.votosCentroEstudiantes == 0) {
            votantes[_id].votoCentroEstudiantes = true;
        }
        if (checkListoVotando(_id)) {
            votantes[_id].voted = true;
        }
    }

    function registerVotanteFacultad(Votante memory _votante) public {
        string[] memory carreras = _votante.carreras;
        for (uint i = 0; i < carreras.length; ++i) {
            if (!votantesFacultades[_votante.id][getFacultadCarrera(carreras[i])]){
                votantesFacultades[_votante.id][getFacultadCarrera(carreras[i])] = true;
                _votante.votosFacultad++;
            }
            _votante.votosConsejoEscuela++;
            _votante.votosCentroEstudiantes++;
        }
    }

    function getFacultadCarrera(string memory _carrera) public pure returns (string memory facCarrera) {

        if (compareStrings(_carrera, "Ing. Quimica")) {
            return "Ingenieria";
        } else if (compareStrings(_carrera, "Ing. de Sistemas")) {
            return "Ingenieria";
        } else if (compareStrings(_carrera, "Ing. Civil")) {
            return "Ingenieria";
        } else if (compareStrings(_carrera, "Ing. Mecanica")) {
            return "Ingenieria";
        } else if (compareStrings(_carrera, "Ing. de Produccion")) {
            return "Ingenieria";
        } else if (compareStrings(_carrera, "Ing. Electrica")) {
            return "Ingenieria";
        } else if (compareStrings(_carrera, "Administracion")) {
            return "Ciencias Economicas y Sociales";
        } else if (compareStrings(_carrera, "Economia")) {
            return "Ciencias Economicas y Sociales";
        } else if (compareStrings(_carrera, "Contaduria")) {
            return "Ciencias Economicas y Sociales";
        } else if (compareStrings(_carrera, "Educacion")) {
            return "Ciencias y Artes";
        } else if (compareStrings(_carrera, "Idiomas")) {
            return "Ciencias y Artes";
        } else if (compareStrings(_carrera, "Psicologia")) {
            return "Ciencias y Artes";
        } else if (compareStrings(_carrera, "Mate. Industriales")) {
            return "Ciencias y Artes";
        } else if (compareStrings(_carrera, "Est. Liberales")) {
            return "Estudios Juridicos y Politicos";
        } else if (compareStrings(_carrera, "Derecho")) {
            return "Estudios Juridicos y Politicos";
        }
    }

    function checkVotanteEnFacultad(uint _id, string memory _facultad) public view returns (bool) {
        return votantesFacultades[_id][_facultad];
    }

    function getParticipatingSections(uint _id) public view returns (string[] memory) {
        uint facCounter = getFacultyCount(_id);
        uint escuelaCounter = votantes[_id].carreras.length;
        uint sectionCounter = (3 + facCounter + escuelaCounter * 2);
        string[] memory secciones = new string[](sectionCounter);

        secciones[0] = "Junta Directiva FCE";
        secciones[1] = "Coordinacion FCE";
        secciones[2] = "Consejo Academico";
        string[] memory _facultades = new string[](facCounter);
        uint i = 0;
        if (checkVotanteEnFacultad(_id, "Ingenieria")) {
            _facultades[i] = "Ingenieria";
            ++i;
        }
        if (checkVotanteEnFacultad(_id, "Ciencias Economicas y Sociales")) {
            _facultades[i] = "Ciencias Economicas y Sociales";
            ++i;
        }
        if (checkVotanteEnFacultad(_id, "Ciencias y Artes")) {
            _facultades[i] = "Ciencias y Artes";
            ++i;
        }
        if (checkVotanteEnFacultad(_id, "Estudios Juridicos y Politicos")) {
            _facultades[i] = "Estudios Juridicos y Politicos";
            ++i;
        }
        for (uint j = 0; j < _facultades.length; j++) {
            secciones[j + 3] = string.concat("Consejo de Facultad de ", _facultades[j]);
        }
        for (uint k = 0; k < votantes[_id].carreras.length; k++) {
            secciones[k + 3 + facCounter] = string.concat("Consejo de Escuela de ", votantes[_id].carreras[k]);
        }
        for (uint l = 0; l < votantes[_id].carreras.length; l++) {
            secciones[l + 3 + facCounter + escuelaCounter] = string.concat("Centro de Estudiantes de ", votantes[_id].carreras[l]);
        }

        return secciones;
    }

    function getFacultyCount(uint _id) public view returns (uint) {
        uint facCounter = 0;
        if (checkVotanteEnFacultad(_id, "Ingenieria")) {
            facCounter++;
        }
        if (checkVotanteEnFacultad(_id, "Ciencias Economicas y Sociales")) {
            facCounter++;
        }
        if (checkVotanteEnFacultad(_id, "Ciencias y Artes")) {
            facCounter++;
        }
        if (checkVotanteEnFacultad(_id, "Estudios Juridicos y Politicos")) {
            facCounter++;
        }
        return facCounter;
    }

    // function checkRegisteredFacultad(string memory _facultad, string[] memory _facultadesRegistradas) public pure returns (bool) {
    //     for (uint i = 0; i < _facultadesRegistradas.length; ++i) {
    //         if (keccak256(abi.encodePacked(_facultadesRegistradas[i])) == keccak256(abi.encodePacked(_facultad))) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    function checkRegisteredVoter(uint _id) public view returns (bool) {
        if (votantes[_id].id == _id) {
            return true;
        }
        return false;
    }

    function inRegistroElectoral(uint _id) public view returns (bool) {
        return registroElectoral[_id];
    }

    function agregarARegistroElectoral(uint _id) public {
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar votantes");
        require(!inRegistroElectoral(_id), "Votante ya registrado en el registro electoral");
        registroElectoral[_id] = true;
    }

    function getVotante(uint _id) public view returns (Votante memory) {
        return votantes[_id];
    }


    // struct Candidate {
    //     string name;
    //     string PartyLib.Party;
    //     string degree;
    //     uint256 voteCount;
    //     uint id;
    // }

    // struct Voter {
    //     bool isRegistered;
    //     bool hasVoted;
    //     string voterID; 
    //     string[] carreras;
    // }

    // struct Result {
    //     string name;
    //     uint256 voteCount;
    // }





    // function registerVoter(string memory voterID, address _voterAddress, string memory carrera) public onlyOwner {
    //     require(
    //         !voters[_voterAddress].isRegistered || !carreraRegistrada(carrera, _voterAddress),
    //         "the voter is already registered"
    //     );

    //     if (!voters[_voterAddress].isRegistered){
    //         voters[_voterAddress].isRegistered = true;
    //         voters[_voterAddress].hasVoted = false;
    //         voters[_voterAddress].voterID = voterID;
    //     }
        
    //     voters[_voterAddress].carreras.push(carrera);

    //     emit VoterRegisteredEvent(_voterAddress);
    // }

    // function carreraRegistrada(string memory carrera, address _voterAddress) public view returns (bool){
    //     for(uint i = 0; i < voters[_voterAddress].carreras.length; ++i){
    //         if(keccak256(abi.encodePacked(voters[_voterAddress].carreras[i])) == keccak256(abi.encodePacked(carrera))){
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // function registerCandidate(string memory _name, string memory _PartyLib.Party, string memory _degree) public onlyOwner {
    //     candidates.push(
    //         Candidate({name: _name, PartyLib.Party: _PartyLib.Party, degree: _degree, voteCount: 0, id: candidates.length})
    //     );

    //     if (!isPartyLib.PartyRegistered(_PartyLib.Party)) {
    //         parties.push(_PartyLib.Party);
    //     }

    //     emit CandidateRegisteredEvent(candidates.length - 1);
    // }

    // function isPartyLib.PartyRegistered(string memory PartyLib.Party) public view returns (bool) {
    //     for (uint i = 0; i < parties.length; ++i) {
    //         if (keccak256(abi.encodePacked(parties[i])) == keccak256(abi.encodePacked(PartyLib.Party))) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // function vote(uint256 candidateId)
    //     public
    //     onlyRegisteredVoter
    // {
    //     require(!voters[msg.sender].hasVoted, "the caller has already voted");

    //     voters[msg.sender].hasVoted = true;
    //     candidates[candidateId].voteCount += 1;
    //     voterRegistry.push(voters[msg.sender].voterID);

    //     emit VotedEvent(msg.sender, candidateId);
    // }

    // function getCandidateById(uint256 candidateId)
    //     public
    //     view
    //     returns (
    //         string memory name,
    //         string memory PartyLib.Party,
    //         string memory degree,
    //         uint256 voteCount,
    //         uint id
    //     )
    // {
    //     for (uint i = 0; i < candidates.length; ++i) {
    //         if (candidates[i].id == candidateId) {
    //             return (candidates[i].name, candidates[i].PartyLib.Party, candidates[i].degree, candidates[i].voteCount, candidates[i].id);
    //         }
    //     }
    // }

    // function getCandidateByName(string memory Sname)
    //     public
    //     view
    //     returns (
    //         string memory name,
    //         string memory PartyLib.Party,
    //         string memory degree,
    //         uint256 voteCount
    //     )
    // {
    //     for (uint i = 0; i < candidates.length; ++i) {
    //         if (keccak256(abi.encodePacked(candidates[i].name)) == keccak256(abi.encodePacked(Sname))) {
    //             return (candidates[i].name, candidates[i].PartyLib.Party, candidates[i].degree, candidates[i].voteCount);
    //         }
    //     }
    // }

    // function getAllCandidates()
    //     public
    //     view
    //     returns (Candidate[] memory)
    // {
    //     return candidates;
    // }

    // function getWinner() public view returns (Result memory) {
    //     uint256 winnerIndex = 0;
    //     for (uint256 i = 1; i < candidates.length; ++i) {
    //         if (candidates[i].voteCount > candidates[winnerIndex].voteCount) {
    //             winnerIndex = i;
    //         }
    //     }
    //     return Result(candidates[winnerIndex].name, candidates[winnerIndex].voteCount);
    // }

    // function getTotalVotes() public view returns (uint256) {
    //     uint256 totalVotes = 0;
    //     for (uint256 i = 0; i < candidates.length; ++i) {
    //         totalVotes += candidates[i].voteCount;
    //     }
    //     return totalVotes;
    // }

    // function getPercentage() public view returns (uint256[] memory) {
    //     uint256 totalVotes = getTotalVotes();
    //     uint256[] memory percentage = new uint256[](candidates.length);
    //     for (uint256 i = 0; i < candidates.length; ++i) {
    //         percentage[i] = ((candidates[i].voteCount * 100) / totalVotes);
    //     }
    //     return percentage;
    // }

    // function getVoterRegistry() public view returns (string[] memory) {
        
    //     string[] memory myRegistry = new string[](voterRegistry.length);
    //     for(uint i = 0; i < voterRegistry.length; ++i){
    //         myRegistry[i] = voterRegistry[i];
    //     }
    //     return myRegistry;
    // }

    // function getVoterCarreras(address _voterAddress) public view returns (string[] memory) {
    //     return voters[_voterAddress].carreras;
    // }
}