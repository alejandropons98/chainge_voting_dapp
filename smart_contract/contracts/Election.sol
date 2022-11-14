// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
// import "./Party.sol";


contract Election {
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

    struct Party {
        string name;
        string siglas;
    }

    struct CandidateConsejero {
        string nombre;
        uint id;
        string degree;
        uint voteCount;
    }

    struct CandidateConsejoFacultad {
        string nombreAgrupacion;
        string siglasAgrupacion;
        uint voteCount;
    }

    struct CandidateConsejoEscuela {
        string nombreAgrupacion;
        string siglasAgrupacion;
        uint voteCount;
    }

    struct CandidateCentroEstudiantes {
        string nombreAgrupacion;
        string siglasAgrupacion;
        uint voteCount;
    }

    struct CandidateJuntaDirectiva {
        string nombreAgrupacion;
        string siglasAgrupacion;
        uint voteCount;
    }

    struct CandidateCoordinacion {
        string nombreAgrupacion;
        string siglasAgrupacion;
        uint voteCount;
    }   

    Party[] public agrupacionesRegistradas;

    CandidateConsejero[] public candidatosConsejoAcademico;
    CandidateJuntaDirectiva[] public candidatosJuntaDirectivaFCE;
    CandidateCoordinacion[] public candidatosCoordinacionFCE;

    mapping (string => CandidateConsejoFacultad[]) public candidatosConsejoFacultad;
    mapping (string => CandidateConsejoEscuela[]) public candidatosConsejoEscuela;
    mapping (string => CandidateCentroEstudiantes[]) public candidatosCentroEstudiante;

    // TODO: Para los check puedo quitar la comparacion de las siglas para que sea mas eficiente, aunque quizas seria mejor
    // hacer la comparacion pero con un OR para que no se repitan siglas
    function addAgrupacion(string memory _name, string memory _siglas) public {
        require(!checkAgrupacion(_name, _siglas), "Agrupacion ya registrada");
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar agrupaciones");
        agrupacionesRegistradas.push(Party(_name, _siglas));
    }

    function checkAgrupacion(string memory _name, string memory _siglas) public view returns (bool) {
        for (uint i = 0; i < agrupacionesRegistradas.length; i++) {
            if (keccak256(abi.encodePacked(agrupacionesRegistradas[i].name)) == keccak256(abi.encodePacked(_name)) && keccak256(abi.encodePacked(agrupacionesRegistradas[i].siglas)) == keccak256(abi.encodePacked(_siglas))) {
                return true;
            }
        }
        return false;
    }

    function getAgrupaciones() public view returns (Party[] memory) {
        return agrupacionesRegistradas;
    }

    function getAgrupacion(string memory _name) public view returns (Party memory agrupacion) {
        for (uint i = 0; i < agrupacionesRegistradas.length; i++) {
            if (keccak256(abi.encodePacked(agrupacionesRegistradas[i].name)) == keccak256(abi.encodePacked(_name))) {
                return agrupacionesRegistradas[i];
            }
        }
    }

    function addConsejoFacultad(Party memory _agrupacion, string memory _facultad) public {
        require(checkAgrupacion(_agrupacion.name, _agrupacion.siglas), "Agrupacion no registrada");
        require(!checkConsejoFacultad(_agrupacion, _facultad), "Agrupacion ya registrada en este consejo");
        require(checkInFacultades(_facultad), "Facultad no registrada");
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar candidatos");
        candidatosConsejoFacultad[_facultad].push(CandidateConsejoFacultad(_agrupacion.name, _agrupacion.siglas, 0));
    }

    function checkConsejoFacultad(Party memory _agrupacion, string memory _facultad) public view returns (bool) {
        for (uint i = 0; i < candidatosConsejoFacultad[_facultad].length; i++) {
            if (keccak256(abi.encodePacked(candidatosConsejoFacultad[_facultad][i].nombreAgrupacion)) == keccak256(abi.encodePacked(_agrupacion.name)) && keccak256(abi.encodePacked(candidatosConsejoFacultad[_facultad][i].siglasAgrupacion)) == keccak256(abi.encodePacked(_agrupacion.siglas))) {
                return true;
            }
        }
        return false;
    }

    function checkInFacultades(string memory _facultad) public view returns (bool) {
        for (uint i = 0; i < facultades.length; i++) {
            if (keccak256(abi.encodePacked(facultades[i])) == keccak256(abi.encodePacked(_facultad))) {
                return true;
            }
        }
        return false;
    }

    function addConsejoEscuela(Party memory _agrupacion, string memory _escuela) public {
        require(checkAgrupacion(_agrupacion.name, _agrupacion.siglas), "Agrupacion no registrada");
        require(!checkConsejoEscuela(_agrupacion, _escuela), "Agrupacion ya registrada en este consejo");
        require(checkInEscuelas(_escuela), "Escuela no registrada");
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar candidatos");
        candidatosConsejoEscuela[_escuela].push(CandidateConsejoEscuela(_agrupacion.name, _agrupacion.siglas, 0));
    }

    function checkConsejoEscuela(Party memory _agrupacion, string memory _escuela) public view returns (bool) {
        for (uint i = 0; i < candidatosConsejoEscuela[_escuela].length; i++) {
            if (keccak256(abi.encodePacked(candidatosConsejoEscuela[_escuela][i].nombreAgrupacion)) == keccak256(abi.encodePacked(_agrupacion.name)) && keccak256(abi.encodePacked(candidatosConsejoEscuela[_escuela][i].siglasAgrupacion)) == keccak256(abi.encodePacked(_agrupacion.siglas))) {
                return true;
            }
        }
        return false;
    }

    function checkInEscuelas(string memory _escuela) public view returns (bool) {
        for (uint i = 0; i < escuelas.length; i++) {
            if (keccak256(abi.encodePacked(escuelas[i])) == keccak256(abi.encodePacked(_escuela))) {
                return true;
            }
        }
        return false;
    }

    function addCentroEstudiantes(Party memory _agrupacion, string memory _escuela) public {
        require(checkAgrupacion(_agrupacion.name, _agrupacion.siglas), "Agrupacion no registrada");
        require(!checkCentroEstudiantes(_agrupacion, _escuela), "Agrupacion ya registrada en este consejo");
        require(checkInEscuelas(_escuela), "Centro no registrado");
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar candidatos");
        candidatosCentroEstudiante[_escuela].push(CandidateCentroEstudiantes(_agrupacion.name, _agrupacion.siglas, 0));
    }

    function checkCentroEstudiantes(Party memory _agrupacion, string memory _escuela) public view returns (bool) {
        for (uint i = 0; i < candidatosCentroEstudiante[_escuela].length; i++) {
            if (keccak256(abi.encodePacked(candidatosCentroEstudiante[_escuela][i].nombreAgrupacion)) == keccak256(abi.encodePacked(_agrupacion.name)) && keccak256(abi.encodePacked(candidatosCentroEstudiante[_escuela][i].siglasAgrupacion)) == keccak256(abi.encodePacked(_agrupacion.siglas))) {
                return true;
            }
        }
        return false;
    }

    function addJuntaDirectiva(Party memory _agrupacion) public {
        require(checkAgrupacion(_agrupacion.name, _agrupacion.siglas), "Agrupacion no registrada");
        require(!checkJuntaDirectiva(_agrupacion), "Agrupacion ya registrada en este consejo");
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar candidatos");
        candidatosJuntaDirectivaFCE.push(CandidateJuntaDirectiva(_agrupacion.name, _agrupacion.siglas, 0));
    }

    function checkJuntaDirectiva(Party memory _agrupacion) public view returns (bool) {
        for (uint i = 0; i < candidatosJuntaDirectivaFCE.length; i++) {
            if (keccak256(abi.encodePacked(candidatosJuntaDirectivaFCE[i].nombreAgrupacion)) == keccak256(abi.encodePacked(_agrupacion.name)) && keccak256(abi.encodePacked(candidatosJuntaDirectivaFCE[i].siglasAgrupacion)) == keccak256(abi.encodePacked(_agrupacion.siglas))) {
                return true;
            }
        }
        return false;
    }

    function addCoordinacionFCE(Party memory _agrupacion) public {
        require(checkAgrupacion(_agrupacion.name, _agrupacion.siglas), "Agrupacion no registrada");
        require(!checkCoordinacion(_agrupacion), "Agrupacion ya registrada en este consejo");
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar candidatos");
        candidatosCoordinacionFCE.push(CandidateCoordinacion(_agrupacion.name, _agrupacion.siglas, 0));
    }

    function checkCoordinacion(Party memory _agrupacion) public view returns (bool) {
        for (uint i = 0; i < candidatosCoordinacionFCE.length; i++) {
            if (keccak256(abi.encodePacked(candidatosCoordinacionFCE[i].nombreAgrupacion)) == keccak256(abi.encodePacked(_agrupacion.name)) && keccak256(abi.encodePacked(candidatosCoordinacionFCE[i].siglasAgrupacion)) == keccak256(abi.encodePacked(_agrupacion.siglas))) {
                return true;
            }
        }
        return false;
    }

    function addConsejeroAcademico(string memory _name, uint _id, string memory _major) public {
        require(msg.sender == owner, "Solo el dueno del contrato puede registrar candidatos");
        require(!checkConsejeroAcademico(_id), "Consejero ya registrado");
        candidatosConsejoAcademico.push(CandidateConsejero(_name, _id, _major, 0));
    }

    function checkConsejeroAcademico(uint _id) public view returns (bool) {
        for (uint i = 0; i < candidatosConsejoAcademico.length; i++) {
            if (candidatosConsejoAcademico[i].id == _id) {
                return true;
            }
        }
        return false;
    }

    function getCandidateConsejoAcademico(uint _id) public view returns (CandidateConsejero memory candidate) {
        for (uint i = 0; i < candidatosConsejoAcademico.length; i++) {
            if (candidatosConsejoAcademico[i].id == _id) {
                return candidatosConsejoAcademico[i];
            }
        }
    }

    function getAllCandidatesConsejoAcademico() public view returns (CandidateConsejero[] memory) {
        return candidatosConsejoAcademico;
    }

    function getCandidatosConsejoFacultad(string memory _facultad) public view returns (CandidateConsejoFacultad[] memory) {
        return candidatosConsejoFacultad[_facultad];
    }

    function getCandidatosConsejoEscuela(string memory _escuela) public view returns (CandidateCentroEstudiantes[] memory) {
        return candidatosCentroEstudiante[_escuela];
    }

    function getCandidatosCentroEstudiante(string memory _escuela) public view returns (CandidateCentroEstudiantes[] memory) {
        return candidatosCentroEstudiante[_escuela];
    }

    function getCandidatosdCoordinacionFCE() public view returns (CandidateCoordinacion[] memory) {
        return candidatosCoordinacionFCE;
    }

    function getCandidatosJuntaDirectivaFCE() public view returns (CandidateJuntaDirectiva[] memory) {
        return candidatosJuntaDirectivaFCE;
    }


    // Votantes

    struct Votante {
        uint id;
        string[] carreras;
        bool voted;
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
        votantes[_id] = Votante(_id, _carreras, false);
        registerVotanteFacultad(votantes[_id]);
    }

    function registerVotanteFacultad(Votante memory _votante) public {
        string[] memory carreras = _votante.carreras;
        for (uint i = 0; i < carreras.length; i++) {
            votantesFacultades[_votante.id][getFacultadCarrera(carreras[i])] = true;
        }
    }

    function getFacultadCarrera(string memory _carrera) public pure returns (string memory) {
        if (keccak256(abi.encodePacked(_carrera)) == keccak256(abi.encodePacked("Ing. Quimica"))) {
            return "Ingenieria";
        } else if (keccak256(abi.encodePacked(_carrera)) == keccak256(abi.encodePacked("Ing. de Sistemas"))) {
            return "Ingenieria";
        } else if (keccak256(abi.encodePacked(_carrera)) == keccak256(abi.encodePacked("Ing. Civil"))) {
            return "Ingenieria";
        } else if (keccak256(abi.encodePacked(_carrera)) == keccak256(abi.encodePacked("Ing. Mecanica"))) {
            return "Ingenieria";
        } else if (keccak256(abi.encodePacked(_carrera)) == keccak256(abi.encodePacked("Ing. de Produccion"))) {
            return "Ingenieria";
        } else if (keccak256(abi.encodePacked(_carrera)) == keccak256(abi.encodePacked("Ing. Electrica"))) {
            return "Ingenieria";
        } else if (keccak256(abi.encodePacked(_carrera)) == keccak256(abi.encodePacked("Administracion"))) {
            return "Ciencias Economicas y Sociales";
        } else if (keccak256(abi.encodePacked(_carrera)) == keccak256(abi.encodePacked("Economia"))) {
            return "Ciencias Economicas y Sociales";
        } else if (keccak256(abi.encodePacked(_carrera)) == keccak256(abi.encodePacked("Contaduria"))) {
            return "Ciencias Economicas y Sociales";
        } else if (keccak256(abi.encodePacked(_carrera)) == keccak256(abi.encodePacked("Educacion"))) {
            return "Ciencias y Artes";
        } else if (keccak256(abi.encodePacked(_carrera)) == keccak256(abi.encodePacked("Idiomas"))) {
            return "Ciencias y Artes";
        } else if (keccak256(abi.encodePacked(_carrera)) == keccak256(abi.encodePacked("Psicologia"))) {
            return "Ciencias y Artes";
        } else if (keccak256(abi.encodePacked(_carrera)) == keccak256(abi.encodePacked("Mate. Industriales"))) {
            return "Ciencias y Artes";
        } else if (keccak256(abi.encodePacked(_carrera)) == keccak256(abi.encodePacked("Est. Liberales"))) {
            return "Estudios Juridicos y Politicos";
        } else if (keccak256(abi.encodePacked(_carrera)) == keccak256(abi.encodePacked("Derecho"))) {
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
        string[] memory facultades = new string[](facCounter);
        uint i = 0;
        if (checkVotanteEnFacultad(_id, "Ingenieria")) {
            facultades[i] = "Ingenieria";
            i++;
        }
        if (checkVotanteEnFacultad(_id, "Ciencias Economicas y Sociales")) {
            facultades[i] = "Ciencias Economicas y Sociales";
            i++;
        }
        if (checkVotanteEnFacultad(_id, "Ciencias y Artes")) {
            facultades[i] = "Ciencias y Artes";
            i++;
        }
        if (checkVotanteEnFacultad(_id, "Estudios Juridicos y Politicos")) {
            facultades[i] = "Estudios Juridicos y Politicos";
            i++;
        }
        for (uint j = 0; j < facultades.length; j++) {
            secciones[j + 3] = string.concat("Consejo de Facultad de ", facultades[j]);
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
    //     for (uint i = 0; i < _facultadesRegistradas.length; i++) {
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
    //     string party;
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
    //     for(uint i = 0; i < voters[_voterAddress].carreras.length; i++){
    //         if(keccak256(abi.encodePacked(voters[_voterAddress].carreras[i])) == keccak256(abi.encodePacked(carrera))){
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // function registerCandidate(string memory _name, string memory _party, string memory _degree) public onlyOwner {
    //     candidates.push(
    //         Candidate({name: _name, party: _party, degree: _degree, voteCount: 0, id: candidates.length})
    //     );

    //     if (!isPartyRegistered(_party)) {
    //         parties.push(_party);
    //     }

    //     emit CandidateRegisteredEvent(candidates.length - 1);
    // }

    // function isPartyRegistered(string memory party) public view returns (bool) {
    //     for (uint i = 0; i < parties.length; i++) {
    //         if (keccak256(abi.encodePacked(parties[i])) == keccak256(abi.encodePacked(party))) {
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
    //         string memory party,
    //         string memory degree,
    //         uint256 voteCount,
    //         uint id
    //     )
    // {
    //     for (uint i = 0; i < candidates.length; i++) {
    //         if (candidates[i].id == candidateId) {
    //             return (candidates[i].name, candidates[i].party, candidates[i].degree, candidates[i].voteCount, candidates[i].id);
    //         }
    //     }
    // }

    // function getCandidateByName(string memory Sname)
    //     public
    //     view
    //     returns (
    //         string memory name,
    //         string memory party,
    //         string memory degree,
    //         uint256 voteCount
    //     )
    // {
    //     for (uint i = 0; i < candidates.length; i++) {
    //         if (keccak256(abi.encodePacked(candidates[i].name)) == keccak256(abi.encodePacked(Sname))) {
    //             return (candidates[i].name, candidates[i].party, candidates[i].degree, candidates[i].voteCount);
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
    //     for (uint256 i = 1; i < candidates.length; i++) {
    //         if (candidates[i].voteCount > candidates[winnerIndex].voteCount) {
    //             winnerIndex = i;
    //         }
    //     }
    //     return Result(candidates[winnerIndex].name, candidates[winnerIndex].voteCount);
    // }

    // function getTotalVotes() public view returns (uint256) {
    //     uint256 totalVotes = 0;
    //     for (uint256 i = 0; i < candidates.length; i++) {
    //         totalVotes += candidates[i].voteCount;
    //     }
    //     return totalVotes;
    // }

    // function getPercentage() public view returns (uint256[] memory) {
    //     uint256 totalVotes = getTotalVotes();
    //     uint256[] memory percentage = new uint256[](candidates.length);
    //     for (uint256 i = 0; i < candidates.length; i++) {
    //         percentage[i] = ((candidates[i].voteCount * 100) / totalVotes);
    //     }
    //     return percentage;
    // }

    // function getVoterRegistry() public view returns (string[] memory) {
        
    //     string[] memory myRegistry = new string[](voterRegistry.length);
    //     for(uint i = 0; i < voterRegistry.length; i++){
    //         myRegistry[i] = voterRegistry[i];
    //     }
    //     return myRegistry;
    // }

    // function getVoterCarreras(address _voterAddress) public view returns (string[] memory) {
    //     return voters[_voterAddress].carreras;
    // }
}