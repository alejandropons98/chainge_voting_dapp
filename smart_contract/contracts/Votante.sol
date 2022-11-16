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

    constructor (uint _id, string[] memory _carreras, string[] memory _facultades) {
        studentId = _id;
        carreras = _carreras;
        facultades = _facultades;
        voted = false;
        votedConsejoAcademico = false;
        votedJuntaDirectivaFCE = false;
        votedCoordinacionFCE = false;
        votedCentroEstudiantes = false;
        votedConsejoEscuela = false;
        votedConsejoFacultad = false;
        numeroVotosCentroEst = carreras.length;
        numeroVotosCE = carreras.length;
        numeroVotosCF = facultades.length;
    }

    function getID() public view returns (uint) {
        return studentId;
    }

    function getCarreras() public view returns (string[] memory) {
        return carreras;
    }

    function getFacultades() public view returns (string[] memory) {
        return facultades;
    }

    function getVoted() public view returns (bool) {
        if (!getVotedCentroEstudiantes() || !getVotedConsejoFacultad() || !getVotedConsejoEscuela() || !getVotedCoordinacionFCE() || !getVotedJuntaDirectivaFCE() || !getVotedConsejoAcademico()) {
            return false;
        }
        return true;
    }

    function getVotedConsejoAcademico() public view returns (bool) {
        return votedConsejoAcademico;
    }

    function getVotedJuntaDirectivaFCE() public view returns (bool) {
        return votedJuntaDirectivaFCE;
    }

    function getVotedCoordinacionFCE() public view returns (bool) {
        return votedCoordinacionFCE;
    }

    function getVotedCentroEstudiantes() public view returns (bool) {
        return votedCentroEstudiantes;
    }

    function getVotedConsejoEscuela() public view returns (bool) {
        return votedConsejoEscuela;
    }

    function getVotedConsejoFacultad() public view returns (bool) {
        return votedConsejoFacultad;
    }

    function getNumeroVotosCentroEst() public view returns (uint) {
        return numeroVotosCentroEst;
    }

    function getNumeroVotosCF() public view returns (uint) {
        return numeroVotosCF;
    }

    function getNumeroVotosCE() public view returns (uint) {
        return numeroVotosCE;
    }

    function votarConsejoAcademico() public {
        require(!votedConsejoAcademico);
        votedConsejoAcademico = true;
    }

    function votarJuntaDirectivaFCE() public {
        require(!votedJuntaDirectivaFCE);
        votedJuntaDirectivaFCE = true;
    }

    function votarCoordinacionFCE() public {
        require(!votedCoordinacionFCE);
        votedCoordinacionFCE = true;
    }

    function votarCentroEstudiantes() public {
        require(!votedCentroEstudiantes);
        numeroVotosCentroEst--;
        votedCentroEstudiantes = numeroVotosCentroEst == 0;
    }

    function votarConsejoEscuela() public {
        require(!votedConsejoEscuela);
        numeroVotosCE--;
        votedConsejoEscuela = numeroVotosCE == 0;
    }

    function votarConsejoFacultad() public {
        require(!votedConsejoFacultad);
        numeroVotosCF--;
        votedConsejoFacultad = numeroVotosCF == 0;
    }

    function canVote() public view returns (bool) {
        return !voted;
    }
}