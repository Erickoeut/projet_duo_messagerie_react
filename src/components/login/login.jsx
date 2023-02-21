import { useState } from "react";
import style from "./login.module.css"


const Login = ({onLog}) => {

    const [user, setUser] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        
        return onLog(user)
       
    
    }
    
    return (
            <>
                <div className={style.center}>
                    <form onSubmit={handleSubmit} className={style.form}>     
                        <input type="text" name="login" id="login" value={user} onChange={(e) => setUser(e.target.value)} required className={style.border}/>
                        <button type="submit" className={style.border}>Login</button>
                    </form>
                </div>
            </>
        )
};

export default Login;