import "../css/Register.css";
import { useState } from "react";
import { useContextState } from "../context/context";
import { ColorRing } from "react-loader-spinner";

const useRadioButtons = (name) => {
  const [value, setState] = useState(null);

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const inputProps = {
    name,
    type: "radio",
    onChange: handleChange,
  };

  return [value, inputProps];
};

const Register = () => {
  const { isLoading, isConnected, signer, doctorWeb3 } = useContextState();
  const [medicalValue, medicalInputProps] = useRadioButtons("doctorhospital");
  const [state, setState] = useState({
    name: "",
    medicalId: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const handleChange2 = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    if (!isConnected || isLoading) return;
    setIsRegistering(true);
    try {
      const tx = await doctorWeb3.ApplyForVerification(
        state.name,
        await signer.getAddress(),
        state.medicalId,
        medicalValue
      );
      await tx.wait();
      window.alert(`Registered`);
      setIsRegistering(false);
    } catch (error) {
      alert(error.message);
      if (error.data?.message !== undefined) {
        alert(error.data.message);
      }
      setIsRegistering(false);
    }
  };

  return (
    <>
      {isRegistering ? (
        <div className="loading-spinner-container">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <div className="registration-form">
          <h1 className="text-3xl mb-8 font-medium">Register</h1>
          <form>
            <div className="container">
              <div className="form-item">
                <label htmlFor="name">Enter Name</label>
                <input
                  type="string"
                  className="form-control"
                  id="name"
                  placeholder="Dr XYZ"
                  value={state.name}
                  onChange={handleChange2}
                />
              </div>
              <div className="form-item">
                <label htmlFor="name">Enter Your Medical ID</label>
                <input
                  type="string"
                  className="form-control"
                  id="medicalId"
                  placeholder="00000"
                  value={state.medicalId}
                  onChange={handleChange2}
                />
              </div>
              <div className="radio-item">
                <label htmlFor="doctorhospital">Doctor</label>
                <input
                  type="radio"
                  className="form-control"
                  value="0"
                  checked={medicalValue === "0"}
                  {...medicalInputProps}
                />
              </div>
              <div className="radio-item">
                <label htmlFor="doctorhospital">Hospital</label>
                <input
                  type="radio"
                  className="form-control"
                  value="1"
                  checked={medicalValue === "1"}
                  {...medicalInputProps}
                />
              </div>
              <button type="submit" onClick={handleSubmitClick}>
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
