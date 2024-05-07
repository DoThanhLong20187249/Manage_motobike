// import LoginForm from './componets/loginForm/LoginForm'
import "./styles/App.scss";
import Footer from "./componets/footer/Footer";
import Menu from "./componets/menu/Menu";
import NavBar from "./componets/navbar/NavBar";
import { Outlet } from "react-router-dom";
// import HomeClient from "./page/ClientPage/HomeClient/HomeClient";
// import Home from "./page/Home";
// import SideBar from "./componets/sideBar/SideBar";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div className="app-container">
         <div className="menu-container">
          <Menu/>
         </div>
         <div className="main-container">
          <Outlet/>
         </div>
      </div>
      <Footer/>
    </div>
    // <>
    //   <HomeClient />
    // </>
  );
}

export default App;
