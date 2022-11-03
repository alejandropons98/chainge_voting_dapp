import Web3 from 'web3';
import { ElectionContract } from './abi/abi';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0xB82d199eadfab8E51AC0E659FC2a84F9AC27274e';
const electionContract = new web3.eth.Contract(ElectionContract, contractAddress);


export const load = async () => {
    await loadWeb3();
    const candidates = await getCandidates();
    //Primer Address Migration y Segundo primera de Ganache o las de Ganache
    // electionContract.methods.registerVoter("0",'0xA98370E06Ef5A917D6E9c41B3EcD6A6dfc1C60c5').send({from: '0xb5F5DfFa482505d45bC1D1529BcAF5eD51D4A3b4'}).then(
    //     function(info){
    //         console.log(info);
    //     }
    // );
    return candidates;

};

export const getVoters = async() => {
    return await electionContract.methods.voters(contractAddress).call().then(info => console.log(info));
}

export const vote = async(id) => {
    const accounts = await window.ethereum.enable();
    const addressMetamask = accounts[0];
    await electionContract.methods.registerVoter("12",contractAddress, "carrera").send({from: addressMetamask}).then(
        function(info){
            console.log(info);
            console.log("registradou")
        }
    );
    await electionContract.methods.vote(id).send({from: addressMetamask}).then(info => console.log(info));

}

//Necesitamos poder jalar el numero de candidatos del contrato
export const getCandidates = async() => {
    var candidates = await electionContract.methods.getAllCandidates().call();
    return candidates;
}

// function getCandidateById(id){
//     electionContract.methods.getCandidateById(id).call().then(
//         function(info){
//             console.log(info);
//             return info;

//         }
//     );
// };

// export const voterRegistry = async (name) => {
//     var registry = await electionContract.methods.voterRegistry(name).call()
//     console.log(registry)
//     return registry
// };

export const registerCandidate = async(name, party, degree) => {
    const accounts = await window.ethereum.enable();
    const addressMetamask = accounts[0]
    await electionContract.methods.registerCandidate(name, party, degree).send({from: addressMetamask}).then(
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

