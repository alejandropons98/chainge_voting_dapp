// const Election = artifacts.require("./Election.sol");

// contract("Election", (accounts) => {
//     let electionInstance;
//     beforeEach(async () => {
//         electionInstance = await Election.new(); 
//         await electionInstance.agregarARegistroElectoral(66, { from: accounts[0] });
//         await electionInstance.agregarARegistroElectoral(42, { from: accounts[0] });
//         await electionInstance.agregarARegistroElectoral(8, { from: accounts[0] });
//         await electionInstance.agregarARegistroElectoral(1234, { from: accounts[0] });

//     });

//     // it("registra agrupacion correctamente", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     const agrupaciones = await electionInstance.getAgrupaciones();
//     //     assert.equal(agrupaciones[0][0], "Straw Hat Grand Fleet", "contains the correct name");
//     //     assert.equal(agrupaciones[0][1], "SHGF", "contains the correct siglas");
//     // });

//     // it("no registra agrupaciones repetidas", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });

//     //     try {
//     //         await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //         assert.fail();
//     //     } catch (error) {
//     //         assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
//     //     }
//     // });

//     // it("busca agrupacion por nombre", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     const agrupacion = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");
//     //     assert.equal(agrupacion[0], "Straw Hat Grand Fleet", "contains the correct name");
//     //     assert.equal(agrupacion[1], "SHGF", "contains the correct siglas");
//     // });

//     // it("registra consejo facultad", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     const agrupacion = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");
//     //     await electionInstance.addConsejoFacultad(agrupacion, "Ingenieria", { from: accounts[0] });
//     //     await electionInstance.addConsejoFacultad(agrupacion, "Ciencias Economicas y Sociales", { from: accounts[0] });

//     //     const facIng = await electionInstance.checkConsejoFacultad(agrupacion, "Ingenieria");
//     //     const faces = await electionInstance.checkConsejoFacultad(agrupacion, "Ciencias Economicas y Sociales");

//     //     assert.equal(facIng, true, "registra facultad correctamente");
//     //     assert.equal(faces, true, "registra facultad correctamente");
//     // });

//     // it("no registra consejo facultad repetido", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     const agrupacion = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");
//     //     await electionInstance.addConsejoFacultad(agrupacion, "Ingenieria", { from: accounts[0] });

//     //     try {
//     //         await electionInstance.addConsejoFacultad(agrupacion, "Ingenieria", { from: accounts[0] });
//     //         assert.fail();
//     //     } catch (error) {
//     //         assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
//     //     }
//     // });

//     // it("no registra facultades inexistentes", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     const agrupacion = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");

//     //     try {
//     //         await electionInstance.addConsejoFacultad(agrupacion, "Enfermeria", { from: accounts[0] });
//     //         assert.fail();
//     //     } catch (error) {
//     //         assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
//     //     }
//     // });

//     // it("registra consejo escuela", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     const agrupacion = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");
//     //     await electionInstance.addConsejoEscuela(agrupacion, "Ing. de Sistemas", { from: accounts[0] });
//     //     await electionInstance.addConsejoEscuela(agrupacion, "Economia", { from: accounts[0] });

//     //     const escSist = await electionInstance.checkConsejoEscuela(agrupacion, "Ing. de Sistemas");
//     //     const escEcon = await electionInstance.checkConsejoEscuela(agrupacion, "Economia");

//     //     assert.equal(escSist, true, "registra facultad correctamente");
//     //     assert.equal(escEcon, true, "registra facultad correctamente");
//     // });

//     // it("no registra consejo escuela repetido", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     const agrupacion = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");
//     //     await electionInstance.addConsejoEscuela(agrupacion, "Ing. de Sistemas", { from: accounts[0] });

//     //     try {
//     //         await electionInstance.addConsejoEscuela(agrupacion, "Ing. de Sistemas", { from: accounts[0] });
//     //         assert.fail();
//     //     } catch (error) {
//     //         assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
//     //     }
//     // });

//     // it("no registra escuelas inexistentes consejo escuela", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     const agrupacion = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");

