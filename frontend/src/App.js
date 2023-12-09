import React, {useState, useMemo} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import bg from './img/bg.png'
import {MainLayout} from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard';
import RegisterPage from './Components/pages/registerpage';
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import LoginPage from './Components/pages/loginpage';
import UpdateInfo from './Components/pages/updateInfo';
import History from './History/History';
import TotalHistory from './TotalHistory/totalhistory';

function App() {
  const [active, setActive] = useState(1)
  const global = useGlobalContext()
  console.log(global);

  const orbMemo = useMemo(() => {
    return <Orb />
  },[])

  return (
    <Router>
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/income' element={<Income />} />
            <Route path='/expenses' element={<Expenses />} />
            <Route path='/history' element={<TotalHistory />} />
            <Route path='/updateinfo' element={<UpdateInfo />} />
          </Routes>
    </Router>

  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
