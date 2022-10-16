pragma solidity ^0.8.0;
// SPDX-License-Identifier: UNLICENSED

contract Election {
    // Election details

    string public name;
    string public description;

    address public owner;

    struct Candidate {
        string name;
        string party;
        string degree;
        uint256 voteCount;
    }

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedCandidateId;
    }

    struct Result {
        // uint256 candidateId;
        // Candidate candidate;
        string name;
        uint256 voteCount;
    }

    mapping(address => Voter) public voters;
    Candidate[] public candidates;
    WorkflowStatus public workflowStatus;

    // Para llevar control de cada estado

    enum WorkflowStatus {
        RegisteringVoters,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    constructor() public {
        owner = msg.sender;
        workflowStatus = WorkflowStatus.RegisteringVoters;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier onlyRegisteredVoter() {
        require(
            voters[msg.sender].isRegistered,
            "Only registered voters can call this function."
        );
        _;
    }

    modifier onlyDuringVotingSession() {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "this function can be called only during voting sessions."
        );
        _;
    }

    event VoterRegisteredEvent(address voterAddress);
    event CandidateRegisteredEvent(uint256 candidateId);
    event VotingSessionStartedEvent();
    event VotingSessionEndedEvent();
    event VotedEvent(address voter, uint256 proposalId);
    event VotesTalliedEvent();

    event WorkflowStatusChangeEvent(
        WorkflowStatus previousStatus,
        WorkflowStatus newStatus
    );

    function registerVoter(address _voterAddress) public onlyOwner {
        require(
            !voters[_voterAddress].isRegistered,
            "the voter is already registered"
        );

        voters[_voterAddress].isRegistered = true;
        voters[_voterAddress].hasVoted = false;
        voters[_voterAddress].votedCandidateId = 0;
    }

    function registerCandidate(string memory _name, string memory _party, string memory _degree) public onlyOwner {
        candidates.push(
            Candidate({name: _name, party: _party, degree: _degree, voteCount: 0})
        );

        emit CandidateRegisteredEvent(candidates.length - 1);
    }

    function vote(uint256 candidateId)
        public
        onlyRegisteredVoter
    {
        require(!voters[msg.sender].hasVoted, "the caller has already voted");

        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedCandidateId = candidateId;

        candidates[candidateId].voteCount += 1;

        emit VotedEvent(msg.sender, candidateId);
    }

    // function results() public view returns (Result[] memory) {
    //     Result[] memory results = new Result[](candidates.length);
    //     for (uint i = 0; i < candidates.length; i++) {
    //         results[i] = Result(candidates[i].name, candidates[i].voteCount);
    //     }
    //     return results;
    // }

    function getWinner() public view returns (Result memory) {
        uint256 winnerIndex = 0;
        for (uint256 i = 1; i < candidates.length; i++) {
            if (candidates[i].voteCount > candidates[winnerIndex].voteCount) {
                winnerIndex = i;
            }
        }
        return Result(candidates[winnerIndex].name, candidates[winnerIndex].voteCount);
    }
}