//     //     try {
//     //         await electionInstance.addConsejoEscuela(agrupacion, "Enfermeria", { from: accounts[0] });
//     //         assert.fail();
//     //     } catch (error) {
//     //         assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
//     //     }
//     // });

//     // it("registra centro estudiantes", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     const agrupacion = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");

//     //     await electionInstance.addCentroEstudiantes(agrupacion, "Ing. de Sistemas", { from: accounts[0] });
//     //     await electionInstance.addCentroEstudiantes(agrupacion, "Economia", { from: accounts[0] });

//     //     const escSist = await electionInstance.checkCentroEstudiantes(agrupacion, "Ing. de Sistemas");
//     //     const escEcon = await electionInstance.checkCentroEstudiantes(agrupacion, "Economia");

//     //     assert.equal(escSist, true, "registra facultad correctamente");
//     //     assert.equal(escEcon, true, "registra facultad correctamente");
//     // });

//     // it("no registra centro estudiantes repetido", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     const agrupacion = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");
//     //     await electionInstance.addCentroEstudiantes(agrupacion, "Ing. de Sistemas", { from: accounts[0] });

//     //     try {
//     //         await electionInstance.addCentroEstudiantes(agrupacion, "Ing. de Sistemas", { from: accounts[0] });
//     //         assert.fail();
//     //     } catch (error) {
//     //         assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
//     //     }
//     // });

//     // it("no registra escuelas inexistentes centro estudiuantes", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     const agrupacion = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");

//     //     try {
//     //         await electionInstance.addCentroEstudiantes(agrupacion, "Enfermeria", { from: accounts[0] });
//     //         assert.fail();
//     //     } catch (error) {
//     //         assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
//     //     }
//     // });

//     // it("registra junta directiva", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     const agrupacion = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");

//     //     await electionInstance.addJuntaDirectiva(agrupacion, { from: accounts[0] });

//     //     const junta = await electionInstance.checkJuntaDirectiva(agrupacion);

//     //     assert.equal(junta, true, "registra junta directiva correctamente");
//     // });

//     // it("no registra junta directiva repetida", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     const agrupacion = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");
//     //     await electionInstance.addJuntaDirectiva(agrupacion, { from: accounts[0] });

//     //     try {
//     //         await electionInstance.addJuntaDirectiva(agrupacion, { from: accounts[0] });
//     //         assert.fail();
//     //     } catch (error) {
//     //         assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
//     //     }
//     // });

//     // it("registra coordinacion", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     const agrupacion = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");

//     //     await electionInstance.addCoordinacionFCE(agrupacion, { from: accounts[0] });

//     //     const coordinacion = await electionInstance.checkCoordinacion(agrupacion);

//     //     assert.equal(coordinacion, true, "registra coordinacion correctamente");
//     // });

//     // it("no registra coordinacion repetida", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     const agrupacion = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");
//     //     await electionInstance.addCoordinacionFCE(agrupacion, { from: accounts[0] });

//     //     try {
//     //         await electionInstance.addCoordinacionFCE(agrupacion, { from: accounts[0] });
//     //         assert.fail();
//     //     } catch (error) {
//     //         assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
//     //     }
//     // });

//     // it("registra consejo academico", async () => {
//     //     await electionInstance.addConsejeroAcademico("Monkey D. Luffy", 42, "Ing. de Sistemas", { from: accounts[0] });

//     //     const consejero = await electionInstance.getCandidateConsejoAcademico(42);

//     //     assert.equal(consejero[0], "Monkey D. Luffy", "registra consejero correctamente");
//     //     assert.equal(consejero[1], 42, "registra consejero correctamente");
//     //     assert.equal(consejero[2], "Ing. de Sistemas", "registra consejero correctamente");
//     // });

//     // it("busca consejero academico por id", async () => {
//     //     await electionInstance.addConsejeroAcademico("Monkey D. Luffy", 42, "Ing. de Sistemas", { from: accounts[0] });

//     //     const consejero = await electionInstance.getCandidateConsejoAcademico(42);

//     //     assert.equal(consejero[0], "Monkey D. Luffy", "registra consejero correctamente");
//     //     assert.equal(consejero[1], 42, "registra consejero correctamente");
//     //     assert.equal(consejero[2], "Ing. de Sistemas", "registra consejero correctamente");
//     // });

