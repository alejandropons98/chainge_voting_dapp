const Eleccion = artifacts.require("./Eleccion.sol");

contract("Eleccion", (accounts) => {
    let electionInstance;
    beforeEach(async () => {
        electionInstance = await Eleccion.new();
        await electionInstance.agregarIDARegistro(42, { from: accounts[0] });
    });

    it ("agrega votante", async () => {
        await electionInstance.agregarVotante(42, ["Ing. de Sistemas"], { from: accounts[0] });
        const voter = await electionInstance.getVotante(42).id();
        assert.equal(voter, 42, "Votante agregado correctamente");
    });

});

const ListaVotantes = artifacts.require("./ListaVotantes.sol");

contract("ListaVotantes", (accounts) => {
    let voterInstance;
    beforeEach(async () => {
        voterInstance = await ListaVotantes.new();
        await voterInstance.addIDARegistro(42, { from: accounts[0] });
    });

    it ("agrega votante", async () => {
        await voterInstance.registrarVotante(42, ["Ing. de Sistemas"], { from: accounts[0] });
        const voter = await voterInstance.getVotante(42).id();
        assert.equal(voter, 42, "Votante agregado correctamente");
    });

});

// const Votante = artifacts.require("./Votante.sol");

// contract("Votante", (accounts) => {
//     let voterInstance;
//     beforeEach(async () => {
//         voterInstance = await Votante.new();
//         await voterInstance.agregarIDARegistro(42, { from: accounts[0] });
//     });

//     it ("agrega votante", async () => {
//         await voterInstance.registrarVotante(42, ["Ing. de Sistemas"], { from: accounts[0] });
//         const voter = await voterInstance.getVotante(42).id();
//         assert.equal(voter, 42, "Votante agregado correctamente");
//     });

// });