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
        await electionInstance.registerVoter(accounts[1], { from: accounts[0] });
        const voter = await electionInstance.voters(accounts[1]);
        assert.equal(voter[1], false, "has not voted");
    });

    it("allows a voter to cast a vote", async () => {
        await electionInstance.registerCandidate("Candidate 2", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerVoter(accounts[2], { from: accounts[0] });
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

    // it("shows results", async () => {
    //     await electionInstance.registerCandidate("Candidate 4", "Los Cooles", "Liberales", { from: accounts[0] });
    //     await electionInstance.registerCandidate("Candidate 5", "Los Cooles", "Liberales", { from: accounts[0] });
    //     await electionInstance.registerCandidate("Candidate 6", "Los Cooles", "Liberales", { from: accounts[0] });
    //     await electionInstance.registerVoter(accounts[3], { from: accounts[0] });
    //     await electionInstance.registerVoter(accounts[4], { from: accounts[0] });
    //     await electionInstance.registerVoter(accounts[5], { from: accounts[0] });
    //     await electionInstance.vote(3, { from: accounts[3] });
    //     await electionInstance.vote(3, { from: accounts[4] });
    //     await electionInstance.vote(4, { from: accounts[5] });
    //     const results = await electionInstance.results();
    //     assert.equal(results.candidateId, 3, "contains the correct candidate id");
    //     assert.equal(results.candidate.voteCount, 2, "contains the correct vote count");
    // });

    it("gets winner of the election", async () => {
        await electionInstance.registerCandidate("Candidate 7", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerCandidate("Candidate 8", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerCandidate("Candidate 9", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerVoter(accounts[6], { from: accounts[0] });
        await electionInstance.registerVoter(accounts[7], { from: accounts[0] });
        await electionInstance.registerVoter(accounts[8], { from: accounts[0] });
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
        await electionInstance.registerVoter(accounts[6], { from: accounts[0] });
        await electionInstance.registerVoter(accounts[7], { from: accounts[0] });
        await electionInstance.registerVoter(accounts[8], { from: accounts[0] });
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

    it("gets total votes", async () => {
        await electionInstance.registerCandidate("Candidate 12", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerCandidate("Candidate 13", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerCandidate("Candidate 14", "Los Cooles", "Liberales", { from: accounts[0] });
        await electionInstance.registerVoter(accounts[6], { from: accounts[0] });
        await electionInstance.registerVoter(accounts[7], { from: accounts[0] });
        await electionInstance.registerVoter(accounts[8], { from: accounts[0] });
        await electionInstance.vote(1, { from: accounts[6] });
        await electionInstance.vote(1, { from: accounts[7] });
        await electionInstance.vote(2, { from: accounts[8] });
        let totalVotes = await electionInstance.getTotalVotes();
        assert.equal(totalVotes, 3, "contains the correct total votes");
        await electionInstance.registerVoter(accounts[5], { from: accounts[0] });
        await electionInstance.vote(2, { from: accounts[5] });
        totalVotes = await electionInstance.getTotalVotes();
        assert.equal(totalVotes, 4, "contains the correct total votes");

    });


});