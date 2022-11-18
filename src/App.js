import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
