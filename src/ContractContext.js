import { useState, createContext } from "react";
import { ethers } from "ethers";
import DoctorWeb3 from './abis/DoctorWeb3.json';
import { FormatTypes, Interface } from "ethers/lib/utils";
const ContractContext = createContext()

export const ContractProvider = ({ children }) => {
    const [address, setAddress] = useState("0x00")
    const [isActive, setIsActive] = useState(false)
    const [isConnected, setIsConnected] = useState("Connect Wallet")
    const [doctorWeb3, setDoctorWeb3] = useState()

    const Connect = async () => {
        if (!window.ethereum) {
            window.alert("Non Ethereum window detected. Please use Metamask")
        }
        else {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", [])
            const signer = provider.getSigner()
            const _address = await signer.getAddress()
            const NetworkId = provider.network.chainId
            const contractAddress = DoctorWeb3.networks[NetworkId].address
            const doctorWeb3_abi = await formatInterface()
            const _doctorWeb3 = new ethers.Contract(contractAddress, doctorWeb3_abi, signer)
            setIsActive(true)
            setIsConnected("Wallet Connected")
            setAddress(_address)
            setDoctorWeb3(_doctorWeb3)
            /* setContractAddress(contractAddress) */
            
        }
    }

    const sendDataForVerification = async (name, medicalId, applicantType) => {
        const tx = await doctorWeb3.ApplyForVerification(name, "0x48d82599a86fb72DdFb37077BFFe29A3c44700Ab", medicalId, applicantType)
        await tx.wait()
        console.log(tx);
        window.alert("Registered")
    }

    const formatInterface = async () => {
        let iface = new Interface(DoctorWeb3.abi)
        iface = iface.format(FormatTypes.full)
        return iface
    }


    return (
        <ContractContext.Provider value={{ Connect, address, isActive, isConnected, doctorWeb3, sendDataForVerification }}>
            {children}
        </ContractContext.Provider>
    )
}

export default ContractContext;