const Eleccion = artifacts.require("./Eleccion.sol");

contract("Eleccion", (accounts) => {
    let electionInstance;
    beforeEach(async () => {
        electionInstance = await Eleccion.new();
        await electionInstance.agregarIDARegistro(13, { from: accounts[0] });
    });

    it ("agrega votante", async () => {
        await electionInstance.agregarVotante(13, ["Ing. de Sistemas"], ["Ingenieria"], { from: accounts[0] });
        const voter = await electionInstance.getVotanteInfo(13);
        assert.equal(voter[0], 13, "Votante agregado correctamente");
    });

    it ("agrega candidato consejo academico", async () => {
        await electionInstance.agregarCandidatoConsejoAcademico("Monkey D. Luffy", 42, "Ing. de Sistemas", { from: accounts[0] });
        const candidate = await electionInstance.getCandidatoConsejoAcademico(42);
        assert.equal(candidate[1], 42, "Candidato agregado correctamente");
    });

    it ("vota consejo academico", async () => {
        await electionInstance.agregarVotante(13, ["Ing. de Sistemas"], ["Ingenieria"], { from: accounts[0] });
        await electionInstance.agregarCandidatoConsejoAcademico("Monkey D. Luffy", 42, "Ing. de Sistemas", { from: accounts[0] });
        await electionInstance.voteCandidatoConsejoAcademico(42, 13, { from: accounts[0] });
        const vote = await electionInstance.getCandidatoConsejoAcademico(42);
        assert.equal(vote[3], 1, "Voto agregado correctamente");
        const votante = await electionInstance.getVotanteSeccionesVotadas(13);
        assert.equal(votante[0], true, "Votante voto correctamente");
    });

    it ("agrega candidato junta directiva FCE", async () => {
        await electionInstance.agregarCandidatoJuntaDirectivaFCE("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
        const candidate = await electionInstance.getCandidatoJuntaDirectivaFCE("SHGF");
        assert.equal(candidate[1], "SHGF", "Candidato agregado correctamente");
    });

    it ("vota junta directiva FCE", async () => {
        await electionInstance.agregarVotante(13, ["Ing. de Sistemas"], ["Ingenieria"], { from: accounts[0] });
        await electionInstance.agregarCandidatoJuntaDirectivaFCE("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
        await electionInstance.voteCandidatoJuntaDirectivaFCE("SHGF", 13, { from: accounts[0] });
        const vote = await electionInstance.getCandidatoJuntaDirectivaFCE("SHGF");
        assert.equal(vote[2], 1, "Voto agregado correctamente");
        const votante = await electionInstance.getVotanteSeccionesVotadas(13);
        assert.equal(votante[1], true, "Votante voto correctamente");
    });

    it ("agrega candidato coordinacion FCE", async () => {
        await electionInstance.agregarCandidatoCoordinacionFCE("Straw Hat Pirates", "SHP", { from: accounts[0] });
        const candidate = await electionInstance.getCandidatoCoordinacionFCE("SHP");
        assert.equal(candidate[1], "SHP", "Candidato agregado correctamente");
    });

    it ("vota coordinacion FCE", async () => {
        await electionInstance.agregarVotante(13, ["Ing. de Sistemas"], ["Ingenieria"], { from: accounts[0] });
        await electionInstance.agregarCandidatoCoordinacionFCE("Straw Hat Pirates", "SHP", { from: accounts[0] });
        await electionInstance.voteCandidatoCoordinacionFCE("SHP", 13, { from: accounts[0] });
        const vote = await electionInstance.getCandidatoCoordinacionFCE("SHP");
        assert.equal(vote[2], 1, "Voto agregado correctamente");
        const votante = await electionInstance.getVotanteSeccionesVotadas(13);
        assert.equal(votante[2], true, "Votante voto correctamente");
    });

    it ("agrega candidato centro estudiantes", async () => {
        await electionInstance.agregarCandidatoCentroEstudiantes("Straw Hat Crew", "SHC", "Ing. de Sistemas", { from: accounts[0] });
        const candidate = await electionInstance.getCandidatoCentroEstudiantes("SHC", "Ing. de Sistemas");
        assert.equal(candidate[1], "SHC", "Candidato agregado correctamente");
    });

    it ("vota centro estudiantes", async () => {
        await electionInstance.agregarVotante(13, ["Ing. de Sistemas"], ["Ingenieria"], { from: accounts[0] });
        await electionInstance.agregarCandidatoCentroEstudiantes("Straw Hat Crew", "SHC", "Ing. de Sistemas", { from: accounts[0] });
        await electionInstance.voteCandidatoCentroEstudiantes("SHC", "Ing. de Sistemas", 13, { from: accounts[0] });
        const vote = await electionInstance.getCandidatoCentroEstudiantes("SHC", "Ing. de Sistemas");
        assert.equal(vote[3], 1, "Voto agregado correctamente");
        const votante = await electionInstance.getVotanteSeccionesVotadas(13);
        assert.equal(votante[3], true, "Votante voto correctamente");
    });

    it ("agrega candidato consejo escuela", async () => {
        await electionInstance.agregarCandidatoConsejoEscuela("Straw Hat Crew", "SHC", "Ing. de Sistemas", { from: accounts[0] });
        const candidate = await electionInstance.getCandidatoConsejoEscuela("SHC", "Ing. de Sistemas");
        assert.equal(candidate[1], "SHC", "Candidato agregado correctamente");
    });

    it ("vota consejo escuela", async () => {
        await electionInstance.agregarVotante(13, ["Ing. de Sistemas"], ["Ingenieria"], { from: accounts[0] });
        await electionInstance.agregarCandidatoConsejoEscuela("Straw Hat Crew", "SHC", "Ing. de Sistemas", { from: accounts[0] });
        await electionInstance.voteCandidatoConsejoEscuela("SHC", "Ing. de Sistemas", 13, { from: accounts[0] });
        const vote = await electionInstance.getCandidatoConsejoEscuela("SHC", "Ing. de Sistemas");
        assert.equal(vote[3], 1, "Voto agregado correctamente");
        const votante = await electionInstance.getVotanteSeccionesVotadas(13);
        assert.equal(votante[4], true, "Votante voto correctamente");
    });

    it ("agrega candidato consejo facultad", async () => {
        await electionInstance.agregarCandidatoConsejoFacultad("Straw Hat Crew", "SHC", "Ingenieria", { from: accounts[0] });
        const candidate = await electionInstance.getCandidatoConsejoFacultad("SHC", "Ingenieria");
        assert.equal(candidate[1], "SHC", "Candidato agregado correctamente");
    });

    it ("vota consejo facultad", async () => {
        await electionInstance.agregarVotante(13, ["Ing. de Sistemas"], ["Ingenieria"], { from: accounts[0] });
        await electionInstance.agregarCandidatoConsejoFacultad("Straw Hat Crew", "SHC", "Ingenieria", { from: accounts[0] });
        await electionInstance.voteCandidatoConsejoFacultad("SHC", "Ingenieria", 13, { from: accounts[0] });
        const vote = await electionInstance.getCandidatoConsejoFacultad("SHC", "Ingenieria");
        assert.equal(vote[3], 1, "Voto agregado correctamente");
        const votante = await electionInstance.getVotanteSeccionesVotadas(13);
        assert.equal(votante[5], true, "Votante voto correctamente");
    });

    it ("completa votacion", async () => {
        await electionInstance.agregarVotante(13, ["Ing. de Sistemas"], ["Ingenieria"], { from: accounts[0] });
        await electionInstance.agregarCandidatoConsejoAcademico("Monkey D. Luffy", 42, "Ing. de Sistemas", { from: accounts[0] });
        await electionInstance.voteCandidatoConsejoAcademico(42, 13, { from: accounts[0] });
        await electionInstance.agregarCandidatoJuntaDirectivaFCE("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
        await electionInstance.voteCandidatoJuntaDirectivaFCE("SHGF", 13, { from: accounts[0] });
        await electionInstance.agregarCandidatoCoordinacionFCE("Straw Hat Pirates", "SHP", { from: accounts[0] });
        await electionInstance.voteCandidatoCoordinacionFCE("SHP", 13, { from: accounts[0] });
        await electionInstance.agregarCandidatoCentroEstudiantes("Straw Hat Crew", "SHC", "Ing. de Sistemas", { from: accounts[0] });
        await electionInstance.voteCandidatoCentroEstudiantes("SHC", "Ing. de Sistemas", 13, { from: accounts[0] });
        await electionInstance.agregarCandidatoConsejoEscuela("Straw Hat Crew", "SHC", "Ing. de Sistemas", { from: accounts[0] });
        await electionInstance.voteCandidatoConsejoEscuela("SHC", "Ing. de Sistemas", 13, { from: accounts[0] });
        await electionInstance.agregarCandidatoConsejoFacultad("Straw Hat Crew", "SHC", "Ingenieria", { from: accounts[0] });
        await electionInstance.voteCandidatoConsejoFacultad("SHC", "Ingenieria", 13, { from: accounts[0] });

        const votante = await electionInstance.getVotanteCulminoVotacion(13);
        assert.equal(votante, true, "Votante completo votacion correctamente");
    });

    it ("retorna ganadores consejo academico", async () => {
        await electionInstance.agregarCandidatoConsejoAcademico("Monkey D. Luffy", 42, "Ing. de Sistemas", { from: accounts[0] });
        await electionInstance.agregarCandidatoConsejoAcademico("Roronoa Zoro", 43, "Ing. de Sistemas", { from: accounts[0] });
        await electionInstance.agregarCandidatoConsejoAcademico("Nami", 44, "Ing. de Sistemas", { from: accounts[0] });

        await electionInstance.agregarVotante(13, ["Ing. de Sistemas"], ["Ingenieria"], { from: accounts[0] });
        await electionInstance.agregarVotante(14, ["Ing. de Sistemas"], ["Ingenieria"], { from: accounts[0] });
        await electionInstance.agregarVotante(15, ["Ing. de Sistemas"], ["Ingenieria"], { from: accounts[0] });

        await electionInstance.voteCandidatoConsejoAcademico(42, 13, { from: accounts[0] });
        await electionInstance.voteCandidatoConsejoAcademico(43, 14, { from: accounts[0] });
        await electionInstance.voteCandidatoConsejoAcademico(42, 15, { from: accounts[0] });

        const ganadores = await electionInstance.getGanadoresConsejoAcademico();

        assert.equal(ganadores[0], "Monkey D. Luffy", "Ganador 1 correcto");
        assert.equal(ganadores[1], 42, "Ganador 1 correcto");
        assert.equal(ganadores[3], "Roronoa Zoro", "Ganador 2 correcto");
        assert.equal(ganadores[4], 43, "Ganador 2 correcto");
    });


});