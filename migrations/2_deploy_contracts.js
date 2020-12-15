const Kh3mToken = artifacts.require("Kh3mToken.sol");

module.exports = deployer => deployer.deploy(Kh3mToken, 1000000);
