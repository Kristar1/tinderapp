import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import OnBoarding from './pages/OnBoarding';
import {useCookies} from 'react-cookie'
import { useState } from 'react';
import './App.css';
import Profile from './pages/Profile';
import Loading from './components/Loading';

function App() {

  const [cookies, setCookie, removeCookie]= useCookies(['user']);
const [loading, setLoading] = useState(false)

const authToken= cookies.AuthToken;

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={ <><Home setLoading={setLoading}/> {loading &&<Loading/>}</> }/>
        {authToken && <Route path="/dashboard" element={<><Dashboard setLoading={setLoading} /> {loading &&<Loading/>}</>}/>}
{ authToken &&  <Route path="/onboarding" element={<OnBoarding/>} />}
{ authToken &&  <Route path="/profile" element={<><Profile setLoading={setLoading} /> {loading &&<Loading/>}</>} />}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
