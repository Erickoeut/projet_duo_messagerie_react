import './App.css';
import Header from './container/Header.jsx'
import Categorie from './components/categories/categorie.jsx'
import { useState } from 'react';
import Login from './components/login/login';
function App() {

  const [login, setLogin] = useState('');

  const onLog = (user) => {
    console.log('onlog');
    setLogin(user)
  }

  const onChoseCateg=(categ)=>{
    console.log('onChoseCateg');
  }

  return (
    <div className="App">
      <Header/>
      {!login&&<Login onLog={onLog}/>}
      {login&&<Categorie user={login} onChoseCateg={onChoseCateg}/>}
    </div>
  );
}

export default App;