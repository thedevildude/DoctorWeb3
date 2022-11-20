import { useState, createContext } from "react";
import { ethers } from "ethers";
import DoctorWeb3 from './abis/DoctorWeb3.json';

const ContractContext = createContext()

export const ContractProvider = ({ children }) => {
    const [address, setAddress] = useState("0x00")
    const [isActive, setIsActive] = useState(false)
    const [isConnected, setIsConnected] = useState("Connect Wallet")
    const [doctorWeb3, setDoctorWeb3] = useState()

    const Connect = async () => {
        if(!window.ethereum) {
            window.alert("Non Ethereum window detected. Please use Metamask")
        }
        else {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", [])
            const signer = provider.getSigner()
            const _address = await signer.getAddress()
            setIsActive(true)
            setIsConnected("Wallet Connected")
            setAddress((_address))
            const NetworkId = provider.network.chainId
            const contractAddress = JSON.stringify(DoctorWeb3.networks[NetworkId].address)
            const doctorWeb3 = new ethers.Contract(contractAddress, DoctorWeb3.abi, signer)
            setDoctorWeb3(doctorWeb3)
                
        }
    }

    return (
        <ContractContext.Provider value={{ Connect, address, isActive, isConnected, doctorWeb3 }}>
            {children}
        </ContractContext.Provider>
    )
}

export default ContractContext;