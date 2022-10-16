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

});