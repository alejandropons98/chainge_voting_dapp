import { useState } from 'react';
import Web3 from 'web3';
import { ElectionContract } from './abi/abi';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0x742BB983DFAD1316FF195c866aA3787De3c05D2b';
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
    const numeroCandidatosConsejoAcademico = await electionContract.methods.getCandidatosConsejoAcademicoLength().call();
    var candidatosConsejoAcademicoKeys = [];
    for(let i = 0; i < numeroCandidatosConsejoAcademico; i++){
        candidatosConsejoAcademicoKeys.push(await electionContract.methods.candidatosConsejoAcademicoKeys(i).call());
    }
    var ConsejoAcademicoCandidates = [];
    for(let i = 0; i < numeroCandidatosConsejoAcademico; i++){
        ConsejoAcademicoCandidates.push(await electionContract.methods.getCandidatoConsejoAcademico(candidatosConsejoAcademicoKeys[i]).call());
    }
    return ConsejoAcademicoCandidates;
}

export const getJuntaFCECandidates = async() => {
    const numeroCandidatosJuntaFCE = await electionContract.methods.getCandidatosJuntaFCELength().call();
    var candidatosJuntaFCEKeys = [];
    for(let i = 0; i < numeroCandidatosJuntaFCE; i++){
        candidatosJuntaFCEKeys.push(await electionContract.methods.candidatosJuntaFCEKeys(i).call());
    }
    var juntaFCECandidates = [];
    for(let i = 0; i < numeroCandidatosJuntaFCE; i++){
        juntaFCECandidates.push(await electionContract.methods.getCandidatoJuntaDirectivaFCE(candidatosJuntaFCEKeys[i]).call());
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

export const getCentroEstudiantesCandidates = async(object) => {
    var candidato = await electionContract.methods.getCandidatoCentroEstudiantes(object.siglas, object.escuela).call()
    return candidato;
}

export const getConsejoEscuelaCandidates = async(object) => {
    var candidato = await electionContract.methods.getCandidatoConsejoEscuela(object.siglas, object.escuela).call()
    return candidato;
}

export const getConsejoFacultadCandidates = async(object) => {
    var candidato = await electionContract.methods.getCandidatoConsejoFacultad(object.siglas, object.facultad).call()
    return candidato;
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
//Registros
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

export const registerPlanchaCentroEstudiantes = async(name, siglas, escuela) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0]
    await electionContract.methods.agregarCandidatoCentroEstudiantes(name, siglas, escuela).send({from: account}).then(
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
// EndRegistros

// Votar
export const voteCandidateJDFCE = async(siglas,voterId) => {
    const accounts = await window.ethereum.enable()
    const account = accounts[0]
    await electionContract.methods.voteCandidatoJuntaDirectivaFCE(siglas,voterId).send({from: account}).then(info => 
        console.log(info));
}
export const voteCandidateCoordFCE = async(siglas,voterId) => {
    const accounts = await window.ethereum.enable()
    const account = accounts[0]
    await electionContract.methods.voteCandidatoCoordinacionFCE(siglas,voterId).send({from: account}).then(info => 
        console.log(info));
}
export const voteCentroEstudiantes = async(siglas,escuela,voterId) => {
    const accounts = await window.ethereum.enable()
    const account = accounts[0]
    await electionContract.methods.voteCandidatoCentroEstudiantes(siglas,escuela,voterId).send({from: account}).then(info => 
        console.log(info));
}
export const voteCandidateConsejoAcademico = async(consejeroId,voterId) => {
    const accounts = await window.ethereum.enable()
    const account = accounts[0]
    await electionContract.methods.voteCandidatoConsejoAcademico(consejeroId,voterId).send({from: account}).then(info => 
        console.log(info));
}
export const voteCandidateConsejoEscuela = async(siglas, escuela, voterId) => {
    const accounts = await window.ethereum.enable()
    const account = accounts[0]
    await electionContract.methods.voteCandidatoConsejoEscuela(siglas,escuela, voterId).send({from: account}).then(info => 
        console.log(info));
}
export const voteCandidateConsejoFacultad = async(siglas, facultad, voterId) => {
    const accounts = await window.ethereum.enable()
    const account = accounts[0]
    await electionContract.methods.voteCandidatoConsejoFacultad(siglas,facultad, voterId).send({from: account}).then(info => 
        console.log(info));
}
// End Votos Funcs


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