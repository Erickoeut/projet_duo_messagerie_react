import { useState } from 'react'
import style from './categorie.module.css'

export default function Categorie({ user,onChoseCateg }) {
    const [categ, setCateg] = useState('')
    const handleSelect = () => {
        return onChoseCateg(categ)
    }
    return (
        <div className={style.component}>
            <p>bienvenue {user}</p>
            <div>
                <div onClick={handleSelect} className={style.categorie}>
                    <div>
                        <h2>Categorie 3</h2>
                        <p>nb message</p>
                    </div>
                    <p>Dernier commit</p>
                </div>
            </div>
            <div>
                <div onClick={handleSelect} className={style.categorie}>
                    <div>
                        <h2>Categorie 3</h2>
                        <p>nb message</p>
                    </div>
                    <p>Dernier commit</p>
                </div>
            </div>
            <div>
                <div onClick={handleSelect} className={style.categorie}>
                    <div>
                        <h2>Categorie 3</h2>
                        <p>nb message</p>
                    </div>
                    <p>Dernier commit</p>
                </div>
            </div>
        </div>
    )
}