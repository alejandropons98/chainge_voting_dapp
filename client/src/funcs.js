import Web3 from 'web3';
import { ElectionContract } from './abi/abi';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0xA98370E06Ef5A917D6E9c41B3EcD6A6dfc1C60c5'; //Migration Address
const electionContract = new web3.eth.Contract(ElectionContract, contractAddress);


export const load = async () => {
    await loadWeb3();
    // await registerCandidate('Alejandro', 'Partido de la U', 'Ingeniero');
    // await registerCandidate('Robert', 'Partido de la U', 'Ingeniero');
    // await registerCandidate('Rubin', 'Partido de la A', 'Ingenierou');
    const candidates = await getCandidates();
    //Primer Address Migration y Segundo primera de Ganache o las de Ganache
    // electionContract.methods.registerVoter("0",'0xA98370E06Ef5A917D6E9c41B3EcD6A6dfc1C60c5').send({from: '0xb5F5DfFa482505d45bC1D1529BcAF5eD51D4A3b4'}).then(
    //     function(info){
    //         console.log(info);
    //     }
    // );
    // electionContract.methods.registerVoter("1",'0xA98370E06Ef5A917D6E9c41B3EcD6A6dfc1C60c5').send({from: '0x791736a32462DBA56489e166d45C47F7426bE574'}).then(
    //     function(info){
    //         console.log(info);
    //     }
    // );

    return candidates;
    

    // console.log(electionContract.methods);
    // electionContract.methods.workflowStatus().call().then(console.log);
    
    // electionContract.methods.registerVoter('0xA98370E06Ef5A917D6E9c41B3EcD6A6dfc1C60c5').send({from: '0xb5F5DfFa482505d45bC1D1529BcAF5eD51D4A3b4'}).then(
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

export const vote = async(id) => {
    const accounts = await window.ethereum.enable();
    console.log(accounts)
    await electionContract.methods.registerVoter("0",'0x11968dBbD2703CA81f04a1D630b9D4081aA95e75').send({from: '0x791736a32462DBA56489e166d45C47F7426bE574'}).then(
        function(info){
            console.log(info);
        }
    );
    await electionContract.methods.vote(id).send({from: accounts}).then(info => console.log(info));
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

function registerVoter(id,address){
    electionContract.methods.registerVoter(id,address).send({from: '0xb5F5DfFa482505d45bC1D1529BcAF5eD51D4A3b4'}).then(
        function(info){
            console.log(info);
            return info;
        }
    );
};

// export const voterRegistry = async (name) => {
//     var registry = await electionContract.methods.voterRegistry(name).call()
//     console.log(registry)
//     return registry
// };

export const registerCandidate = async(name, party, degree) => {
    console.log(electionContract.methods)                                               //Metamask que estes usado
    await electionContract.methods.registerCandidate(name, party, degree).send({from: '0xb5F5DfFa482505d45bC1D1529BcAF5eD51D4A3b4'}).then(
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

