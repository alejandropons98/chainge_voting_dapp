const Eleccion = artifacts.require("./Eleccion.sol");

contract("Eleccion", (accounts) => {
    let electionInstance;
    beforeEach(async () => {
        electionInstance = await Eleccion.new();
        await electionInstance.agregarIDARegistro(42, { from: accounts[0] });
    });

    // it ("agrega votante", async () => {
    //     await electionInstance.agregarVotante(42, ["Ing. de Sistemas"], ["Ingenieria"], { from: accounts[0] });
    //     const voter = await electionInstance.getVotante(42);
    //     assert.equal(voter[0], 42, "Votante agregado correctamente");
    // });

});