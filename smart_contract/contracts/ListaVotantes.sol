// SPDX-Licence-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Votante.sol";
import "./StringCompare.sol";

contract ListaVotantes {
    mapping(uint => Votante) public votantes;
    uint public numeroVotantes;
    uint public numeroVotantesRegistroElectoral;

    string[] carreras;
    mapping (string => string) carreraFacultad;

    Votante[] votantesRegistrados;
    uint[] IDsRegistroElectoral;

    constructor() {
        numeroVotantes = 0;

        carreras = ["Ingenieria de Sistemas", "Ingenieria de Produccion", "Ingenieria Quimica", "Ingenieria Mecanica", "Ingenieria Electrica", "Ingenieria Civil", "Ingenieria Quimica", "Administracion", "Economia", "Contaduria", "Educacion", "Idiomas", "Psicologia", "Mate. Industriales", "Est. Liberales", "Derechos"];
        
        carreraFacultad["Ingenieria de Sistemas"] = "Ingenieria";
        carreraFacultad["Ingenieria de Produccion"] = "Ingenieria";
        carreraFacultad["Ingenieria Quimica"] = "Ingenieria";
        carreraFacultad["Ingenieria Mecanica"] = "Ingenieria";
        carreraFacultad["Ingenieria Electrica"] = "Ingenieria";
        carreraFacultad["Ingenieria Civil"] = "Ingenieria";
        carreraFacultad["Ingenieria Quimica"] = "Ingenieria";
        carreraFacultad["Administracion"] = "Ciencias Economicas y Sociales";
        carreraFacultad["Economia"] = "Ciencias Economicas y Sociales";
        carreraFacultad["Contaduria"] = "Ciencias Economicas y Sociales";
        carreraFacultad["Educacion"] = "Ciencias y Artes";
        carreraFacultad["Idiomas"] = "Ciencias y Artes";
        carreraFacultad["Psicologia"] = "Ciencias y Artes";
        carreraFacultad["Mate. Industriales"] = "Ciencias y Artes";
        carreraFacultad["Est. Liberales"] = "Estudios Juridicos y Politicos";
        carreraFacultad["Derechos"] = "Estudios Juridicos y Politicos";
    }

    function addVotante(Votante _nuevoVotante) public {
        votantes[_nuevoVotante.getID()] = _nuevoVotante;
        numeroVotantes++;
    }

    function getVotante(uint _id) public view returns (Votante) {
        return votantes[_id];
    }

    function addIDARegistro(uint _id) public {
        require(!checkIDRegistrado(_id), "El ID ya se encuentra registrado");
        IDsRegistroElectoral.push(_id);
        numeroVotantesRegistroElectoral++;
    }

    function checkIDRegistrado(uint _id) internal view returns (bool) {
        for (uint i = 0; i < IDsRegistroElectoral.length; i++) {
            if (IDsRegistroElectoral[i] == _id) {
                return true;
            }
        }
        return false;
    }

    function registrarVotante(uint _id, string[] memory _carreras) external {
        require(!checkVotanteRegistrado(_id), "El ID ya se encuentra registrado");
        Votante nuevoVotante = new Votante(_id, _carreras);
        nuevoVotante.addFacultades(getFacultades(_carreras));
        addVotante(nuevoVotante);
        votantesRegistrados.push(nuevoVotante);
        IDsRegistroElectoral.push(_id);
    }

    function checkVotanteRegistrado(uint _id) internal view returns (bool) {
        for (uint i = 0; i < votantesRegistrados.length; i++) {
            if (votantesRegistrados[i].getID() == _id) {
                return true;
            }
        }
        return false;
    }

    // function registrarVotanteFacultad(uint _id, string[] memory _facultades) internal {
    //     require(!checkVotanteRegistrado(_id), "El ID ya se encuentra registrado");
    //     Votante nuevoVotante = new Votante(_id, new string[](0), _facultades);
    //     votantesRegistrados.push(nuevoVotante);
    //     IDsRegistroElectoral.push(_id);
    // }

    function getFacultades(string[] memory _carreras) internal view returns (string[] memory) {
        string memory newFac;
        string[] memory facultades = new string[](_carreras.length);
        uint j = 0;
        for (uint i = 0; i < carreras.length; i++) {
            newFac = carreraFacultad[carreras[i]];
            if (!checkFacultadGuardada(newFac, facultades)) {
                facultades[j] = newFac;
                j++;
            }
        }

        return facultades;
    }

    function checkFacultadGuardada(string memory _facultad, string[] memory _facultades) internal pure returns (bool) {
        for (uint i = 0; i < _facultades.length; i++) {
            if (StringCompare.compare(_facultades[i], _facultad)) {
                return true;
            }
        }
        return false;
    }
}