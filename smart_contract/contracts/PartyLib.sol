// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./StringComp.sol";

library PartyLib {
    // Agrupaciones
    using StringComp for *;




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


    // TODO: Para los check puedo quitar la comparacion de las siglas para que sea mas eficiente, aunque quizas seria mejor
    // hacer la comparacion pero con un OR para que no se repitan siglas
    function addAgrupacion(string memory _name, string memory _siglas, address _owner, Party[] storage agrupacionesRegistradas) public {
        require(!checkAgrupacion(_name, _siglas, agrupacionesRegistradas), "Agrupacion ya registrada");
        require(msg.sender == _owner, "Solo el dueno del contrato puede registrar agrupaciones");
        agrupacionesRegistradas.push(Party(_name, _siglas));
    }

    function checkAgrupacion(string memory _name, string memory _siglas, Party[] storage agrupacionesRegistradas) public view returns (bool) {
        for (uint i = 0; i < agrupacionesRegistradas.length; ++i) {
            if(StringComp.compareStrings(agrupacionesRegistradas[i].name, _name) && StringComp.compareStrings(agrupacionesRegistradas[i].siglas, _siglas)) {
                return true;
            }
        }
        return false;
    }
// TODO: esto queda en eleccion
    // function getAgrupaciones() public view returns (Party[] memory) {
    //     return agrupacionesRegistradas;
    // }

    // function getAgrupacion(string memory _name) public view returns (Party memory agrupacion) {
    //     for (uint i = 0; i < agrupacionesRegistradas.length; ++i) {
    //         if(StringComp.compareStrings(agrupacionesRegistradas[i].name, _name)) {
    //             return agrupacionesRegistradas[i];
    //         }
    //     }
    // }

    function addConsejoFacultad(Party memory _agrupacion, string memory _facultad, address _owner, mapping (string => CandidateConsejoFacultad[]) storage candidatosConsejoFacultad, Party[] storage agrupacionesRegistradas, string[] calldata facultades) public {
        require(checkAgrupacion(_agrupacion.name, _agrupacion.siglas, agrupacionesRegistradas), "Agrupacion no registrada");
        require(!checkConsejoFacultad(_agrupacion, _facultad, candidatosConsejoFacultad), "Agrupacion ya registrada en este consejo");
        require(checkInFacultades(_facultad, facultades), "Facultad no registrada");
        require(msg.sender == _owner, "Solo el dueno del contrato puede registrar candidatos");
        candidatosConsejoFacultad[_facultad].push(CandidateConsejoFacultad(_agrupacion.name, _agrupacion.siglas, 0));
    }

    function checkConsejoFacultad(Party memory _agrupacion, string memory _facultad, mapping (string => CandidateConsejoFacultad[]) storage candidatosConsejoFacultad) public view returns (bool) {
        for (uint i = 0; i < candidatosConsejoFacultad[_facultad].length; ++i) {
            if (StringComp.compareStrings(candidatosConsejoFacultad[_facultad][i].nombreAgrupacion, _agrupacion.name) && StringComp.compareStrings(candidatosConsejoFacultad[_facultad][i].siglasAgrupacion, _agrupacion.siglas)) {
                return true;
            }
        }
        return false;
    }

    function checkInFacultades(string memory _facultad, string[] calldata facultades) public pure returns (bool) {
        for (uint i = 0; i < facultades.length; ++i) {
            if(StringComp.compareStrings(facultades[i], _facultad)) {
                return true;
            }
        }
        return false;
    }

    function addConsejoEscuela(Party memory _agrupacion, string memory _escuela, address _owner, mapping (string => CandidateConsejoEscuela[]) storage candidatosConsejoEscuela, Party[] storage agrupacionesRegistradas, string[] calldata escuelas) public {
        require(checkAgrupacion(_agrupacion.name, _agrupacion.siglas, agrupacionesRegistradas), "Agrupacion no registrada");
        require(!checkConsejoEscuela(_agrupacion, _escuela, candidatosConsejoEscuela), "Agrupacion ya registrada en este consejo");
        require(checkInEscuelas(_escuela, escuelas), "Escuela no registrada");
        require(msg.sender == _owner, "Solo el dueno del contrato puede registrar candidatos");
        candidatosConsejoEscuela[_escuela].push(CandidateConsejoEscuela(_agrupacion.name, _agrupacion.siglas, 0));
    }

    function checkConsejoEscuela(Party memory _agrupacion, string memory _escuela, mapping (string => CandidateConsejoEscuela[]) storage candidatosConsejoEscuela) public view returns (bool) {
        for (uint i = 0; i < candidatosConsejoEscuela[_escuela].length; ++i) {
            if(StringComp.compareStrings(candidatosConsejoEscuela[_escuela][i].nombreAgrupacion, _agrupacion.name) && StringComp.compareStrings(candidatosConsejoEscuela[_escuela][i].siglasAgrupacion, _agrupacion.siglas)) {
                return true;
            }
        }
        return false;
    }

    function checkInEscuelas(string memory _escuela, string[] calldata escuelas) public pure returns (bool) {
        for (uint i = 0; i < escuelas.length; ++i) {
            if(StringComp.compareStrings(escuelas[i], _escuela)) {
                return true;
            }
        }
        return false;
    }

    function addCentroEstudiantes(Party memory _agrupacion, string memory _escuela, address _owner, mapping (string => CandidateCentroEstudiantes[]) storage candidatosCentroEstudiante, Party[] storage agrupacionesRegistradas, string[] calldata escuelas) public {
        require(checkAgrupacion(_agrupacion.name, _agrupacion.siglas, agrupacionesRegistradas), "Agrupacion no registrada");
        require(!checkCentroEstudiantes(_agrupacion, _escuela, candidatosCentroEstudiante), "Agrupacion ya registrada en este consejo");
        require(checkInEscuelas(_escuela, escuelas), "Centro no registrado");
        require(msg.sender == _owner, "Solo el dueno del contrato puede registrar candidatos");
        candidatosCentroEstudiante[_escuela].push(CandidateCentroEstudiantes(_agrupacion.name, _agrupacion.siglas, 0));
    }

    function checkCentroEstudiantes(Party memory _agrupacion, string memory _escuela, mapping (string => CandidateCentroEstudiantes[]) storage candidatosCentroEstudiante) public view returns (bool) {
        for (uint i = 0; i < candidatosCentroEstudiante[_escuela].length; ++i) {
            if(StringComp.compareStrings(candidatosCentroEstudiante[_escuela][i].nombreAgrupacion, _agrupacion.name) && StringComp.compareStrings(candidatosCentroEstudiante[_escuela][i].siglasAgrupacion, _agrupacion.siglas)) {
                return true;
            }
        }
        return false;
    }

    function addJuntaDirectivaFCE(Party memory _agrupacion, address _owner, CandidateJuntaDirectiva[] storage candidatosJuntaDirectivaFCE, Party[] storage agrupacionesRegistradas) public {
        require(checkAgrupacion(_agrupacion.name, _agrupacion.siglas, agrupacionesRegistradas), "Agrupacion no registrada");
        require(!checkJuntaDirectiva(_agrupacion, candidatosJuntaDirectivaFCE), "Agrupacion ya registrada en este consejo");
        require(msg.sender == _owner, "Solo el dueno del contrato puede registrar candidatos");
        candidatosJuntaDirectivaFCE.push(CandidateJuntaDirectiva(_agrupacion.name, _agrupacion.siglas, 0));
    }

    function checkJuntaDirectiva(Party memory _agrupacion, CandidateJuntaDirectiva[] storage candidatosJuntaDirectivaFCE) public view returns (bool) {
        for (uint i = 0; i < candidatosJuntaDirectivaFCE.length; ++i) {
            if (StringComp.compareStrings(candidatosJuntaDirectivaFCE[i].nombreAgrupacion, _agrupacion.name) && StringComp.compareStrings(candidatosJuntaDirectivaFCE[i].siglasAgrupacion, _agrupacion.siglas)) {
                return true;
            }
        }
        return false;
    }

    function addCoordinacionFCE(Party memory _agrupacion, address _owner, CandidateCoordinacion[] storage candidatosCoordinacionFCE, Party[] storage agrupacionesRegistradas) public {
        require(checkAgrupacion(_agrupacion.name, _agrupacion.siglas, agrupacionesRegistradas), "Agrupacion no registrada");
        require(!checkCoordinacion(_agrupacion, candidatosCoordinacionFCE), "Agrupacion ya registrada en este consejo");
        require(msg.sender == _owner, "Solo el dueno del contrato puede registrar candidatos");
        candidatosCoordinacionFCE.push(CandidateCoordinacion(_agrupacion.name, _agrupacion.siglas, 0));
    }

    function checkCoordinacion(Party memory _agrupacion, CandidateCoordinacion[] storage candidatosCoordinacionFCE) public view returns (bool) {
        for (uint i = 0; i < candidatosCoordinacionFCE.length; ++i) {
            if (StringComp.compareStrings(candidatosCoordinacionFCE[i].nombreAgrupacion, _agrupacion.name) && StringComp.compareStrings(candidatosCoordinacionFCE[i].siglasAgrupacion, _agrupacion.siglas)) {
                return true;
            }
        }
        return false;
    }

// TODO: Esto no va en este contrato

    function addConsejeroAcademico(string memory _name, uint _id, string memory _major, address _owner, PartyLib.CandidateConsejero[] storage candidatosConsejoAcademico) public {
        require(msg.sender == _owner, "Solo el dueno del contrato puede registrar candidatos");
        require(!checkConsejeroAcademico(_id, candidatosConsejoAcademico), "Consejero ya registrado");
        candidatosConsejoAcademico.push(CandidateConsejero(_name, _id, _major, 0));
    }

    function checkConsejeroAcademico(uint _id, PartyLib.CandidateConsejero[] storage candidatosConsejoAcademico) public view returns (bool) {
        for (uint i = 0; i < candidatosConsejoAcademico.length; ++i) {
            if (candidatosConsejoAcademico[i].id == _id) {
                return true;
            }
        }
        return false;
    }

    // function getCandidateConsejoAcademico(uint _id) public view returns (CandidateConsejero memory candidate) {
    //     for (uint i = 0; i < candidatosConsejoAcademico.length; ++i) {
    //         if (candidatosConsejoAcademico[i].id == _id) {
    //             return candidatosConsejoAcademico[i];
    //         }
    //     }
    // }

    // function getAllCandidatesConsejoAcademico() public view returns (CandidateConsejero[] memory) {
    //     return candidatosConsejoAcademico;
    // }

// TODO: Get va dentero de elecciones
    // function getCandidatosConsejoFacultad(string memory _facultad) public view returns (CandidateConsejoFacultad[] memory) {
    //     return candidatosConsejoFacultad[_facultad];
    // }

    // function getCandidatosConsejoEscuela(string memory _escuela) public view returns (CandidateCentroEstudiantes[] memory) {
    //     return candidatosCentroEstudiante[_escuela];
    // }

    // function getCandidatosCentroEstudiante(string memory _escuela) public view returns (CandidateCentroEstudiantes[] memory) {
    //     return candidatosCentroEstudiante[_escuela];
    // }

    // function getCandidatosdCoordinacionFCE() public view returns (CandidateCoordinacion[] memory) {
    //     return candidatosCoordinacionFCE;
    // }

    // function getCandidatosJuntaDirectivaFCE() public view returns (CandidateJuntaDirectiva[] memory) {
    //     return candidatosJuntaDirectivaFCE;
    // }

    // function getJuntaDirectivaFCE(string memory _siglas) public view returns (CandidateJuntaDirectiva memory junta) {
    //     for (uint i = 0; i < candidatosJuntaDirectivaFCE.length; ++i) {
    //         if(StringComp.compareStrings(candidatosJuntaDirectivaFCE[i].siglasAgrupacion, _siglas)) {
    //             return candidatosJuntaDirectivaFCE[i];
    //         }
    //     }
    // }

    // function getCoordinacionFCE(string memory _siglas) public view returns (CandidateCoordinacion memory coordinacion) {
    //     for (uint i = 0; i < candidatosCoordinacionFCE.length; ++i) {
    //         if (StringComp.compareStrings(candidatosCoordinacionFCE[i].siglasAgrupacion, _siglas)) {
    //             return candidatosCoordinacionFCE[i];
    //         }
    //     }
    // }

    // function getCentroEstudiantes(string memory _siglas, string memory _escuela) public view returns (CandidateCentroEstudiantes memory centro) {
    //     for (uint i = 0; i < candidatosCentroEstudiante[_escuela].length; ++i) {
    //         if (StringComp.compareStrings(candidatosCentroEstudiante[_escuela][i].siglasAgrupacion, _siglas)) {
    //             return candidatosCentroEstudiante[_escuela][i];
    //         }
    //     }
    // }

    // function getConsejoFacultad(string memory _siglas, string memory _facultad) public view returns (CandidateConsejoFacultad memory consejo) {
    //     for (uint i = 0; i < candidatosConsejoFacultad[_facultad].length; ++i) {
    //         if (StringComp.compareStrings(candidatosConsejoFacultad[_facultad][i].siglasAgrupacion, _siglas)) {
    //             return candidatosConsejoFacultad[_facultad][i];
    //         }

    //     }
    // }

    // function getConsejeroAcademico(uint _id) public view returns (CandidateConsejero memory consejero) {
    //     for (uint i = 0; i < candidatosConsejoAcademico.length; ++i) {
    //         if (candidatosConsejoAcademico[i].id == _id) {
    //             return candidatosConsejoAcademico[i];
    //         }
    //     }
    // }

    // function getConsejoEscuela(string memory _siglas, string memory _escuela) public view returns (CandidateConsejoEscuela memory consejo) {
    //     for (uint i = 0; i < candidatosConsejoEscuela[_escuela].length; ++i) {
    //         if (StringComp.compareStrings(candidatosConsejoEscuela[_escuela][i].siglasAgrupacion, _siglas)) {
    //             return candidatosConsejoEscuela[_escuela][i];
    //         }
    //     }
    // }

}