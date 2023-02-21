import './App.css';
import Header from './container/Header.jsx'
import Categorie from './components/categories/categorie.jsx'
import { useEffect, useState } from 'react';
import Login from './components/login/login';
import axios from 'axios'
import Message from './components/messages/mesages';
function App() {

  const [login, setLogin] = useState('');
  const [listCateg, setListCateg] = useState([])
  const [categId, setCategId] = useState('')
  const [listMessages,setListMessages]= useState([])
  const [newMessage,setNewMessage]= useState('')
  useEffect(() => { //appelle la liste de categories de l'api au lancement de la page
    axios.get('http://localhost:8080/api/subject/category')
      .then(({ data }) => {
        setListCateg(data)
      })
  }, [])
  useEffect(() => {//appelle la liste de categories de l'api a chaque changement de state de categId c.a.d. quand on selectionne une categorie
    if (categId) {//condition qui permet d'eviter de lancer l'appel a l'api avec un categId vide (par defaut au lancement de la page ou a un retour a la liste des catégories)
      axios.get(`http://localhost:8080/api/subject/${categId}/message`)
        .then(({ data }) => {
          setListMessages(data)
          console.log(data);
        })
    }
    // return setCategId('')
  }, [categId])
  useEffect(()=>{
    if(newMessage){
      axios.post(`http://localhost:8080/api/subject/${categId}/message`,{
        "author":login,
        "content":newMessage
      }).then(({ data }) => {
        console.log(data);
        setListMessages(listMessages=>[...listMessages,data])
      })
    }
    return (setNewMessage(''))
  },[newMessage,categId,login])

  const onLog = (user) => { //fonction qui prend la valeur de l'input et est stocké dans le useState login
    setLogin(user)
  }
  const onBackToLog = () => { // fonction qui reinitialise le login et joue sur l'affichage des components => permet de revenir au component d'avant
    setLogin('')
  }
  const onReturnId = (id) => {//fonction qui prend la valeur de l'id selectionné
    setCategId(id)
  }
  const onBackToCat = () => {// fonction qui reinitialise le categ et joue sur l'affichage des components => permet de revenir au component d'avant
    setCategId('')
  }
  const onNewMsg = (msg)=>{
    setNewMessage(msg)
  }

  return (
    <div className="App">
      <Header />
      {!login && <Login onLog={onLog} />}
      {login && !categId && <Categorie user={login} onReturnToLog={onBackToLog} listCateg={listCateg} onReturnId={onReturnId} />}
      {categId && <Message messages={listMessages} user={login} onNewMsg={onNewMsg}onReturnToCat={onBackToCat} />}
    </div>
  );
}

export default App;