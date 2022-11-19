import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <Router>
        <Sidebar />
        <Routes>
          <Route path='/home'/>
        </Routes>
    </Router>
  );
}

export default App;
