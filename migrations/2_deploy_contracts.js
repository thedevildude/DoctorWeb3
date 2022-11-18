const DoctorWeb3 = artifacts.require("DoctorWeb3");

module.exports = async function (deployer) {
    await deployer.deploy(DoctorWeb3);
  };