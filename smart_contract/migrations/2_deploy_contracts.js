const MyContract = artifacts.require('./Eleccion.sol')

module.exports = function (deployer) {
  deployer.deploy(MyContract, { gas: 5000000 })
}