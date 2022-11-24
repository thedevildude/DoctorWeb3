import { useState, useContext } from 'react';
import ContractContext from '../ContractContext';
import '../css/findDoctorHospital.css'

const FindHospitals = () => {

  const { doctorWeb3 } = useContext(ContractContext)
  const [doctorDetails, setDoctorDetails] = useState([])
  const [loading, setLoading] = useState(true)

  const findDHDetails = async () => {
    const doctorAddress = await doctorWeb3.findHospitals()
    const detailArray = [];
    for (let i = 0; i < await doctorAddress.length; i++) {
      let helpObject = {}
      const data = await doctorWeb3.getAuthorizedDHDetails(doctorAddress[i])
      data.forEach((element, index) => {
        helpObject['detail' + index] = element;
      });
      detailArray.push(helpObject)
    }
    setDoctorDetails(detailArray)
    setLoading(false)

  }

  return (
    <div className='findDH'>
      <h1 className='findDH-title'>Registered Hospitals</h1>
      <div className='findDH-button'>
        <button className='button-18' onClick={() => findDHDetails(0)}>Click to load Hospitals</button>
      </div>
      <div className='findDH-cards'>
        {loading ? <p className='loading-text'>Loading...</p> : doctorDetails.map((item, index) => {
          return (
            <div key={index} className="findDH-card">
              <img className='findDH-card-image' src='https://via.placeholder.com/200' alt='' />
              <p className='findDH-card-name'>{item.detail1}</p>
              <p className='findDH-card-address'>{item.detail0}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FindHospitals;