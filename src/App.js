import './App.css';
import Header from './container/Header.jsx'
import Categorie from './components/categories/categorie.jsx'
import { useEffect, useState } from 'react';
import Login from './components/login/login';
import axios from 'axios'
function App() {

  const [login, setLogin] = useState('');
  const [listCateg, setListCateg] = useState([])
  const [categId, setCategId] = useState('')
  useEffect(() => {
    axios.get('http://localhost:8080/api/subject/category')
      .then(({ data }) => {
        setListCateg(data)
      })
  }, [])

  const onLog = (user) => {
    console.log('onlog');
    setLogin(user)
  }

  const onReturnToLog = () => {
    setLogin('')
  }
  const onReturnId = (id) => {
    setCategId(id)
  }

  return (
    <div className="App">
      <Header />
      {!login && <Login onLog={onLog} />}
      {login && <Categorie user={login} onReturnToLog={onReturnToLog} listCateg={listCateg} onReturnId={onReturnId} />}
    </div>
  );
}

export default App;