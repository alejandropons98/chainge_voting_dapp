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
        uint id;
    }

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        string voterID;        uint16 voteCount;
        string[] carreras;
    }

    struct Result {
        string name;
        uint256 voteCount;
    }

    mapping(address => Voter) public voters;
    Candidate[] public candidates;
    string[] public parties;
    WorkflowStatus public workflowStatus;
    string[] public voterRegistry;

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

    function registerVoter(string memory voterID, address _voterAddress, string memory carrera) public onlyOwner {
        require(
            !voters[_voterAddress].isRegistered || !carreraRegistrada(carrera, _voterAddress),
            "the voter is already registered"
        );

        if (!voters[_voterAddress].isRegistered){
            voters[_voterAddress].isRegistered = true;
            voters[_voterAddress].hasVoted = false;
            voters[_voterAddress].voterID = voterID;
        }
        
        voters[_voterAddress].carreras.push(carrera);

        emit VoterRegisteredEvent(_voterAddress);
    }

    function carreraRegistrada(string memory carrera, address _voterAddress) public view returns (bool){
        for(uint i = 0; i < voters[_voterAddress].carreras.length; i++){
            if(keccak256(abi.encodePacked(voters[_voterAddress].carreras[i])) == keccak256(abi.encodePacked(carrera))){
                return true;
            }
        }
        return false;
    }

    function registerCandidate(string memory _name, string memory _party, string memory _degree) public onlyOwner {
        candidates.push(
            Candidate({name: _name, party: _party, degree: _degree, voteCount: 0, id: candidates.length})
        );

        if (!isPartyRegistered(_party)) {
            parties.push(_party);
        }

        emit CandidateRegisteredEvent(candidates.length - 1);
    }

    function isPartyRegistered(string memory party) public view returns (bool) {
        for (uint i = 0; i < parties.length; i++) {
            if (keccak256(abi.encodePacked(parties[i])) == keccak256(abi.encodePacked(party))) {
                return true;
            }
        }
        return false;
    }

    function vote(uint256 candidateId)
        public
        onlyRegisteredVoter
    {
        require(!voters[msg.sender].hasVoted, "the caller has already voted");

        voters[msg.sender].hasVoted = true;
        candidates[candidateId].voteCount += 1;
        voterRegistry.push(voters[msg.sender].voterID);

        emit VotedEvent(msg.sender, candidateId);
    }

    function getCandidateById(uint256 candidateId)
        public
        view
        returns (
            string memory name,
            string memory party,
            string memory degree,
            uint256 voteCount,
            uint id
        )
    {
        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].id == candidateId) {
                return (candidates[i].name, candidates[i].party, candidates[i].degree, candidates[i].voteCount, candidates[i].id);
            }
        }
    }

    function getCandidateByName(string memory Sname)
        public
        view
        returns (
            string memory name,
            string memory party,
            string memory degree,
            uint256 voteCount
        )
    {
        for (uint i = 0; i < candidates.length; i++) {
            if (keccak256(abi.encodePacked(candidates[i].name)) == keccak256(abi.encodePacked(Sname))) {
                return (candidates[i].name, candidates[i].party, candidates[i].degree, candidates[i].voteCount);
            }
        }
    }

    function getAllCandidates()
        public
        view
        returns (Candidate[] memory)
    {
        return candidates;
    }

    function getWinner() public view returns (Result memory) {
        uint256 winnerIndex = 0;
        for (uint256 i = 1; i < candidates.length; i++) {
            if (candidates[i].voteCount > candidates[winnerIndex].voteCount) {
                winnerIndex = i;
            }
        }
        return Result(candidates[winnerIndex].name, candidates[winnerIndex].voteCount);
    }

    function getTotalVotes() public view returns (uint256) {
        uint256 totalVotes = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            totalVotes += candidates[i].voteCount;
        }
        return totalVotes;
    }

    function getPercentage() public view returns (uint256[] memory) {
        uint256 totalVotes = getTotalVotes();
        uint256[] memory percentage = new uint256[](candidates.length);
        for (uint256 i = 0; i < candidates.length; i++) {
            percentage[i] = ((candidates[i].voteCount * 100) / totalVotes);
        }
        return percentage;
    }

    function getVoterRegistry() public view returns (string[] memory) {
        
        string[] memory myRegistry = new string[](voterRegistry.length);
        for(uint i = 0; i < voterRegistry.length; i++){
            myRegistry[i] = voterRegistry[i];
        }
        return myRegistry;
    }

    function getVoterCarreras(address _voterAddress) public view returns (string[] memory) {
        return voters[_voterAddress].carreras;
    }
}
