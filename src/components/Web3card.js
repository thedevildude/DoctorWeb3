import './Web3card.css';
import { IconContext } from 'react-icons';
import { Web3cardData } from './Web3cardData';

const Web3card = () => {
  return (
    <>
      <IconContext.Provider value={{ size: 50, color: '#fff' }}>
      <div className='cards'>
        {Web3cardData.map((card) => {
          return (
            <div className='card-container'>
              <div className='card-text-box'>
                <p className='card-head-text'>{card.title}</p>
                <p className='card-value-text'>{card.data}</p>
              </div>
              <div className='card-icon'>
                {card.icon}
              </div>
            </div>
          )
        })}
        </div>
      </IconContext.Provider>
    </>
  )
}

export default Web3card;