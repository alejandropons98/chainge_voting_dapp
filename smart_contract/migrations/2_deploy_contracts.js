const Eleccion = artifacts.require('./Eleccion.sol')
const CandidateList = artifacts.require('./CandidateList.sol')
const ListaVotantes = artifacts.require('./ListaVotantes.sol')
const Votante = artifacts.require('./Votante.sol')
const StringCompare = artifacts.require('./StringCompare.sol')
const Candidate = artifacts.require('./Candidate.sol')

module.exports = function (deployer) {
    deployer.deploy(Eleccion)
}