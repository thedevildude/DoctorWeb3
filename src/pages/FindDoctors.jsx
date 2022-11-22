import { useState, useContext } from 'react';
import ContractContext from '../ContractContext';

const FindDoctors = () => {

  const { doctorWeb3 } = useContext(ContractContext)
  const [doctorDetails, setDoctorDetails] = useState([])
  const [loading, setLoading] = useState(true)

  const findDHDetails = async (medicalId) => {
    const doctorAddress = await doctorWeb3.findDoctors()
    const hospitalAddress = await doctorWeb3.findHospitals()
    const detailArray = [];
    if (medicalId === 0) {
      for (let i = 0; i < await doctorAddress.length; i++) {
        let helpObject = {}
        const data = await doctorWeb3.getAuthorizedDHDetails(doctorAddress[i])
        data.forEach((element, index) => {
          helpObject['detail' + index] = element;
        });
        detailArray.push(helpObject)
      }
      console.log(detailArray);
      setDoctorDetails(detailArray)
      setLoading(false)
    }
    else if (medicalId === 1) {

      for (let i = 0; i < hospitalAddress.length; i++) {
        const data = await doctorWeb3.getAuthorizedDHDetails(doctorAddress[i])
        console.log(data);
        detailArray.push(data)
      }
      console.log(detailArray);
      return detailArray
    }

  }

  return (
    <div>
      <button onClick={() => findDHDetails(0)}>Click for detail</button>
        {loading ? <p>Loading</p>: doctorDetails.map((item, index) => {
          return (
            <div key={index}>
            {item.detail0}
            {item.detail1}
            </div>
          )
        })}
    </div>
  )
}

export default FindDoctors;