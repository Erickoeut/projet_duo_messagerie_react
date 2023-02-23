import './App.css';
import {  useState } from 'react';
import Header from './container/Header.jsx'
import Login from './components/login/login';
import Categorie from './components/category/category'
import Message from './components/messages/mesages';

function App() {
  const [login, setLogin] = useState('');
  const [currentCat, setCurrentCat] = useState(null)
  const onLog = (user) => { //fonction qui prend la valeur de l'input et est stocké dans le useState login
    console.log('onLog');
    setLogin(user)
  }
  const onBackToLog = () => { // fonction qui reinitialise le login et joue sur l'affichage des components => permet de revenir au component d'avant
    setLogin('')
  }
  const onReturnCat = (cat) => {//fonction qui modifie la catégorie courante
    setCurrentCat(cat)
  }
  const onBackToCat = () => {// fonction qui reinitialise le categ et joue sur l'affichage des components => permet de revenir au component d'avant
    setCurrentCat(null)
  }
  return (
    <div className="App">
      <Header />
      {!login&&<Login onLog={onLog} />}
      {login && !currentCat&&<Categorie user={login} onReturnToLog={onBackToLog} onReturnCat={onReturnCat} currentCat={currentCat} />}
      {currentCat && <Message user={login} onReturnToCat={onBackToCat} currentCat={currentCat}/>}
    </div>
  )
}
export default App;