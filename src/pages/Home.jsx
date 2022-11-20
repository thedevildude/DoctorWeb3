import * as MdIcons from 'react-icons/md';
import Web3card from '../components/Web3card';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
  return (
    <>
      <div className="home">
        <div className="home-title">
          <h1><MdIcons.MdOutlineHealthAndSafety/>DoctorWeb3</h1>
        </div>
        <div className='text-container'>
          <p>A Decentralized and Secure way for sharing patient reports with hospitals and doctors</p>
        </div>
        <Web3card/>
        <button className='button-18' onClick={() => navigate('/uploadreports')}>Upload Reports</button>
      </div>
    </>
  )
}

export default Home;