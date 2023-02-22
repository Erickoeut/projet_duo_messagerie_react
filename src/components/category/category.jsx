import style from './category.module.css'
import PropTypes from 'prop-types'
export default function Category({ user,listCat,onReturnId,onReturnToLog }) {

// a refactorer => on peut sortir la map ainsi que chaque bouton dans un sous composant (j'ai la flemme la, ça marche bien comme ça pour le moment)
    return (
        <div className={style.component}>
            <h2>Liste des catégories</h2>
            <div className={style.entete}>
                <p>bienvenue {user}</p>
                <button onClick={onReturnToLog}>Retour</button>
            </div>
            <div>
                {listCat.map((cat) => <div key={'cat' + cat.id} className={style.categorie} onClick={()=>onReturnId(cat)}>
                    <div>
                        <h3>{cat.name}</h3>
                        <p>{cat.count} message{cat.count > 1 && 's'}</p>
                    </div>
                    <p>Dernier commit : {new Date(cat.lastUpdate * 1000).toLocaleString()}</p>
                </div>)}
            </div>
        </div>
    )
}

Category.propTypes= {
    user:PropTypes.string,
    listCat:PropTypes.arrayOf(PropTypes.object),
    onReturnId:PropTypes.func,
    onReturnToLog:PropTypes.func
}

Category.defaultProp = {
    onReturnId:()=>{},
    onReturnToLog:()=>{}
}