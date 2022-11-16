// SPDX-Licence-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Candidate {
    uint internal voteCount = 0;

    function vote() public {
        voteCount++;
    }

    function totalVotes() public view returns (uint) {
        return voteCount;
    }
}

contract ConsejoAcademico is Candidate {
    string public name;
    uint public id;
    string public carrera;

    constructor(string memory _name, uint _id ,string memory _carrera) Candidate() {
        name = _name;
        id = _id;
        carrera = _carrera;
    }
}

contract CandidatoFCE is Candidate {
    string public agrupacion;
    string public siglas;

    constructor(string memory _agrupacion, string memory _siglas) Candidate() {
        agrupacion = _agrupacion;
        siglas = _siglas;
    }
}

contract JuntaDirectivaFCE is CandidatoFCE {
    string public seccion;

    constructor(string memory _agrupacion, string memory _siglas) CandidatoFCE(_agrupacion, _siglas) {
        seccion = "Junta Directiva";
    }
}

contract CoordinacionFCE is CandidatoFCE {
    string public seccion;

    constructor(string memory _agrupacion, string memory _siglas) CandidatoFCE(_agrupacion, _siglas) {
        seccion = "Coordinacion";
    }
}


contract CentroEstudiantes is Candidate {
    string public nombre;
    string public siglas;
    string public escuela;

    constructor(string memory _nombre, string memory _siglas, string memory _escuela) Candidate() {
        nombre = _nombre;
        siglas = _siglas;
        escuela = _escuela;
    }
}

contract ConsejoEscuela is Candidate {
    string public nombre;
    string public siglas;
    string public escuela;

    constructor(string memory _nombre, string memory _siglas, string memory _escuela) Candidate() {
        nombre = _nombre;
        siglas = _siglas;
        escuela = _escuela;
    }
}

contract ConsejoFacultad is Candidate {
    string public nombre;
    string public siglas;
    string public facultad;

    constructor(string memory _nombre, string memory _siglas, string memory _facultad) Candidate() {
        nombre = _nombre;
        siglas = _siglas;
        facultad = _facultad;
    }
}

// contract CandidateList {
//     address public owner;
    
//     mapping (uint => mapping (address => ConsejoAcademico)) public candidatosConsejoAcademico;
//     mapping (string => mapping (address => CandidatoFCE)) public candidatosFCE;
//     mapping (string => mapping (address => CentroEstudiantes)) public candidatosCentroEstudiantes;
//     mapping (string => mapping (address => ConsejoEscuela)) public candidatosConsejoEscuela;
//     mapping (string => mapping (address => ConsejoFacultad)) public candidatosConsejoFacultad;

//     constructor () {
//         owner = msg.sender;
//     }
//     // address[] public candidatosConsejoAcademicoAccts;
//     // address[] public candidatosFCEAccts;
//     // address[] public candidatosCentroEstudiantesAccts;
//     // address[] public candidatosConsejoEscuelaAccts;
//     // address[] public candidatosConsejoFacultadAccts;

//     function addCandidateConsejoAcademico(string memory _name, uint _id, string memory _carrera) public {
//         ConsejoAcademico candidate = new ConsejoAcademico(_name, _id, _carrera);
//         candidatosConsejoAcademico[_id][msg.sender] = candidate;
//     }

//     function addCandidateFCE(string memory _agrupacion, uint _siglas, string memory _seccion) public {
//         CandidatoFCE candidate = new CandidatoFCE(_agrupacion, _siglas);
//         candidatosFCE[_seccion][msg.sender] = candidate;
//     }

//     function addCandidateCentroEstudiantes(string memory _nombre, string memory _siglas, string memory _escuela) public {
//         CentroEstudiantes candidate = new CentroEstudiantes(_nombre, _siglas, _escuela);
//         candidatosCentroEstudiantes[_escuela][msg.sender] = candidate;
//     }

//     function addCandidateConsejoEscuela(string memory _nombre, string memory _siglas, string memory _escuela) public {
//         ConsejoEscuela candidate = new ConsejoEscuela(_nombre, _siglas, _escuela);
//         candidatosConsejoEscuela[_escuela][msg.sender] = candidate;
//     }

//     function addCandidateConsejoFacultad(string memory _nombre, string memory _siglas, string memory _facultad) public {
//         ConsejoFacultad candidate = new ConsejoFacultad(_nombre, _siglas, _facultad);
//         candidatosConsejoFacultad[_facultad][msg.sender] = candidate;
//     }

// }

