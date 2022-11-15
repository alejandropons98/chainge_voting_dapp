var Election = artifacts.require("Election");
var StringComp = artifacts.require("StringComp");
var PartyLib = artifacts.require("PartyLib");

module.exports = function(deployer) {
    deployer.deploy(StringComp);
    deployer.link(StringComp, [PartyLib, Election]);
    deployer.deploy(PartyLib);
    deployer.link(PartyLib, Election);
    deployer.deploy(Election);
};