import style from './category.module.css'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import axios from 'axios'
export default function Category({ user, onReturnCat, onReturnToLog,currentCat }) {
    const [listCat, setListCat] = useState([])
    
    useEffect(() => { //appelle la liste de categories de l'api au lancement de la page
        axios.get('http://localhost:8080/api/subject/category')
            .then(({ data }) => {
                setListCat(data)
            })
    }, [currentCat])
    // a refactorer => on peut sortir la map ainsi que chaque bouton dans un sous composant (j'ai la flemme la, ça marche bien comme ça pour le moment)
    return (
        <div className={style.component}>
            <h2 className={style.text}>Liste des catégories</h2>
            <div className={style.entete}>
                <p>bienvenue {user}</p>
                <button onClick={onReturnToLog}>Retour</button>
            </div>
            <div>
                {listCat.map((cat) => <div key={'cat' + cat.id} className={style.categorie} onClick={() => onReturnCat(cat)}>
                    <div>
                        <h3>{cat.name}<img src={'http://localhost:8080/' + cat.icon} alt='icone catégorie' /></h3>
                        <p>{cat.count} message{cat.count > 1 && 's'}</p>
                    </div>
                    <p>Dernier commit : {new Date(cat.lastUpdate * 1000).toLocaleString()}</p>
                </div>)}
            </div>
        </div>
    )
}

Category.propTypes = {
    user: PropTypes.string,
    listCat: PropTypes.arrayOf(PropTypes.object),
    onReturnId: PropTypes.func,
    onReturnToLog: PropTypes.func
}

Category.defaultProp = {
    onReturnId: () => { },
    onReturnToLog: () => { }
}