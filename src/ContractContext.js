import { useState, createContext } from "react";
import { ethers } from "ethers";

const ContractContext = createContext()

export const ContractProvider = ({ children }) => {
    const [address, setAddress] = useState("0x00")

    const [isActive, setIsActive] = useState(false)
    const [isConnected, setIsConnected] = useState("Connect Wallet")

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
        }
    }

    return (
        <ContractContext.Provider value={{ Connect, address, isActive, isConnected }}>
            {children}
        </ContractContext.Provider>
    )
}

export default ContractContext;