import { useState, createContext } from "react";
import { ethers } from "ethers";
import DoctorWeb3 from "./abis/DoctorWeb3.json";
import { FormatTypes, Interface } from "ethers/lib/utils";
const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const [address, setAddress] = useState("0x00");
  const [isActive, setIsActive] = useState(false);
  const [doctorWeb3, setDoctorWeb3] = useState();
  const [balance, setBalance] = useState();

  const Connect = async () => {
    if (!window.ethereum) {
      window.alert("Non Ethereum window detected. Please use Metamask");
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const _address = await signer.getAddress();
      let _balance = await provider.getBalance(_address);
      _balance = ethers.utils.formatEther(_balance);
      const NetworkId = provider.network.chainId;
      const contractAddress = DoctorWeb3.networks[NetworkId].address;
      const doctorWeb3_abi = await formatInterface();
      const _doctorWeb3 = new ethers.Contract(
        contractAddress,
        doctorWeb3_abi,
        signer
      );
      setIsActive(true);
      setAddress(_address);
      setDoctorWeb3(_doctorWeb3);
      setBalance(_balance);
      /* setContractAddress(contractAddress) */
    }
  };

  const sendDataForVerification = async (name, medicalId, applicantType) => {
    const tx = await doctorWeb3.ApplyForVerification(
      name,
      "0xB8F2a69af3830Cd4061E2Cbbc5f1617d784806D4",
      medicalId,
      applicantType
    );
    await tx.wait();
    console.log(tx);
    window.alert(`Registered`);
  };

  const formatInterface = async () => {
    let iface = new Interface(DoctorWeb3.abi);
    iface = iface.format(FormatTypes.full);
    return iface;
  };

  const findDHDetails = async (medicalId) => {
    const doctorAddress = await doctorWeb3.findDoctors();
    const hospitalAddress = await doctorWeb3.findHospitals();
    const detailArray = [];
    if (medicalId === 0) {
      const helpObject = {};
      for (let i = 0; i < doctorAddress.length; i++) {
        const data = await doctorWeb3.getAuthorizedDHDetails(doctorAddress[i]);
        data.forEach((element, index) => {
          helpObject["detail" + index] = element;
        });
        detailArray.push(helpObject);
      }
      console.log(detailArray);
      return detailArray;
    } else if (medicalId === 1) {
      for (let i = 0; i < hospitalAddress.length; i++) {
        const data = await doctorWeb3.getAuthorizedDHDetails(doctorAddress[i]);
        console.log(data);
        detailArray.push(data);
      }
      console.log(detailArray);
      return detailArray;
    }
  };

  const UploadReport = async (
    _fileHash,
    _category,
    _age,
    _weight,
    _height,
    _gender,
    _bloodGroup
  ) => {
    const tx = await doctorWeb3.uploadReport(
      _fileHash,
      _category,
      _age,
      _weight,
      _height,
      _gender,
      _bloodGroup
    );
    await tx.wait();
    doctorWeb3.on("ReportUploaded", (fileHash, category) => {
      window.alert(
        `Report with filehash ${fileHash} of ${category} category uploaded successfully`
      );
    });
  };

  return (
    <ContractContext.Provider
      value={{
        Connect,
        address,
        balance,
        isActive,
        doctorWeb3,
        sendDataForVerification,
        findDHDetails,
        UploadReport,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContext;