//     // it("no registra consejero academico si ya existe", async () => {
//     //     await electionInstance.addConsejeroAcademico("Monkey D. Luffy", 42, "Ing. de Sistemas", { from: accounts[0] });

//     //     try {
//     //         await electionInstance.addConsejeroAcademico("Monkey D. Luffy", 42, "Ing. de Sistemas", { from: accounts[0] });
//     //         assert.fail();
//     //     } catch (error) {
//     //         assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
//     //     }
//     // });

//     // it("regresa candidatos consejo facultades", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     await electionInstance.addAgrupacion("Heart Pirates", "HP", { from: accounts[0] });
//     //     await electionInstance.addAgrupacion("Whitebeard Pirates", "WBP", { from: accounts[0] });

//     //     const agrupacionSHGF = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");
//     //     const agrupacionHP = await electionInstance.getAgrupacion("Heart Pirates");
//     //     const agrupacionWBP = await electionInstance.getAgrupacion("Whitebeard Pirates");

//     //     await electionInstance.addConsejoFacultad(agrupacionSHGF, "Ingenieria", { from: accounts[0] });
//     //     await electionInstance.addConsejoFacultad(agrupacionHP, "Ingenieria", { from: accounts[0] });
//     //     await electionInstance.addConsejoFacultad(agrupacionWBP, "Ingenieria", { from: accounts[0] });

//     //     await electionInstance.addConsejoFacultad(agrupacionSHGF, "Ciencias y Artes", { from: accounts[0] });
//     //     await electionInstance.addConsejoFacultad(agrupacionHP, "Ciencias y Artes", { from: accounts[0] });

//     //     const candidatosIng = await electionInstance.getCandidatosConsejoFacultad("Ingenieria");
//     //     const candidatosCyA = await electionInstance.getCandidatosConsejoFacultad("Ciencias y Artes");

//     //     assert.equal(candidatosIng[0][0], "Straw Hat Grand Fleet", "regresa candidato correctamente");
//     //     assert.equal(candidatosIng[0][2], 0, "regresa votos candidatos correctamente");

//     //     assert.equal(candidatosIng[1][0], "Heart Pirates", "regresa candidato correctamente");
//     //     assert.equal(candidatosIng[1][2], 0, "regresa votos candidatos correctamente");

//     //     assert.equal(candidatosIng[2][0], "Whitebeard Pirates", "regresa candidato correctamente");
//     //     assert.equal(candidatosIng[2][2], 0, "regresa votos candidatos correctamente");

//     //     assert.equal(candidatosCyA[0][0], "Straw Hat Grand Fleet", "regresa candidato correctamente");
//     //     assert.equal(candidatosCyA[0][2], 0, "regresa votos candidatos correctamente");

//     //     assert.equal(candidatosCyA[1][0], "Heart Pirates", "regresa candidato correctamente");
//     //     assert.equal(candidatosCyA[1][2], 0, "regresa votos candidatos correctamente");
//     // });

//     // it("regresa candidatos centros estudiantes", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     await electionInstance.addAgrupacion("Heart Pirates", "HP", { from: accounts[0] });
//     //     await electionInstance.addAgrupacion("Whitebeard Pirates", "WBP", { from: accounts[0] });

//     //     const agrupacionSHGF = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");
//     //     const agrupacionHP = await electionInstance.getAgrupacion("Heart Pirates");
//     //     const agrupacionWBP = await electionInstance.getAgrupacion("Whitebeard Pirates");

//     //     await electionInstance.addCentroEstudiantes(agrupacionSHGF, "Ing. de Sistemas", { from: accounts[0] });
//     //     await electionInstance.addCentroEstudiantes(agrupacionHP, "Ing. de Sistemas", { from: accounts[0] });
//     //     await electionInstance.addCentroEstudiantes(agrupacionWBP, "Ing. de Sistemas", { from: accounts[0] });

//     //     await electionInstance.addCentroEstudiantes(agrupacionSHGF, "Economia", { from: accounts[0] });
//     //     await electionInstance.addCentroEstudiantes(agrupacionHP, "Economia", { from: accounts[0] });

