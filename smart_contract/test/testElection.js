const Election = artifacts.require("./Election.sol");

contract("Election", (accounts) => {

    let election;

    beforeEach('should setup the contract instance', async () => {
        election = await Election.new();
    });

    it("registers a candidate", async () => {
        await election.registerCandidate("Candidate 1", "Los Cooles", "Liberales", { from: accounts[0] });
        const candidate = await election.candidates(0);
        assert.equal(candidate[0], "Candidate 1", "contains the correct name");
        assert.equal(candidate[1], "Los Cooles", "contains the correct party");
        assert.equal(candidate[2], "Liberales", "contains the correct degree");
        assert.equal(candidate[3], 0, "contains the correct vote count");
    });

    it("registers a voter", async () => {
        await election.registerVoter(accounts[1], { from: accounts[0] });
        const voter = await election.voters(accounts[1]);
        assert.equal(voter[1], false, "has not voted");
    });

    it("allows a voter to cast a vote", async () => {
        await election.registerCandidate("Candidate 2", "Los Cooles", "Liberales", { from: accounts[0] });
        await election.registerVoter(accounts[2], { from: accounts[0] });
        await election.vote(0, { from: accounts[2] });
        const candidate = await election.candidates(0);
        assert.equal(candidate[3], 1, "increments the candidate's vote count");
    });

    it("throws an exception for invalid candidates", async () => {
        try {
            await election.vote(99, { from: accounts[1] });
            assert.fail();
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        }
    });

    it("throws an exception for double voting", async () => {
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
        await election.registerCandidate("Candidate 4", "Los Cooles", "Liberales", { from: accounts[0] });
        await election.registerCandidate("Candidate 5", "Los Cooles", "Liberales", { from: accounts[0] });
        await election.registerCandidate("Candidate 6", "Los Cooles", "Liberales", { from: accounts[0] });
        await election.registerVoter(accounts[3], { from: accounts[0] });
        await election.registerVoter(accounts[4], { from: accounts[0] });
        await election.registerVoter(accounts[5], { from: accounts[0] });
        await election.vote(1, { from: accounts[3] });
        await election.vote(1, { from: accounts[4] });
        await election.vote(2, { from: accounts[5] });
        const results = await election.results();
        assert.equal(results[1].voteCount, 2, "contains the correct vote count");
        assert.equal(results[1].name, "Candidate 5", "contains the correct name");
    });

    it("gets winner of the election", async () => {
        await election.registerCandidate("Candidate 7", "Los Cooles", "Liberales", { from: accounts[0] });
        await election.registerCandidate("Candidate 8", "Los Cooles", "Liberales", { from: accounts[0] });
        await election.registerCandidate("Candidate 9", "Los Cooles", "Liberales", { from: accounts[0] });
        await election.registerVoter(accounts[6], { from: accounts[0] });
        await election.registerVoter(accounts[7], { from: accounts[0] });
        await election.registerVoter(accounts[8], { from: accounts[0] });
        await election.vote(1, { from: accounts[6] });
        await election.vote(1, { from: accounts[7] });
        await election.vote(2, { from: accounts[8] });
        const winner = await election.getWinner();
        assert.equal(winner[1], 2, "contains the correct vote count");
        assert.equal(winner[0], "Candidate 8", "contains the correct name");
    });


});