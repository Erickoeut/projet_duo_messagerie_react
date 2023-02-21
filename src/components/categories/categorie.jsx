import style from './categorie.module.css'


export default function Categorie({ user,onReturnToLog,listCateg,onReturnId }) {


    return (
        <div className={style.component}>
            <div className={style.entete}>
                <p>bienvenue {user}</p>
                <button onClick={onReturnToLog}>Retour</button>
            </div>
            <div className={style.listeCateg}>
                {listCateg.map((cat) => <div key={'cat' + cat.id} className={style.categorie} onClick={()=>onReturnId(cat.id)}>
                    <div>
                        <h2>{cat.name}</h2>
                        <p>{cat.count} message{cat.count > 1 && 's'}</p>
                    </div>
                    <p>Dernier commit : {new Date(cat.lastUpdate * 1000).toLocaleString()}</p>
                </div>)}
            </div>
        </div>
    )
}