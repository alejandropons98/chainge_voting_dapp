import Web3 from 'web3';
import { ElectionContract } from './abi/abi';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0x0135603EA935baEBD6F2eC7faA4A9DE82b1D569f';
const electionContract = new web3.eth.Contract(ElectionContract, contractAddress);

export const load = async () => {
    await loadWeb3();
    // console.log(electionContract.methods);
    electionContract.methods.registerVoter('0x6b6f7f8af8afff1ef518215e550ac14afac7e612').send({from: '0x434Cb1e7A19f4427B6092daE622b56D252a3c92b'}).then(
        function(info){
            console.log(info);
        }
    );
    // const account = await loadAccount();
    // const election = await loadContract();
    // const accounts = await window.ethereum.enable();
    // const account = accounts[0];
    // console.log(account);

};

function getCandidateById(id){
    electionContract.methods.getCandidateById(id).call().then(
        function(info){
            console.log(info);
        }
    );
};

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
         console.log(accounts[0]);
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};