//     //     const candidatosSistemas = await electionInstance.getCandidatosCentroEstudiante("Ing. de Sistemas");
//     //     const candidatosEcon = await electionInstance.getCandidatosCentroEstudiante("Economia");

//     //     assert.equal(candidatosSistemas[0][0], "Straw Hat Grand Fleet", "regresa candidato correctamente");
//     //     assert.equal(candidatosSistemas[0][2], 0, "regresa votos candidatos correctamente");

//     //     assert.equal(candidatosSistemas[1][0], "Heart Pirates", "regresa candidato correctamente");
//     //     assert.equal(candidatosSistemas[1][2], 0, "regresa votos candidatos correctamente");

//     //     assert.equal(candidatosSistemas[2][0], "Whitebeard Pirates", "regresa candidato correctamente");
//     //     assert.equal(candidatosSistemas[2][2], 0, "regresa votos candidatos correctamente");

//     //     assert.equal(candidatosEcon[0][0], "Straw Hat Grand Fleet", "regresa candidato correctamente");
//     //     assert.equal(candidatosEcon[0][2], 0, "regresa votos candidatos correctamente");

//     //     assert.equal(candidatosEcon[1][0], "Heart Pirates", "regresa candidato correctamente");
//     //     assert.equal(candidatosEcon[1][2], 0, "regresa votos candidatos correctamente");
//     // });

//     // it("regresa candidatos consejo escuela", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     await electionInstance.addAgrupacion("Heart Pirates", "HP", { from: accounts[0] });
//     //     await electionInstance.addAgrupacion("Whitebeard Pirates", "WBP", { from: accounts[0] });

//     //     const agrupacionSHGF = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");
//     //     const agrupacionHP = await electionInstance.getAgrupacion("Heart Pirates");
//     //     const agrupacionWBP = await electionInstance.getAgrupacion("Whitebeard Pirates");

//     //     await electionInstance.addCoordinacionFCE(agrupacionSHGF, { from: accounts[0] });
//     //     await electionInstance.addCoordinacionFCE(agrupacionHP, { from: accounts[0] });
//     //     await electionInstance.addCoordinacionFCE(agrupacionWBP, { from: accounts[0] });

//     //     const candidatosCoordinacionFCE = await electionInstance.getCandidatosdCoordinacionFCE();

//     //     assert.equal(candidatosCoordinacionFCE[0][0], "Straw Hat Grand Fleet", "regresa candidato correctamente");
//     //     assert.equal(candidatosCoordinacionFCE[0][2], 0, "regresa votos candidatos correctamente");

//     //     assert.equal(candidatosCoordinacionFCE[1][0], "Heart Pirates", "regresa candidato correctamente");
//     //     assert.equal(candidatosCoordinacionFCE[1][2], 0, "regresa votos candidatos correctamente");

//     //     assert.equal(candidatosCoordinacionFCE[2][0], "Whitebeard Pirates", "regresa candidato correctamente");
//     //     assert.equal(candidatosCoordinacionFCE[2][2], 0, "regresa votos candidatos correctamente");     
//     // });

//     // it("regresa candidatos junta directiva", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     await electionInstance.addAgrupacion("Heart Pirates", "HP", { from: accounts[0] });
//     //     await electionInstance.addAgrupacion("Whitebeard Pirates", "WBP", { from: accounts[0] });

//     //     const agrupacionSHGF = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");
//     //     const agrupacionHP = await electionInstance.getAgrupacion("Heart Pirates");
//     //     const agrupacionWBP = await electionInstance.getAgrupacion("Whitebeard Pirates");

//     //     await electionInstance.addJuntaDirectiva(agrupacionSHGF, { from: accounts[0] });
//     //     await electionInstance.addJuntaDirectiva(agrupacionHP, { from: accounts[0] });
//     //     await electionInstance.addJuntaDirectiva(agrupacionWBP, { from: accounts[0] });

//     //     const candidatos = await electionInstance.getCandidatosJuntaDirectivaFCE();

