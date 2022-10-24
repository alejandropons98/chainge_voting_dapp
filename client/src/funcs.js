import Web3 from 'web3';
import { ElectionContract } from './abi/abi';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0x835fdeb897da96a49aEeEf61b0f275C88C37895b';
const electionContract = new web3.eth.Contract(ElectionContract, contractAddress);


export const load = async () => {
    await loadWeb3();
    const candidates = await getCandidates();
    return candidates;
    // registerVoter('0x14B3AF9486eC9dEAC1fB88B0a2d691187182D148');
    // console.log(electionContract.methods);
    // electionContract.methods.workflowStatus().call().then(console.log);
    
    // electionContract.methods.registerVoter('0x6b6f7f8af8afff1ef518215e550ac14afac7e612').send({from: '0x434Cb1e7A19f4427B6092daE622b56D252a3c92b'}).then(
    //     function(info){
    //         console.log(info);
    //     }
    // );
    // const account = await loadAccount();
    // const election = await loadContract();
    // const accounts = await window.ethereum.enable();
    // const account = accounts[0];
    // console.log(account);

};

export const getVoters = async() => {
    return await electionContract.methods.voters('0x14B3AF9486eC9dEAC1fB88B0a2d691187182D148').call().then(info => console.log(info));
}

const getCandidates = async() => {
    return await electionContract.methods.candidates(0).call().then(res => {return res});
}

function getCandidateById(id){
    electionContract.methods.getCandidateById(id).call().then(
        function(info){
            console.log(info);
        }
    );
};

function registerVoter(address){
    electionContract.methods.registerVoter(address).send({from: '0x22F08B787A6158E2C90831250aF97B6fbCDBdA33'}).then(
        function(info){
            console.log(info);
            return info;
        }
    );
};

const registerCandidate = async(name, party, degree) => {
    await electionContract.methods.registerCandidate(name, party, degree).send({from: '0x22F08B787A6158E2C90831250aF97B6fbCDBdA33'}).then(
        e => console.log(e)
    )
}

export const getWorkflow = async () => {
  await electionContract.methods.workflowStatus().call().then(res => {
    console.log(res);
    return res
});
}

function showOwner(){
    electionContract.methods.owner().call().then(
        function(info){
            console.log(info);
        }
    ).catch(function(err){
        console.log(err);
    });
}

function showName(){
    electionContract.methods.name().call().then(
        function(info){
            console.log(info);
        }
    ).catch(function(err){
        console.log(err);
    });
}


const loadAccount = async () => {
    const account = await web3.eth.getCoinbase();
    console.log(account);
    return account;
};

const loadContract = async () => {
    // const electionContract = contract(ElectionJSON);
    electionContract.setProvider(web3.currentProvider);
    const election = await electionContract.deployed();
};


const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
         const accounts = await window.ethereum.enable();
        //  web3.eth.getAccounts().then(console.log);
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};

