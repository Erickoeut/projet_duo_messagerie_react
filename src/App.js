import Login from "./components/login/login";
import { useState } from "react";

function App() {

  const [login, setLogin] = useState('');

  const onLog = (login) => {
    console.log('onlog');
    setLogin(login)
    console.log(login);
  }

  return (
    <div className="App">
     
      <Login onLog={onLog} />
    </div>
  );
}

export default App;
