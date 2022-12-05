import { useState, useContext } from 'react';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import { IconContext } from 'react-icons';
import '../css/Web3card.css';
import { useNavigate } from 'react-router-dom';
import ContractContext from '../ContractContext';

let homeDetails = [
  {
      title: 'Total Available Balance',
      icon: <FaIcons.FaEthereum/>,
      data: '0.0000'
  },
  {
      title: 'Total Reports Uploaded',
      icon: <IoIcons.IoIosPaper/>,
      data: '00'
  },
  {
      title: 'Total Doctors Registered',
      icon: <FaIcons.FaStethoscope/>,
      data: '00'
  },
  {
      title: 'Total Hospitals Registered',
      icon: <FaIcons.FaHospital/>,
      data: '00'
  },
]

const Home = () => {

  const { balance, doctorWeb3 } = useContext(ContractContext)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const getDetails = async () => {
    const doctorAddress = await doctorWeb3.findDoctors()
    const hospitalAddress = await doctorWeb3.findHospitals()
    homeDetails[0].data = balance
    homeDetails[2].data = doctorAddress.length
    homeDetails[3].data = hospitalAddress.length
    setIsLoading(false)

    
  }
  
  

  return (
    <>
      <IconContext.Provider value={{ size: 50, color: '#fff' }}>
      <div className="home">
        <div className="home-title">
          <h1><MdIcons.MdOutlineHealthAndSafety />DoctorWeb3</h1>
        </div>
        <div className='text-container'>
          <p>A Decentralized and Secure way for sharing patient reports with hospitals and doctors</p>
        </div>
        <button className='button-18' onClick={() => getDetails()}>Check Stats</button>
        <div className='cards'>
          {isLoading ? <p className='loading-text'>Loading...</p> : homeDetails.map((item, index) => {
            return (
              <div key={index} className='card-container'>
                <div className='card-text-box'>
                  <p className='card-head-text'>{item.title}</p>
                  <p className='card-value-text'>{item.data}</p>
                </div>
                <div className='card-icon'>
                  {item.icon}
                </div>
              </div>
            )
          })}
        </div>
        <button className='button-18' onClick={() => navigate('/uploadreports')}>Upload Reports</button>
      </div>
      </IconContext.Provider>
    </>
  )
}

export default Home;