//     //     assert.equal(candidatos[0][0], "Straw Hat Grand Fleet", "regresa nombre candidatos correctamente");
//     //     assert.equal(candidatos[0][2], 0, "regresa votos correctamente");
//     //     assert.equal(candidatos[1][0], "Heart Pirates", "regresa nombre candidatos correctamente");
//     //     assert.equal(candidatos[1][2], 0, "regresa votos correctamente");
//     //     assert.equal(candidatos[2][0], "Whitebeard Pirates", "regresa candidatos correctamente");
//     //     assert.equal(candidatos[2][2], 0, "regresa votos correctamente");

//     // });

//     // it("regresa candidatos coordinacion", async () => {
//     //     await electionInstance.addAgrupacion("Straw Hat Grand Fleet", "SHGF", { from: accounts[0] });
//     //     await electionInstance.addAgrupacion("Heart Pirates", "HP", { from: accounts[0] });
//     //     await electionInstance.addAgrupacion("Whitebeard Pirates", "WBP", { from: accounts[0] });

//     //     const agrupacionSHGF = await electionInstance.getAgrupacion("Straw Hat Grand Fleet");
//     //     const agrupacionHP = await electionInstance.getAgrupacion("Heart Pirates");
//     //     const agrupacionWBP = await electionInstance.getAgrupacion("Whitebeard Pirates");

//     //     await electionInstance.addCoordinacionFCE(agrupacionSHGF, { from: accounts[0] });
//     //     await electionInstance.addCoordinacionFCE(agrupacionHP, { from: accounts[0] });
//     //     await electionInstance.addCoordinacionFCE(agrupacionWBP, { from: accounts[0] });

//     //     const candidatos = await electionInstance.getCandidatosdCoordinacionFCE();

//     //     assert.equal(candidatos[0][0], "Straw Hat Grand Fleet", "regresa nombre candidatos correctamente");
//     //     assert.equal(candidatos[0][2], 0, "regresa votos correctamente");
//     //     assert.equal(candidatos[1][0], "Heart Pirates", "regresa nombre candidatos correctamente");
//     //     assert.equal(candidatos[1][2], 0, "regresa votos correctamente");
//     //     assert.equal(candidatos[2][0], "Whitebeard Pirates", "regresa candidatos correctamente");
//     //     assert.equal(candidatos[2][2], 0, "regresa votos correctamente");
        
//     // });

//     // it("regresa candidatos consejero academico", async () => {
//     //     await electionInstance.addConsejeroAcademico("Monkey D. Luffy", 42, "Ing. de Sistemas", { from: accounts[0] });
//     //     await electionInstance.addConsejeroAcademico("Roronoa Zoro", 66, "Economia", { from: accounts[0] });
//     //     await electionInstance.addConsejeroAcademico("Trafalgar D. Water Law", 3, "Medicina", { from: accounts[0] });
//     //     await electionInstance.addConsejeroAcademico("Marshall D. Teach", 8, "Derecho", { from: accounts[0] });

//     //     const candidatos = await electionInstance.getAllCandidatesConsejoAcademico();

//     //     assert.equal(candidatos[0][0], "Monkey D. Luffy", "regresa candidatos correctamente");
//     //     assert.equal(candidatos[0][1], 42, "regresa candidatos correctamente");
//     //     assert.equal(candidatos[0][2], "Ing. de Sistemas", "regresa candidatos correctamente");

//     //     assert.equal(candidatos[1][0], "Roronoa Zoro", "regresa candidatos correctamente");
//     //     assert.equal(candidatos[1][1], 66, "regresa candidatos correctamente");
//     //     assert.equal(candidatos[1][2], "Economia", "regresa candidatos correctamente");

//     //     assert.equal(candidatos[2][0], "Trafalgar D. Water Law", "regresa candidatos correctamente");
//     //     assert.equal(candidatos[2][1], 3, "regresa candidatos correctamente");
//     //     assert.equal(candidatos[2][2], "Medicina", "regresa candidatos correctamente");

//     //     assert.equal(candidatos[3][0], "Marshall D. Teach", "regresa candidatos correctamente");
//     //     assert.equal(candidatos[3][1], 8, "regresa candidatos correctamente");
//     //     assert.equal(candidatos[3][2], "Derecho", "regresa candidatos correctamente");
//     // });

//     // Pruebas votantes

