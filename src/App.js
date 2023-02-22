import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

import Header from './container/Header.jsx'
import Login from './components/login/login';
import Categorie from './components/category/category'
import Message from './components/messages/mesages';
function App() {
  const [login, setLogin] = useState('');
  const [listCateg, setListCateg] = useState([])
  const [currentCat, setCurrentCat] = useState(null)
  const [listMessages,setListMessages]= useState([])
  const [newMessage,setNewMessage]= useState('')

  useEffect(() => { //appelle la liste de categories de l'api au lancement de la page
    axios.get('http://localhost:8080/api/subject/category')
      .then(({ data }) => {
        setListCateg(data)
      })
  }, [])

  useEffect(() => {//appelle la liste de categories de l'api a chaque changement de state de categId c.a.d. quand on selectionne une categorie
    if (currentCat) {//condition qui permet d'eviter de lancer l'appel a l'api avec un categId vide (par defaut au lancement de la page ou a un retour a la liste des catégories)
      axios.get(`http://localhost:8080/api/subject/${currentCat.id}/message`)
        .then(({ data }) => {
          setListMessages(data)
        })
    }
    // return setCategId('')
  }, [currentCat,newMessage])

  useEffect(()=>{
    if(newMessage){
      axios.post(`http://localhost:8080/api/subject/${currentCat.id}/message`,{
        "author":login,
        "content":newMessage
      }).then(({ data }) => {
        console.log(data);
        setListMessages(listMessages=>[...listMessages,data])
      })
    }
    return (setNewMessage(''))
  },[newMessage,currentCat,login])

  const onLog = (user) => { //fonction qui prend la valeur de l'input et est stocké dans le useState login
    setLogin(user)
  }
  const onBackToLog = () => { // fonction qui reinitialise le login et joue sur l'affichage des components => permet de revenir au component d'avant
    setLogin('')
  }
  const onReturnId = (cat) => {//fonction qui prend la valeur de l'id selectionné
    setCurrentCat(cat)
  }
  const onBackToCat = () => {// fonction qui reinitialise le categ et joue sur l'affichage des components => permet de revenir au component d'avant
    setCurrentCat(null)
  }
  const onNewMsg = (msg)=>{
    setNewMessage(msg)
  }

  return (
    <div className="App">
      <Header />
      {!login && <Login onLog={onLog} />}
      {login && !currentCat && <Categorie user={login} onReturnToLog={onBackToLog} listCat={listCateg} onReturnId={onReturnId} />}
      {currentCat && <Message messages={listMessages} user={login} onNewMsg={onNewMsg} onReturnToCat={onBackToCat} currentCat={currentCat}/>}
    </div>
  );
}

export default App;