const Election = artifacts.require("./Election.sol");

contract("Election", (accounts) => {
    let electionInstance;
    beforeEach(async () => {
        electionInstance = await Election.new();
    });

    it("registers a candidate", async () => {
        await electionInstance.registerCandidate("Candidate 1", "Los Cooles", "Liberales", { from: accounts[0] });
        const candidate = await electionInstance.candidates(0);
        assert.equal(candidate[0], "Candidate 1", "contains the correct name");
        assert.equal(candidate[1], "Los Cooles", "contains the correct party");
        assert.equal(candidate[2], "Liberales", "contains the correct degree");
        assert.equal(candidate[3], 0, "contains the correct vote count");
    });

    it("registers a voter", async () => {
        await electionInstance.registerVoter("1234", accounts[1], "Ing. guhy", { from: accounts[0] });
        const voter = await electionInstance.voters(accounts[1]);
        assert.equal(voter[1], false, "has not voted");
    });

    it("allows a voter to cast a vote", async () => {
        await electionInstance.registerCandidate("Candidate 2", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerVoter("1234", accounts[2], "Ing. Sistemas", { from: accounts[0] });
        await electionInstance.vote(0, { from: accounts[2] });
        const candidate = await electionInstance.candidates(0);
        assert.equal(candidate[3], 1, "increments the candidate's vote count");
    });

    it("throws an exception for invalid candidates", async () => {
        try {
            await electionInstance.vote(99, { from: accounts[1] });
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });

    it("throws an exception for double voting", async () => {
        await electionInstance.registerCandidate("Candidate 3", "Los Cooles", "Liberales", { from: accounts[0] });
        try {
            await electionInstance.vote(0, { from: accounts[1] });
            await electionInstance.vote(0, { from: accounts[1] });
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });

    it("gets winner of the election", async () => {
        await electionInstance.registerCandidate("Candidate 7", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerCandidate("Candidate 8", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerCandidate("Candidate 9", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerVoter("1234", accounts[6], "Ing. Sistemas", { from: accounts[0] });
        await electionInstance.registerVoter("2345", accounts[7], "Ing. Sistemas", { from: accounts[0] });
        await electionInstance.registerVoter("3456", accounts[8], "Ing. Sistemas", { from: accounts[0] });
        await electionInstance.vote(1, { from: accounts[6] });
        await electionInstance.vote(1, { from: accounts[7] });
        await electionInstance.vote(2, { from: accounts[8] });
        const winner = await electionInstance.getWinner();
        assert.equal(winner[1], 2, "contains the correct vote count");
        assert.equal(winner[0], "Candidate 8", "contains the correct name");
    });

    it("gets percentage of votes", async () => {
        await electionInstance.registerCandidate("Candidate 7", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerCandidate("Candidate 8", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerCandidate("Candidate 9", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerVoter("1234", accounts[6], "Ing. Sistemas", { from: accounts[0] });
        await electionInstance.registerVoter("2345", accounts[7], "Ing. Sistemas", { from: accounts[0] });
        await electionInstance.registerVoter("3456", accounts[8], "Ing. Sistemas", { from: accounts[0] });
        await electionInstance.vote(1, { from: accounts[6] });
        await electionInstance.vote(1, { from: accounts[7] });
        await electionInstance.vote(2, { from: accounts[8] });
        const percentage = await electionInstance.getPercentage();
        assert.equal(percentage[0], 0, "contains the correct percentage");
        assert.equal(percentage[1], 66, "contains the correct percentage");
        assert.equal(percentage[2], 33, "contains the correct percentage");
    });

    it("gets candidate by id", async () => {
        await electionInstance.registerCandidate("Candidate 10", "Los Cooles", "Liberales", { from: accounts[0] });
        const candidate = await electionInstance.getCandidateById(0);
        assert.equal(candidate[0], "Candidate 10", "contains the correct name");
    });

    it("gets candidate by name", async () => {
        await electionInstance.registerCandidate("Candidate 11", "Los Cooles", "Liberales", { from: accounts[0] });
        const candidate = await electionInstance.getCandidateByName("Candidate 11");
        assert.equal(candidate[0], "Candidate 11", "contains the correct name");
    });

    it("gets all candidates", async () => {
        await electionInstance.registerCandidate("Candidate 12", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerCandidate("Candidate 13", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerCandidate("Candidate 14", "Los Cooles", "Liberales", { from: accounts[0] });
        const candidates = await electionInstance.getAllCandidates();
        assert.equal(candidates[0][0], "Candidate 12", "contains the correct name");
        assert.equal(candidates[1][0], "Candidate 13", "contains the correct name");
        assert.equal(candidates[2][0], "Candidate 14", "contains the correct name");
    });
    
    it("gets total votes", async () => {
        await electionInstance.registerCandidate("Candidate 12", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerCandidate("Candidate 13", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerCandidate("Candidate 14", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerVoter("1234",accounts[6], "Ing. Sistemas", { from: accounts[0] });
        await electionInstance.registerVoter("2345",accounts[7], "Ing. Sistemas", { from: accounts[0] });
        await electionInstance.registerVoter("3456",accounts[8], "Ing. Sistemas", { from: accounts[0] });
        await electionInstance.vote(1, { from: accounts[6] });
        await electionInstance.vote(1, { from: accounts[7] });
        await electionInstance.vote(2, { from: accounts[8] });
        let totalVotes = await electionInstance.getTotalVotes();
        assert.equal(totalVotes, 3, "contains the correct total votes");
        await electionInstance.registerVoter("4567", accounts[5], "Liberales", { from: accounts[0] });
        await electionInstance.vote(2, { from: accounts[5] });
        totalVotes = await electionInstance.getTotalVotes();
        assert.equal(totalVotes, 4, "contains the correct total votes");

    });

    it("gets voters from registry", async () => {
        await electionInstance.registerCandidate("Candidate 7", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerCandidate("Candidate 8", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerCandidate("Candidate 9", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerVoter("1234", accounts[6], "Ing. Sistemas", { from: accounts[0] });
        await electionInstance.registerVoter("2345", accounts[7], "Ing. Sistemas", { from: accounts[0] });
        await electionInstance.registerVoter("3456", accounts[8], "Ing. Sistemas", { from: accounts[0] });
        await electionInstance.vote(1, { from: accounts[6] });
        await electionInstance.vote(1, { from: accounts[7] });
        await electionInstance.vote(2, { from: accounts[8] });

        const voterRegistry = await electionInstance.getVoterRegistry();

        assert.equal(voterRegistry[0], "1234", "contains the correct id");
        assert.equal(voterRegistry[1], "2345", "contains the correct id");
        assert.equal(voterRegistry[2], "3456", "contains the correct id");
    });

    it ("throws exception when double registration", async () => {
        try {
            await electionInstance.registerVoter("1234", accounts[6], "Ing. Sistemas", { from: accounts[0] });
            await electionInstance.registerVoter("1234", accounts[6], "Ing. Sistemas", { from: accounts[0] });
        } catch (error) {
            assert.equal(error.reason, "the voter is already registered");
        }
    });

    it ("registers a new carrera for existing voter", async () => {
        await electionInstance.registerVoter("1234", accounts[7], "Ing. Sistemas", { from: accounts[0] });
        await electionInstance.registerVoter("1234", accounts[7], "Ing. Mecanica", { from: accounts[0] });
        
        const voterCarreras = await electionInstance.getVoterCarreras(accounts[7]);

        assert.equal(voterCarreras[0], "Ing. Sistemas", "contains the correct carrera");
        assert.equal(voterCarreras[1], "Ing. Mecanica", "contains the correct carrera");
    });



});