//     it("registra votante", async () => {
//         await electionInstance.addVotante(1234, ["Ing. de Sistemas"], { from: accounts[0] });
//         const voter = await electionInstance.getVotante(1234);
//         assert.equal(voter[1][0], "Ing. de Sistemas", "has not voted");
//         assert.equal(voter[2], false, "has not voted");

//     });

//     it("registra votante con mas de una carrera", async () => {
//         await electionInstance.addVotante(1234, ["Ing. de Sistemas", "Ing. Industrial"], { from: accounts[0] });
//         const voter = await electionInstance.getVotante(1234);
//         assert.equal(voter[1][0], "Ing. de Sistemas", "registra carrera correctamente");
//         assert.equal(voter[1][1], "Ing. Industrial", "registra carrera correctamente");
//         assert.equal(voter[2], false, "has not voted");
//     });

//     it("agrega a registro electoral", async () => {
//         await electionInstance.agregarARegistroElectoral(123, { from: accounts[0] });
//         const registroElectoral = await electionInstance.inRegistroElectoral(123);

//         assert.equal(registroElectoral, true, "agrega a registro electoral correctamente");
//     });

//     it("no agrega repetido a registro electoral", async () => {
//         try {
//             await electionInstance.agregarARegistroElectoral(42, { from: accounts[0] });
//             assert.fail();
//         } catch (error) {
//             assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
//         }
//     });

//     it("registra facultades de los votantes", async () => {
//         await electionInstance.addVotante(1234, ["Ing. de Sistemas"], { from: accounts[0] });
//         await electionInstance.addVotante(66, ["Economia", "Ing. de Produccion"], { from: accounts[0] });

//         const votante1FacIng = await electionInstance.checkVotanteEnFacultad(1234, "Ingenieria");
//         const votante1FacEco = await electionInstance.checkVotanteEnFacultad(1234, "Ciencias Economicas y Sociales");
//         const votante2FacIng = await electionInstance.checkVotanteEnFacultad(66, "Ingenieria");
//         const votante2FacEco = await electionInstance.checkVotanteEnFacultad(66, "Ciencias Economicas y Sociales");

//         assert.equal(votante1FacIng, true, "regresa facultad correctamente");
//         assert.equal(votante1FacEco, false, "regresa facultad correctamente");
//         assert.equal(votante2FacIng, true, "regresa facultad correctamente");
//         assert.equal(votante2FacEco, true, "regresa facultad correctamente");
//     });

//     it("gets participating sections", async () => {
//         await electionInstance.addVotante(66, ["Economia", "Ing. de Produccion"], { from: accounts[0] });

//         const sections = await electionInstance.getParticipatingSections(66);

//         assert.equal(sections[0], "Junta Directiva FCE", "regresa junta directiva correctamente");
//         assert.equal(sections[1], "Coordinacion FCE", "regresa coordinacion correctamente");
//         assert.equal(sections[2], "Consejo Academico", "regresa consejo academico correctamente");
//         assert.equal(sections[3], "Consejo de Facultad de Ingenieria", "regresa consejo facultad correctamente");
//         assert.equal(sections[4], "Consejo de Facultad de Ciencias Economicas y Sociales", "regresa consejo facultad correctamente");
//         assert.equal(sections[5], "Consejo de Escuela de Economia", "regresa consejo de escuela correctamente");
//         assert.equal(sections[6], "Consejo de Escuela de Ing. de Produccion", "regresa consejo de escuela correctamente");
//         assert.equal(sections[7], "Centro de Estudiantes de Economia", "regresa centro estudiantes correctamente");
//         assert.equal(sections[8], "Centro de Estudiantes de Ing. de Produccion", "regresa centro de estudiantes correctamente");
//     });




// //     it("allows a voter to cast a vote", async () => {
// //         await electionInstance.registerCandidate("Candidate 2", "Los Cooles", "Liberales", { from: accounts[0] });
// //         await electionInstance.registerVoter("1234", accounts[2], "Ing. de Sistemas", { from: accounts[0] });
// //         await electionInstance.vote(0, { from: accounts[2] });
// //         const candidate = await electionInstance.candidates(0);
// //         assert.equal(candidate[3], 1, "increments the candidate's vote count");
// //     });

