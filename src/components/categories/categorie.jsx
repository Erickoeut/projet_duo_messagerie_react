import style from './categorie.module.css'


export default function Categorie({ user,onReturnToLog,listCateg,onReturnId }) {

// a refactorer => on peut sortir la map ainsi que chaque bouton dans un sous composant (j'ai la flemme la, ça marche bien comme ça pour le moment)
    return (
        <div className={style.component}>
            <h2>Catégories</h2>
            <div className={style.entete}>
                <p>bienvenue {user}</p>
                <button onClick={onReturnToLog}>Retour</button>
            </div>
            <div>
                {listCateg.map((cat) => <div key={'cat' + cat.id} className={style.categorie} onClick={()=>onReturnId(cat.id)}>
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