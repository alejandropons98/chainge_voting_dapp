// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Party {
    // Election details

    string public name;
    string public siglas;

    address public owner;

    // mapping (string => bool) public seccionesDeParticipacion;
    // string[] public seccionesDeParticipacion;

    string[] public consejosFac;
    string[] public consejosEsc;
    string[] public centroEstudiantes;
    bool public juntaDirectiva;
    bool public coordinacion;
    bool public consejoAcademico;
    bool public consejoAcademicoAux;

    Candidate public consejeroAcademico;
    Candidate public consejeroAcademicoAux;

    constructor(string memory _name, string memory _siglas) {
        name = _name;
        siglas = _siglas;
        owner = msg.sender;
    }

    struct Candidate {
        string name;
        uint id;
        string degree;
    }

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

    string[] private seccionesFCE = [
        "Junta Directiva",
        "Coordinacion"
    ];

    function checkInEscuela(string memory _escuela) public view returns (bool) {
        for (uint i = 0; i < escuelas.length; i++) {
            if (keccak256(abi.encodePacked(escuelas[i])) == keccak256(abi.encodePacked(_escuela))) {
                return true;
            }
        }
        return false;
    }

    function checkInFacultad(string memory _facultad) public view returns (bool) {
        for (uint i = 0; i < facultades.length; i++) {
            if (keccak256(abi.encodePacked(facultades[i])) == keccak256(abi.encodePacked(_facultad))) {
                return true;
            }
        }
        return false;
    }

    function checkInSeccionFCE(string memory _seccion) public view returns (bool) {
        for (uint i = 0; i < seccionesFCE.length; i++) {
            if (keccak256(abi.encodePacked(seccionesFCE[i])) == keccak256(abi.encodePacked(_seccion))) {
                return true;
            }
        }
        return false;
    }

    function addConsejoFacultad(string memory _facultad) public {
        require(msg.sender == owner, "Solo el dueno de la cuenta puede agregar secciones");
        require(checkInFacultad(_facultad), "La facultad no existe");
        require(!checkIfConsejoFacultad(_facultad), "La facultad ya esta en la lista");
        consejosFac.push(_facultad);
    }

    function addConsejoEscuela(string memory _escuela) public {
        require(msg.sender == owner, "Solo el dueno de la cuenta puede agregar secciones");
        require(checkInEscuela(_escuela), "La escuela no existe");
        require(!checkIfConsejoEscuela(_escuela), "La escuela ya esta en la lista");
        consejosEsc.push(_escuela);
    }

    function addCentroEstudiantes(string memory _escuela) public {
        require(msg.sender == owner, "Solo el dueno de la cuenta puede agregar secciones");
        require(checkInEscuela(_escuela), "La escuela no existe");
        require(!checkIfCentroEstudiantes(_escuela), "La escuela ya esta en la lista");
        centroEstudiantes.push(_escuela);
    }

    function addJuntaDirectivaFCE() public {
        require(msg.sender == owner, "Solo el dueno de la cuenta puede agregar secciones");
        require(!juntaDirectiva, "La seccion ya esta en la lista");
        juntaDirectiva = true;
    }

    function addCoordinacionFCE() public {
        require(msg.sender == owner, "Solo el dueno de la cuenta puede agregar secciones");
        require(!coordinacion, "La seccion ya esta en la lista");
        coordinacion = true;
    }
    
    function addConsejeroAcademico(string memory _name, uint _id, string memory _degree) public {
        require(!consejoAcademico, "Ya hay un consejero academico");
        require(_id > 0, "El ID debe ser mayor a 0");
        require(msg.sender == owner, "Solo el dueno de la cuenta puede agregar candidatos");
        Candidate memory newCandidate = Candidate(_name, _id, _degree);
        require(checkRegisteredCandidate(newCandidate), "El candidato ya esta registrado");
        consejeroAcademico = newCandidate;
        consejoAcademico = true;
    }

    function addConsejeroAcademicoAux(string memory _name, uint _id, string memory _degree) public {
        require(_id > 0, "El ID debe ser mayor a 0");
        require(consejoAcademico, "El candidato principal no esta registrado");
        require(msg.sender == owner, "Solo el dueno de la cuenta puede agregar candidatos");
        Candidate memory newCandidate = Candidate(_name, _id, _degree);
        require(checkRegisteredCandidate(newCandidate), "El candidato ya esta registrado");
        require(!consejoAcademicoAux, "Ya hay un consejero academico auxiliar");
        consejeroAcademicoAux = newCandidate;
        consejoAcademicoAux = true;
    }

    function checkRegisteredCandidate(Candidate memory _candidate) public view returns (bool) {
        if (consejeroAcademico.id == _candidate.id) {
            return false;
        }
        if (consejeroAcademicoAux.id == _candidate.id) {
            return false;
        }
        return true;
    }

    function checkCandidateExists() public view returns (bool) {
        if (consejeroAcademico.id == 0) {
            return false;
        }
        return true;
    }

    function getConsejeroAcademico() public view returns (Candidate memory) {
        return consejeroAcademico;
    }

    function getConsejeroAcademicoAux() public view returns (Candidate memory) {
        return consejeroAcademicoAux;
    }

    function checkIfConsejoFacultad(string memory _consejo) public view returns (bool) {
        for (uint i = 0; i < consejosFac.length; i++) {
            if (keccak256(abi.encodePacked(consejosFac[i])) == keccak256(abi.encodePacked(_consejo))) {
                return true;
            }
        }
        return false;
    }

    function checkIfConsejoEscuela(string memory _consejo) public view returns (bool) {
        for (uint i = 0; i < consejosEsc.length; i++) {
            if (keccak256(abi.encodePacked(consejosEsc[i])) == keccak256(abi.encodePacked(_consejo))) {
                return true;
            }
        }
        return false;
    }

    function checkIfCentroEstudiantes(string memory _centro) public view returns (bool) {
        for (uint i = 0; i < centroEstudiantes.length; i++) {
            if (keccak256(abi.encodePacked(centroEstudiantes[i])) == keccak256(abi.encodePacked(_centro))) {
                return true;
            }
        }
        return false;
    }

    function checkIfJuntaDirectivaFCE() public view returns (bool) {
        return juntaDirectiva;
    }

    function checkIfCoordinacionFCE() public view returns (bool) {
        return coordinacion;
    }

    function checkIfConsejeroAcademico() public view returns (bool) {
        return consejoAcademico;
    }


    function getConsejoFacultad() public view returns (string[] memory) {
        string[] memory consejoFacultad = new string[](facultades.length);
        for (uint i = 0; i < facultades.length; i++) {
            consejoFacultad[i] = string.concat("Consejo de Facultad ", facultades[i]);
        }
        return consejoFacultad;
    }

}