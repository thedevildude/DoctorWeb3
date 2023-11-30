export const initialState = {
  address: "0x00",
  isLoading: false,
  isConnected: false,
  signer: undefined,
  doctorWeb3: undefined,
  errorMessage: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECT_WALLET_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "CONNECT_WALLET_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isConnected: true,
        address: action.payload.address,
        signer: action.payload.signer,
        doctorWeb3: action.payload.doctorWeb3,
      };
    case "CONNECT_WALLET_FAILURE":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};