// //     it("throws an exception for invalid candidates", async () => {
// //         try {
// //             await electionInstance.vote(99, { from: accounts[1] });
// //             assert.fail();
// //         } catch (error) {
// //             assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
// //         }
// //     });

// //     it("throws an exception for double voting", async () => {
// //         await electionInstance.registerCandidate("Candidate 3", "Los Cooles", "Liberales", { from: accounts[0] });
// //         try {
// //             await electionInstance.vote(0, { from: accounts[1] });
// //             await electionInstance.vote(0, { from: accounts[1] });
// //             assert.fail();
// //         } catch (error) {
// //             assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
// //         }
// //     });


// //     it("gets winner of the election", async () => {
// //         await electionInstance.registerCandidate("Candidate 7", "Los Cooles", "Liberales", { from: accounts[0] });
// //         await electionInstance.registerCandidate("Candidate 8", "Los Cooles", "Liberales", { from: accounts[0] });
// //         await electionInstance.registerCandidate("Candidate 9", "Los Cooles", "Liberales", { from: accounts[0] });
// //         await electionInstance.registerVoter("1234", accounts[6], "Ing. de Sistemas", { from: accounts[0] });
// //         await electionInstance.registerVoter("2345", accounts[7], "Ing. de Sistemas", { from: accounts[0] });
// //         await electionInstance.registerVoter("3456", accounts[8], "Ing. de Sistemas", { from: accounts[0] });
// //         await electionInstance.vote(1, { from: accounts[6] });
// //         await electionInstance.vote(1, { from: accounts[7] });
// //         await electionInstance.vote(2, { from: accounts[8] });
// //         const winner = await electionInstance.getWinner();
// //         assert.equal(winner[1], 2, "contains the correct vote count");
// //         assert.equal(winner[0], "Candidate 8", "contains the correct name");
// //     });

// //     it("gets percentage of votes", async () => {
// //         await electionInstance.registerCandidate("Candidate 7", "Los Cooles", "Liberales", { from: accounts[0] });
// //         await electionInstance.registerCandidate("Candidate 8", "Los Cooles", "Liberales", { from: accounts[0] });
// //         await electionInstance.registerCandidate("Candidate 9", "Los Cooles", "Liberales", { from: accounts[0] });
// //         await electionInstance.registerVoter("1234", accounts[6], "Ing. de Sistemas", { from: accounts[0] });
// //         await electionInstance.registerVoter("2345", accounts[7], "Ing. de Sistemas", { from: accounts[0] });
// //         await electionInstance.registerVoter("3456", accounts[8], "Ing. de Sistemas", { from: accounts[0] });
// //         await electionInstance.vote(1, { from: accounts[6] });
// //         await electionInstance.vote(1, { from: accounts[7] });
// //         await electionInstance.vote(2, { from: accounts[8] });
// //         const percentage = await electionInstance.getPercentage();
// //         assert.equal(percentage[0], 0, "contains the correct percentage");
// //         assert.equal(percentage[1], 66, "contains the correct percentage");
// //         assert.equal(percentage[2], 33, "contains the correct percentage");
// //     });

// //     it("gets candidate by id", async () => {
// //         await electionInstance.registerCandidate("Candidate 10", "Los Cooles", "Liberales", { from: accounts[0] });
// //         const candidate = await electionInstance.getCandidateById(0);
// //         assert.equal(candidate[0], "Candidate 10", "contains the correct name");
// //     });

// //     it("gets candidate by name", async () => {
// //         await electionInstance.registerCandidate("Candidate 11", "Los Cooles", "Liberales", { from: accounts[0] });
// //         const candidate = await electionInstance.getCandidateByName("Candidate 11");
// //         assert.equal(candidate[0], "Candidate 11", "contains the correct name");
// //     });

