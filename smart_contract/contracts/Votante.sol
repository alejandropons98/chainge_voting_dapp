// SPDX-Licence-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Votante {
    uint studentId;
    string[] carreras;
    string[] facultades;
    bool voted;
    bool votedConsejoAcademico;
    bool votedJuntaDirectivaFCE;
    bool votedCoordinacionFCE;
    bool votedCentroEstudiantes;
    bool votedConsejoEscuela;
    bool votedConsejoFacultad;
    uint numeroVotosCentroEst;
    uint numeroVotosCF;
    uint numeroVotosCE;

    constructor (uint _id, string[] memory _carreras) {
        studentId = _id;
        carreras = _carreras;
        voted = false;
        votedConsejoAcademico = false;
        votedJuntaDirectivaFCE = false;
        votedCoordinacionFCE = false;
        votedCentroEstudiantes = false;
        votedConsejoEscuela = false;
        votedConsejoFacultad = false;
        numeroVotosCentroEst = carreras.length;
        numeroVotosCE = carreras.length;
    }

    function addFacultades(string[] memory _facultades) public {
        facultades = _facultades;
        numeroVotosCF = facultades.length;
    }

    function getID() public view returns (uint) {
        return studentId;
    }

    function votarConsejoAcademico() public {
        require(!votedConsejoAcademico);
        votedConsejoAcademico = true;
        voted = votedConsejoAcademico && votedJuntaDirectivaFCE && votedCoordinacionFCE && votedCentroEstudiantes && votedConsejoEscuela && votedConsejoFacultad;
    }

    function votarJuntaDirectivaFCE() public {
        require(!votedJuntaDirectivaFCE);
        votedJuntaDirectivaFCE = true;
        voted = votedConsejoAcademico && votedJuntaDirectivaFCE && votedCoordinacionFCE && votedCentroEstudiantes && votedConsejoEscuela && votedConsejoFacultad;
    }

    function votarCoordinacionFCE() public {
        require(!votedCoordinacionFCE);
        votedCoordinacionFCE = true;
        voted = votedConsejoAcademico && votedJuntaDirectivaFCE && votedCoordinacionFCE && votedCentroEstudiantes && votedConsejoEscuela && votedConsejoFacultad;
    }

    function votarCentroEstudiantes() public {
        require(!votedCentroEstudiantes);
        numeroVotosCentroEst--;
        votedCentroEstudiantes = numeroVotosCentroEst == 0;
        voted = votedConsejoAcademico && votedJuntaDirectivaFCE && votedCoordinacionFCE && votedCentroEstudiantes && votedConsejoEscuela && votedConsejoFacultad;
    }

    function votarConsejoEscuela() public {
        require(!votedConsejoEscuela);
        numeroVotosCE--;
        votedConsejoEscuela = numeroVotosCE == 0;
        voted = votedConsejoAcademico && votedJuntaDirectivaFCE && votedCoordinacionFCE && votedCentroEstudiantes && votedConsejoEscuela && votedConsejoFacultad;
    }

    function votarConsejoFacultad() public {
        require(!votedConsejoFacultad);
        numeroVotosCF--;
        votedConsejoFacultad = numeroVotosCF == 0;
        voted = votedConsejoAcademico && votedJuntaDirectivaFCE && votedCoordinacionFCE && votedCentroEstudiantes && votedConsejoEscuela && votedConsejoFacultad;
    }

    function canVote() public view returns (bool) {
        return !voted;
    }
}