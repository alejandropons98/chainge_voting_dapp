const Election = artifacts.require("./Election.sol");

contract("Election", (accounts) => {
    it("registers a candidate", async () => {
        const election = await Election.deployed();
        await election.registerCandidate("Candidate 1", "Los Cooles", "Liberales", { from: accounts[0] });
        const candidate = await election.candidates(0);
        assert.equal(candidate[0], "Candidate 1", "contains the correct name");
        assert.equal(candidate[1], "Los Cooles", "contains the correct party");
        assert.equal(candidate[2], "Liberales", "contains the correct degree");
        assert.equal(candidate[3], 0, "contains the correct vote count");
    });

    it("registers a voter", async () => {
        const election = await Election.deployed();
        await election.registerVoter(accounts[1], { from: accounts[0] });
        const voter = await election.voters(accounts[1]);
        assert.equal(voter[1], false, "has not voted");
    });

    it("allows a voter to cast a vote", async () => {
        const election = await Election.deployed();
        await election.registerCandidate("Candidate 2", "Los Cooles", "Liberales", { from: accounts[0] });
        await election.registerVoter(accounts[2], { from: accounts[0] });
        await election.vote(0, { from: accounts[2] });
        const candidate = await election.candidates(0);
        assert.equal(candidate[3], 1, "increments the candidate's vote count");
    });

    it("throws an exception for invalid candidates", async () => {
        const election = await Election.deployed();
        try {
            await election.vote(99, { from: accounts[1] });
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });

    it("throws an exception for double voting", async () => {
        const election = await Election.deployed();
        await election.registerCandidate("Candidate 3", "Los Cooles", "Liberales", { from: accounts[0] });
        try {
            await election.vote(0, { from: accounts[1] });
            await election.vote(0, { from: accounts[1] });
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });

    it("shows results", async () => {
        const election = await Election.deployed();
        await election.registerCandidate("Candidate 4", "Los Cooles", "Liberales", { from: accounts[0] });
        await election.registerCandidate("Candidate 5", "Los Cooles", "Liberales", { from: accounts[0] });
        await election.registerCandidate("Candidate 6", "Los Cooles", "Liberales", { from: accounts[0] });
        await election.registerVoter(accounts[3], { from: accounts[0] });
        await election.registerVoter(accounts[4], { from: accounts[0] });
        await election.registerVoter(accounts[5], { from: accounts[0] });
        await election.vote(3, { from: accounts[3] });
        await election.vote(3, { from: accounts[4] });
        await election.vote(4, { from: accounts[5] });
        const results = await election.results();
        assert.equal(results.candidateId, 3, "contains the correct candidate id");
        assert.equal(results.candidate.voteCount, 2, "contains the correct vote count");
    });

});