// //     it("gets all candidates", async () => {
// //         await electionInstance.registerCandidate("Candidate 12", "Los Cooles", "Liberales", { from: accounts[0] });
// //         await electionInstance.registerCandidate("Candidate 13", "Los Cooles", "Liberales", { from: accounts[0] });
// //         await electionInstance.registerCandidate("Candidate 14", "Los Cooles", "Liberales", { from: accounts[0] });
// //         const candidates = await electionInstance.getAllCandidates();
// //         assert.equal(candidates[0][0], "Candidate 12", "contains the correct name");
// //         assert.equal(candidates[1][0], "Candidate 13", "contains the correct name");
// //         assert.equal(candidates[2][0], "Candidate 14", "contains the correct name");
// //     });
    
// //     it("gets total votes", async () => {
// //         await electionInstance.registerCandidate("Candidate 12", "Los Cooles", "Liberales", { from: accounts[0] });
// //         await electionInstance.registerCandidate("Candidate 13", "Los Cooles", "Liberales", { from: accounts[0] });
// //         await electionInstance.registerCandidate("Candidate 14", "Los Cooles", "Liberales", { from: accounts[0] });
// //         await electionInstance.registerVoter("1234",accounts[6], "Ing. de Sistemas", { from: accounts[0] });
// //         await electionInstance.registerVoter("2345",accounts[7], "Ing. de Sistemas", { from: accounts[0] });
// //         await electionInstance.registerVoter("3456",accounts[8], "Ing. de Sistemas", { from: accounts[0] });
// //         await electionInstance.vote(1, { from: accounts[6] });
// //         await electionInstance.vote(1, { from: accounts[7] });
// //         await electionInstance.vote(2, { from: accounts[8] });
// //         let totalVotes = await electionInstance.getTotalVotes();
// //         assert.equal(totalVotes, 3, "contains the correct total votes");
// //         await electionInstance.registerVoter("4567", accounts[5], "Liberales", { from: accounts[0] });
// //         await electionInstance.vote(2, { from: accounts[5] });
// //         totalVotes = await electionInstance.getTotalVotes();
// //         assert.equal(totalVotes, 4, "contains the correct total votes");

// //     });

// //     it("gets voters from registry", async () => {
// //         await electionInstance.registerCandidate("Candidate 7", "Los Cooles", "Liberales", { from: accounts[0] });
// //         await electionInstance.registerCandidate("Candidate 8", "Los Cooles", "Liberales", { from: accounts[0] });
// //         await electionInstance.registerCandidate("Candidate 9", "Los Cooles", "Liberales", { from: accounts[0] });
// //         await electionInstance.registerVoter("1234", accounts[6], "Ing. de Sistemas", { from: accounts[0] });
// //         await electionInstance.registerVoter("2345", accounts[7], "Ing. de Sistemas", { from: accounts[0] });
// //         await electionInstance.registerVoter("3456", accounts[8], "Ing. de Sistemas", { from: accounts[0] });
// //         await electionInstance.vote(1, { from: accounts[6] });
// //         await electionInstance.vote(1, { from: accounts[7] });
// //         await electionInstance.vote(2, { from: accounts[8] });

// //         const voterRegistry = await electionInstance.getVoterRegistry();

// //         assert.equal(voterRegistry[0], "1234", "contains the correct id");
// //         assert.equal(voterRegistry[1], "2345", "contains the correct id");
// //         assert.equal(voterRegistry[2], "3456", "contains the correct id");
// //     });

// //     it ("throws exception when double registration", async () => {
// //         try {
// //             await electionInstance.registerVoter("1234", accounts[6], "Ing. de Sistemas", { from: accounts[0] });
// //             await electionInstance.registerVoter("1234", accounts[6], "Ing. de Sistemas", { from: accounts[0] });
// //         } catch (error) {
// //             assert.equal(error.reason, "the voter is already registered");
// //         }
// //     });

// //     it ("registers a new carrera for existing voter", async () => {
// //         await electionInstance.registerVoter("1234", accounts[7], "Ing. de Sistemas", { from: accounts[0] });
// //         await electionInstance.registerVoter("1234", accounts[7], "Ing. Mecanica", { from: accounts[0] });
        
// //         const voterCarreras = await electionInstance.getVoterCarreras(accounts[7]);

// //         assert.equal(voterCarreras[0], "Ing. de Sistemas", "contains the correct carrera");
// //         assert.equal(voterCarreras[1], "Ing. Mecanica", "contains the correct carrera");
// //     });



// });