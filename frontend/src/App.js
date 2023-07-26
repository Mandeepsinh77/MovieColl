import Header from "./component/Header";
import Card from "./component/Card";
import { Routes, Route } from "react-router-dom"
import AddMovie from "./component/AddMovie";
import Detail from "./component/Detail.js";
import { createContext, useEffect, useState } from "react";
import Login from "./component/Login.js"
import Signup from "./component/Signup.js"
const Appstate = createContext();
function App() {

  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <Appstate.Provider value={{ login, userName, setLogin, setUserName }}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

      </div>
    </Appstate.Provider>
  );
}

export default App;
export { Appstate }
