import { useState } from 'react'
import style from './messages.module.css'

export default function Message({ user, onReturnToCat, messages, onNewMsg,currentCat }) {
    const [newMsg, setNewMsg] = useState('')
    // a refactorer => on peut sortir la map ainsi que chaque bouton dans un sous composant (j'ai la flemme la, ça marche bien comme ça pour le moment)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('handleSubmit');
        setNewMsg('')
        return onNewMsg(newMsg)
    }

    return (
        <div className={style.component}>
            <h2>Messages dans la catégorie {currentCat.name}</h2>
            <div className={style.entete}>
                <p>bienvenue {user} </p>
                <button onClick={() => onReturnToCat()}>Retour</button>
            </div>
            <div >
                {messages.map((msg) => (<div key={'msg'+msg.id} className={style.message}>
                    <h3>{msg.author}</h3><p>{msg.content}</p><p>Date d'enregistrement  : {new Date(msg.createAt * 1000).toLocaleString()}</p>
                </div>))}
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Entrez un nouveau message</label>
                <textarea value={newMsg} onChange={(e) => setNewMsg(e.target.value)} />
                <button type="submit">Enregistrer</button>
            </form>
        </div>)
}