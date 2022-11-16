const CandidateList = artifacts.require("./CandidateList.sol");

contract("CandidateList", (accounts) => {
    let listInstance;
    beforeEach(async () => {
        listInstance = await CandidateList.new();
    });

    it ("agrega candidato consejo academico", async () => {
        await listInstance.addCandidateConsejoAcademico("Monkey D. Luffy", 42, "Ing. de Sistemas", { from: accounts[0] });
        const candidate = await listInstance.getCandidateConsejoAcademico(42);
        assert.equal(candidate[0], "Monkey D. Luffy");
    });

    it ("vota por candidato consejo academico", async () => {
        await listInstance.addCandidateConsejoAcademico("Monkey D. Luffy", 42, "Ing. de Sistemas", { from: accounts[0] });
        await listInstance.voteConsejoAcademico(42, { from: accounts[1] });
        const candidate = await listInstance.getCandidateConsejoAcademico(42);
        assert.equal(candidate[3], 1);
    });

    it ("agrega candidato junta directiva", async () => {
        await listInstance.addCandidateJuntaDirectivaFCE("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
        const candidate = await listInstance.getCandidateJuntaDirectivaFCE("SHGF");
        assert.equal(candidate[0], "Straw Hat Grand Fleet");
    });

    it ("vota por candidato junta directiva", async () => {
        await listInstance.addCandidateJuntaDirectivaFCE("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
        await listInstance.voteJuntaDirectivaFCE("SHGF", { from: accounts[1] });
        const candidate = await listInstance.getCandidateJuntaDirectivaFCE("SHGF");
        assert.equal(candidate[2], 1);
    });

    it ("agrega candidato coordinacion FCE", async () => {
        await listInstance.addCandidateCoordinacionFCE("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
        const candidate = await listInstance.getCandidateCoordinacionFCE("SHGF");
        assert.equal(candidate[0], "Straw Hat Grand Fleet");
    });

    it ("vota por candidato coordinacion FCE", async () => {
        await listInstance.addCandidateCoordinacionFCE("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
        await listInstance.voteCoordinacionFCE("SHGF", { from: accounts[1] });
        const candidate = await listInstance.getCandidateCoordinacionFCE("SHGF");
        assert.equal(candidate[2], 1);
    });

    it ("agrega candidato centro estudiantes", async () => {
        await listInstance.addCandidateCentroEstudiantes("Straw Hat Grand Fleet", "SHGF", "Ing. de Sistemas", { from: accounts[0] });
        const candidate = await listInstance.getCandidateCentroEstudiantes("Ing. de Sistemas", "SHGF");
        assert.equal(candidate[0], "Straw Hat Grand Fleet");
    });

    it ("vota por candidato centro estudiantes", async () => {
        await listInstance.addCandidateCentroEstudiantes("Straw Hat Grand Fleet", "SHGF", "Ing. de Sistemas", { from: accounts[0] });
        await listInstance.voteCentroEstudiantes("Ing. de Sistemas", "SHGF", { from: accounts[1] });
        const candidate = await listInstance.getCandidateCentroEstudiantes("Ing. de Sistemas", "SHGF");
        assert.equal(candidate[3], 1);
    });

    it ("agrega candidato consejo escuela", async () => {
        await listInstance.addCandidateConsejoEscuela("Straw Hat Grand Fleet", "SHGF", "Ing. de Sistemas", { from: accounts[0] });
        const candidate = await listInstance.getCandidateConsejoEscuela("Ing. de Sistemas", "SHGF");
        assert.equal(candidate[0], "Straw Hat Grand Fleet");
    });

    it ("vota por candidato consejo escuela", async () => {
        await listInstance.addCandidateConsejoEscuela("Straw Hat Grand Fleet", "SHGF", "Ing. de Sistemas", { from: accounts[0] });
        await listInstance.voteConsejoEscuela("Ing. de Sistemas", "SHGF", { from: accounts[1] });
        const candidate = await listInstance.getCandidateConsejoEscuela("Ing. de Sistemas", "SHGF");
        assert.equal(candidate[3], 1);
    });

    it ("agrega candidato consejo facultad", async () => {
        await listInstance.addCandidateConsejoFacultad("Straw Hat Grand Fleet", "SHGF", "Ingenieria", { from: accounts[0] });
        const candidate = await listInstance.getCandidateConsejoFacultad("Ingenieria", "SHGF");
        assert.equal(candidate[0], "Straw Hat Grand Fleet");
    });

    it ("vota por candidato consejo facultad", async () => {
        await listInstance.addCandidateConsejoFacultad("Straw Hat Grand Fleet", "SHGF", "Ingenieria", { from: accounts[0] });
        await listInstance.voteConsejoFacultad("Ingenieria", "SHGF", { from: accounts[1] });
        const candidate = await listInstance.getCandidateConsejoFacultad("Ingenieria", "SHGF");
        assert.equal(candidate[3], 1);
    });

});