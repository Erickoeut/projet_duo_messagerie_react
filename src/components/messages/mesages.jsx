import axios from 'axios'
import { useEffect, useState } from 'react'
import style from './messages.module.css'

export default function Message({ user, currentCat, onReturnToCat }) {

    const [listMessages, setListMessages] = useState([])
    const [msg, setMsg] = useState('')
    // a refactorer => on peut sortir la map ainsi que chaque bouton dans un sous composant (j'ai la flemme la, ça marche bien comme ça pour le moment)

    useEffect(() => {//appelle la liste de categories de l'api a chaque changement de state de categId c.a.d. quand on selectionne une categorie
        if (currentCat) {//condition qui permet d'eviter de lancer l'appel a l'api avec un categId vide (par defaut au lancement de la page ou a un retour a la liste des catégories)
            axios.get(`http://localhost:8080/api/subject/${currentCat.id}/message`)
                .then(({ data }) => {
                    setListMessages(data)
                })
        }
    }, [currentCat])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('handleSubmit');
        setMsg('')
        axios.post(`http://localhost:8080/api/subject/${currentCat.id}/message`, {
            "author": user,
            "content": msg
        }).then(({ data }) => {
            console.log(data);
            setListMessages(listMessages => [...listMessages, data])
        })
    }

    return (
        <div className={style.component}>
            <h2 className={style.text}>Messages dans la catégorie {currentCat.name}</h2>
            <div className={style.entete}>
                <p>bienvenue {user} </p>
                <button onClick={onReturnToCat}>Retour</button>
            </div>
            <div >
                {listMessages.map((msg) => (<div key={'msg' + msg.id} className={style.message}>
                    <h3>{msg.author}</h3><p>{msg.content}</p><p>Date d'enregistrement  : {new Date(msg.createAt * 1000).toLocaleString()}</p>
                </div>))}
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Entrez un nouveau message</label>
                <textarea value={msg} onChange={(e) => setMsg(e.target.value)} className={style.textarea} />
                <button type="submit">Enregistrer</button>
            </form>
        </div>)
}