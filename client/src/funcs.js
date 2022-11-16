import { useState } from 'react';
import Web3 from 'web3';
import { ElectionContract } from './abi/abi';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0x244f881E839a7e342F10Eec0787405bc703Dd321';
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

// Esto no es algo que necesitamos ahorita. Vamos a tener que agregar un array de Voters (Ahorita es un mapping)
// export const getVoters = async() => {
//     return await electionContract.methods.voters(contractAddress).call().then(info => console.log(info));
// }

export const vote = async(id) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    await electionContract.methods.vote(id).send({from: account}).then(info => 
        console.log(info));

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

export const getActiveVoters = async() => {
    var voters = await electionContract.methods.getVoterRegistry().call();
    return voters;
}

export const registerCandidate = async(name, party, degree) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0]
    await electionContract.methods.registerCandidate(name, party, degree).send({from: account}).then(
        e => console.log(e)
    )
}

export const registerVoter = async(id, address, major) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    await electionContract.methods.registerVoter(id, address, major).send({from: account}).then(
        function(info){
            console.log(info)
        }
    );
}


const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};

