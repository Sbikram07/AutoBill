import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/authContext";
import Login from "./components/Login";

function App() {
  const {isLogin} = useAuth();
  if(!isLogin){
    return <Login/>
  }
  return (
    <>
    <Navbar/>
     
      <Outlet />
    </>
  );
}

export default App;
