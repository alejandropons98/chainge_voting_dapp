import { useState } from 'react';
import Web3 from 'web3';
import { ElectionContract } from './abi/abi';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0x1CA8c2A68D0fEE1E0F240Ab568d06EFC8EDd5120';
const electionContract = new web3.eth.Contract(ElectionContract, contractAddress);


export const load = async () => {
    await loadWeb3();
    //Primer Address Migration y Segundo primera de Ganache o las de Ganache
    // electionContract.methods.registerVoter("0",'0xA98370E06Ef5A917D6E9c41B3EcD6A6dfc1C60c5').send({from: '0xb5F5DfFa482505d45bC1D1529BcAF5eD51D4A3b4'}).then(
    //     function(info){
    //         console.log(info);
    //     }
    // );
    return;

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

export const registerNewId = async(id) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    await electionContract.methods.agregarIDARegistro(id).send({from: account}).then(info => 
        console.log(info));
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
export const registerCandidateJDFCE = async(agrupacion, siglas) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0]
    await electionContract.methods.agregarCandidatoJuntaDirectivaFCE(agrupacion, siglas).send({from: account}).then(
        e => console.log(e)
    )
}
export const registerCandidateCCFCE = async(agrupacion,siglas) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0]
    await electionContract.methods.agregarCandidatoCoordinacionFCE(agrupacion,siglas).send({from: account}).then(
        e => console.log(e)
    )
}
export const registerConsejoAcademico = async(name, carrera, id) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0]
    await electionContract.methods.agregarCandidatoConsejoAcademico(name, id, carrera).send({from: account}).then(
        e => console.log(e)
    )
}
export const registerConsejoFacultad = async(name, siglas, facultad) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0]
    await electionContract.methods.agregarCandidatoConsejoFacultad(name, siglas, facultad).send({from: account}).then(
        e => console.log(e)
    )
}
export const registerConsejoEscuela = async(name, siglas, escuela) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0]
    await electionContract.methods.agregarCandidatoConsejoEscuela(name, siglas, escuela).send({from: account}).then(
        e => console.log(e)
    )
}

export const registerVoter = async(id, carreras, facultades) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    await electionContract.methods.agregarVotante(id, carreras, facultades).send({from: account}).then(
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

