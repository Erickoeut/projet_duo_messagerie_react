import style from './header.module.css'

export default function Header(){
    return(
        <h1 className={style.background}><span className={style.text}>Message app</span></h1>
    )
}