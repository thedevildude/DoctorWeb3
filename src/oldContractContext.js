import { useState, createContext } from "react";
import Web3 from "web3";
import DoctorWeb3 from "./abis/DoctorWeb3.json";

const ContractContext = createContext()

export const ContractProvider = ({children}) => {

    const [doctorWeb3, setDoctorWeb3] = useState()

    const [address, setAddress] = useState()

    const [isActive, setIsActive] = useState(false)
    const [isConnected, setIsConnected] = useState("Connect Wallet")

    const {Connect} = async (req, res) => {
        if (window.ethereum) {
            res = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
            setAddress(res[0])
            const networkId = await web3.eth.net.getId()
            const networkData = await DoctorWeb3.networks[networkId]
            if (networkData) {
                const doctorWeb3 = new web3.eth.Contract(DoctorWeb3.abi, networkData.address)
                setDoctorWeb3(doctorWeb3)
                setIsActive(true)
                setIsConnected("Wallet Connected")
            }
            else {
                window.alert("DoctorWeb3 contract not deployed on detected network")
            }
        }
        else {
            alert("Please install Metamask")
        }
    }

    return (
        <ContractContext.Provider value={{doctorWeb3, address, isActive, isConnected, Connect}}>
            {children}
        </ContractContext.Provider>
    )
}

export default ContractContext;