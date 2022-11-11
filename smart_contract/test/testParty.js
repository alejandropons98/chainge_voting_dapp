const Party = artifacts.require("./Party.sol");

contract("Party", (accounts) => {
    let partyInstance;
    beforeEach(async () => {
        partyInstance = await Party.new("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
    });

    it("registers correct name", async () => {
        const name = await partyInstance.name();
        assert.equal(name, "Straw Hat Grand Fleet", "contains the correct name");
    });

    it("registers correct siglas", async () => {
        const siglas = await partyInstance.siglas();
        assert.equal(siglas, "SHGF", "contains the correct siglas");
    });

    it("registers a candidate", async () => {
        await partyInstance.addConsejeroAcademico("Luffy", 42,"Liberales", { from: accounts[0] });
        const candidate = await partyInstance.getConsejeroAcademico();
        assert.equal(candidate[0], "Luffy", "contains the correct name");
        assert.equal(candidate[1], 42, "contains the correct id");
        assert.equal(candidate[2], "Liberales", "contains the correct degree");

        const seccionExiste = await partyInstance.checkIfConsejeroAcademico();
        assert.equal(seccionExiste, true, "contains the correct degree");
    });

    it("registers aux members", async () => {
        await partyInstance.addConsejeroAcademico("Luffy", 42,"Liberales", { from: accounts[0] });
        await partyInstance.addConsejeroAcademicoAux("Zoro", 43,"Liberales", { from: accounts[0] });

        const auxMembers = await partyInstance.getConsejeroAcademicoAux();
        assert.equal(auxMembers[0], "Zoro", "contains the correct name");
        assert.equal(auxMembers[1], 43, "contains the correct id");
        assert.equal(auxMembers[2], "Liberales", "contains the correct degree");
    });

    it("doesnt register aux before main", async () => {
        try {
            await partyInstance.addConsejeroAcademicoAux("Zoro", 43,"Liberales", { from: accounts[0] });
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });

    it("registers consejo facultad", async () => {
        await partyInstance.addConsejoFacultad("Ingenieria", { from: accounts[0] });
        await partyInstance.addConsejoFacultad("Ciencias Economicas y Sociales", { from: accounts[0] });

        const facIng = await partyInstance.checkIfConsejoFacultad("Ingenieria");
        const faces = await partyInstance.checkIfConsejoFacultad("Ciencias Economicas y Sociales");

        assert.equal(facIng, true, "contains the correct name");
        assert.equal(faces, true, "contains the correct name");
    });

    it("registers consejo escuela", async () => {
        await partyInstance.addConsejoEscuela("Ing. de Sistemas", { from: accounts[0] });
        await partyInstance.addConsejoEscuela("Economia", { from: accounts[0] });

        const escSist = await partyInstance.checkIfConsejoEscuela("Ing. de Sistemas");
        const escEcon = await partyInstance.checkIfConsejoEscuela("Economia");

        assert.equal(escSist, true, "contains the correct name");
        assert.equal(escEcon, true, "contains the correct name");
    });

    it("registers centro estudiantes", async () => {
        await partyInstance.addCentroEstudiantes("Ing. de Sistemas", { from: accounts[0] });
        await partyInstance.addCentroEstudiantes("Economia", { from: accounts[0] });

        const escSist = await partyInstance.checkIfCentroEstudiantes("Ing. de Sistemas");
        const escEcon = await partyInstance.checkIfCentroEstudiantes("Economia");

        assert.equal(escSist, true, "contains the correct name");
        assert.equal(escEcon, true, "contains the correct name");
    });

    it("registers junta directiva" , async () => {
        await partyInstance.addJuntaDirectivaFCE();

        const junta = await partyInstance.checkIfJuntaDirectivaFCE();

        assert.equal(junta, true, "registrada correctamente");
    });

    it("registers coordinacion de FCE" , async () => {
        await partyInstance.addCoordinacionFCE();

        const coordinacion = await partyInstance.checkIfCoordinacionFCE();

        assert.equal(coordinacion, true, "registrada correctamente");
    });

    it("no registra facultades inexistentes" , async () => {
        try {
            await partyInstance.addConsejoFacultad("Ingenieria de Sistemas", { from: accounts[0] });
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });

    it("no registra escuelas inexistentes consejo" , async () => {
        try {
            await partyInstance.addConsejoEscuela("Ing. Electronica", { from: accounts[0] });
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });

    it("no registra escuelas inexistentes centro estudiantes" , async () => {
        try {
            await partyInstance.addCentroEstudiantes("Ing. Electronica", { from: accounts[0] });
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });

    it("no registra facultades repetidas" , async () => {
        await partyInstance.addConsejoFacultad("Ingenieria", { from: accounts[0] });
        try {
            await partyInstance.addConsejoFacultad("Ingenieria", { from: accounts[0] });
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });

    it("no registra escuelas repetidas consejo" , async () => {
        await partyInstance.addConsejoEscuela("Ing. de Sistemas", { from: accounts[0] });
        try {
            await partyInstance.addConsejoEscuela("Ing. de Sistemas", { from: accounts[0] });
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });

    it("no registra escuelas repetidas centro estudiantes" , async () => {
        await partyInstance.addCentroEstudiantes("Ing. de Sistemas", { from: accounts[0] });
        try {
            await partyInstance.addCentroEstudiantes("Ing. de Sistemas", { from: accounts[0] });
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });

    it("no registra junta directiva si ya existe" , async () => {
        await partyInstance.addJuntaDirectivaFCE();
        try {
            await partyInstance.addJuntaDirectivaFCE();
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });

    it("no registra coordinacion si ya existe" , async () => {
        await partyInstance.addCoordinacionFCE();
        try {
            await partyInstance.addCoordinacionFCE();
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });

    it("no registra consejero academico si ya existe" , async () => {
        await partyInstance.addConsejeroAcademico("Luffy", 42,"Liberales", { from: accounts[0] });
        try {
            await partyInstance.addConsejeroAcademico("Zoro", 43,"Liberales", { from: accounts[0] });
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });

    it("no registra consejero academico auxiliar si ya existe" , async () => {
        await partyInstance.addConsejeroAcademico("Luffy", 42,"Liberales", { from: accounts[0] });
        await partyInstance.addConsejeroAcademicoAux("Zoro", 43,"Liberales", { from: accounts[0] });
        try {
            await partyInstance.addConsejeroAcademicoAux("Brook", 5,"Ing. Quimica", { from: accounts[0] });
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });




});