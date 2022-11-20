import '../css/Register.css';
import { useState } from 'react';

const useRadioButtons = (name) => {
  const [value, setState] = useState(null);

  const handleChange = e => {
    setState(e.target.value);
  };

  const inputProps = {
    name,
    type: "radio",
    onChange: handleChange
  };

  return [value, inputProps];
}

const Register = () => {

  const [medicalValue, medicalInputProps] = useRadioButtons("doctorhospital");

  const [state , setState] = useState({
    name : "",
    medicalId : ""
  })
  const handleChange2 = (e) => {
    const {id , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    console.log(state.name);
    console.log(state.medicalId);
    console.log(medicalValue);
}
  return (
    <>
      <div className='registration-form'>
        <h1 className='form-title'>Register</h1>
        <form>
          <div className='container'>
            <div className="form-item">
              <label htmlFor="name">Enter Name</label>
              <input type="string"
                className="form-control"
                id="name"
                placeholder="Dr xyz"
                value={state.name}
                onChange={handleChange2}
              />
            </div>
            <div className="form-item">
              <label htmlFor="name">Enter Your Medical ID</label>
              <input type="string"
                className="form-control"
                id="medicalId"
                placeholder="00000"
                value={state.medicalId}
                onChange={handleChange2}
              />
            </div>
            <div className='form-item'>
              <label htmlFor='doctorhospital'>Doctor</label>
              <input type="radio"
                className='form-control'
                value="0"
                checked={medicalValue === "0"}
                {...medicalInputProps}
              />
            </div>
            <div className='form-item'>
              <label htmlFor='doctorhospital'>Hospital</label>
              <input type="radio"
                className='form-control'
                value="1"
                checked={medicalValue === "1"}
                {...medicalInputProps}
              />
            </div>
            <button className="button-18" type="submit" onClick={handleSubmitClick}>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register