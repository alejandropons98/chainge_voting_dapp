import { useState } from 'react';
import Web3 from 'web3';
import { ElectionContract } from './abi/abi';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0x55a983FdcC93E1dB2F8Ca382CDae2237D6332978';
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

// Get Candidatos

export const getConsejoAcademicoCandidates = async() => {
    const numeroCandidatosConsejoAcademico = await electionContract.methods.numeroCandidatosConsejoAcademico().call();
    var consejoAcademicoCandidates = [];
    for(let i = 0; i < numeroCandidatosConsejoAcademico; i++){
        consejoAcademicoCandidates.push(await electionContract.methods.candidatosConsejoAcademico(i).call());
    }
    return consejoAcademicoCandidates;
}

export const getJuntaFCECandidates = async() => {
    const numeroCandidatosJuntaFCE = await electionContract.methods.getCandidatosJuntaFCELength().call();
    var candidatosJuntaFCEKeys = [];
    for(let i = 0; i < numeroCandidatosJuntaFCE; i++){
        candidatosJuntaFCEKeys.push(await electionContract.methods.candidatosJuntaFCEKeys(i).call());
    }
    var juntaFCECandidates = [];
    for(let i = 0; i < numeroCandidatosJuntaFCE; i++){
        juntaFCECandidates.push(await electionContract.methods.getCandidatosJuntaFCE(candidatosJuntaFCEKeys[i]).call());
    }
    return juntaFCECandidates;
}
export const getCoordinacionFCECandidates = async() => {
    const numeroCandidatosCoordinacionFCE = await electionContract.methods.getCandidatosCoordinacionFCELength().call();
    var candidatosCoordinacionFCEKeys = [];
    for(let i = 0; i < numeroCandidatosCoordinacionFCE; i++){
        candidatosCoordinacionFCEKeys.push(await electionContract.methods.candidatosCoordinacionFCEKeys(i).call());
    }
    var coordinacionFCECandidates = [];
    for(let i = 0; i < numeroCandidatosCoordinacionFCE; i++){
        coordinacionFCECandidates.push(await electionContract.methods.getCandidatoCoordinacionFCE(candidatosCoordinacionFCEKeys[i]).call());
    }
    return coordinacionFCECandidates;
}

export const getCentroEstudiantesCandidates = async() => {
    const numeroCandidatosCentroEstudiantes = await electionContract.methods.getCandidatosCentroEstudiantesLength().call();
    var candidatosCentroEstudiantesKeys = [];
    for(let i = 0; i < numeroCandidatosCentroEstudiantes; i++){
        candidatosCentroEstudiantesKeys.push(await electionContract.methods.candidatosCentroEstudiantesKeys(i).call());
    }
    const numeroEscuelas = await electionContract.methods.getEscuelasLength().call();
    var centroEstudiantesCandidates = {};
    for(let i = 0; i < numeroEscuelas; i++){
        for(let j = 0; j < numeroCandidatosCentroEstudiantes; j++){
            centroEstudiantesCandidates[escuelas[i]].push(await electionContract.methods.getCandidatoCentroEstudiantes(candidatosCentroEstudiantesKeys[j], escuelas[i]).call());
        }
    }
    return centroEstudiantesCandidates;
}

export const getConsejoEscuelaCandidates = async() => {
    const numeroCandidatosConsejoEscuela = await electionContract.methods.getCandidatosConsejoEscuelaLength().call();
    var candidatosConsejoEscuelaKeys = [];
    for(let i = 0; i < numeroCandidatosConsejoEscuela; i++){
        candidatosConsejoEscuelaKeys.push(await electionContract.methods.candidatosConsejoEscuelaKeys(i).call());
    }
    const numeroEscuelas = await electionContract.methods.getEscuelasLength().call();
    var ConsejoEscuelaCandidates = {};
    for(let i = 0; i < numeroEscuelas; i++){
        for(let j = 0; j < numeroCandidatosConsejoEscuela; j++){
            ConsejoEscuelaCandidates[escuelas[i]].push(await electionContract.methods.getCandidatoConsejoEscuela(candidatosConsejoEscuelaKeys[j], escuelas[i]).call());
        }
    }
    return ConsejoEscuelaCandidates;
}

export const getConsejoFacultadCandidates = async() => {
    const numeroCandidatosConsejoFacultad = await electionContract.methods.getCandidatosConsejoFacultadLength().call();
    var candidatosConsejoFacultadKeys = [];
    for(let i = 0; i < numeroCandidatosConsejoFacultad; i++){
        candidatosConsejoFacultadKeys.push(await electionContract.methods.candidatosConsejoFacultadKeys(i).call());
    }
    const numeroEscuelas = await electionContract.methods.getEscuelasLength().call();
    var ConsejoFacultadCandidates = {};
    for(let i = 0; i < numeroEscuelas; i++){
        for(let j = 0; j < numeroCandidatosConsejoFacultad; j++){
            ConsejoFacultadCandidates[escuelas[i]].push(await electionContract.methods.getCandidatoConsejoFacultad(candidatosConsejoFacultadKeys[j], escuelas[i]).call());
        }
    }
    return ConsejoFacultadCandidates;
}

//End Get Candidatos

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

export const verCandidatosCentroEstudiantes = async() => {
    var candidatos = await electionContract.methods.candidatosCentroEstudiantes().call
    console.log(candidatos)
    return candidatos
}
export const verCandidatosConsejoAcademico = async() => {
    var candidatos = await electionContract.methods.candidatosCentroEstudiantes().call
    console.log(candidatos)
    return candidatos
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

