import { ethers } from "ethers";
import { FormatTypes, Interface } from "ethers/lib/utils";
import DoctorWeb3 from "../../abis/DoctorWeb3.json";

const formatInterface = async () => {
  let iface = new Interface(DoctorWeb3.abi);
  iface = iface.format(FormatTypes.full);
  return iface;
};

export const connect = async (dispatch) => {
  dispatch({
    type: "CONNECT_WALLET_REQUEST",
  });
  try {
    if (!window.ethereum) {
      throw new Error("No crypto wallet found. Please install metamask");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    //const _balance = ethers.utils.formatEther(await provider.getBalance(_address));
    const NetworkId = provider.network.chainId;
    if (DoctorWeb3.networks[NetworkId] === undefined) {
      throw new Error("Contract address not found on current network");
    }
    const contractAddress = DoctorWeb3.networks[NetworkId].address;
    const doctorWeb3_abi = await formatInterface();
    const doctorWeb3 = new ethers.Contract(
      contractAddress,
      doctorWeb3_abi,
      signer
    );
    dispatch({
      type: "CONNECT_WALLET_SUCCESS",
      payload: {
        address,
        signer,
        doctorWeb3,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "CONNECT_WALLET_FAILURE",
      payload: {
        errorMessage: error.message,
      },
    });
  }
};
