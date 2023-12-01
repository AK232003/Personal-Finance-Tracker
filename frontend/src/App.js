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

function App() {
  const [active, setActive] = useState(1)

  const global = useGlobalContext()
  console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4: 
        return <Expenses />
      default: 
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  },[])

  return (
    // <Router>
    //         {window.location.href == "http://localhost:3001/dashboard" ? 
    //         <AppStyled bg={bg} className="App">
    //           {orbMemo}
    //           <MainLayout>
    //             <Navigation active={active} setActive={setActive} />
    //             <main>
    //               <Routes>
    //                 <Route path="/dashboard" element={<Dashboard />} />
    //               </Routes>
    //             </main>
    //           </MainLayout>
    //         </AppStyled> 
    //         :
    //         <Routes>
    //         <Route path="/" element={<RegisterPage />} />
    //         <Route path="/login" element={<LoginPage />} />
    //       </Routes>}
    // </Router>
    <AppStyled bg={bg} className="App">
              {orbMemo}
              <MainLayout>
                <Navigation active={active} setActive={setActive} />
                <main>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
                </main>
              </MainLayout>
            </AppStyled> 

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
