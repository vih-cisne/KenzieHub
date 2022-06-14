import { InputDirection } from "./styles"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";


export function InputContainer ({children, label, register, name, delay, type, error, ...rest}) {

    const [visibilityPassword, setVisibilityPassword] = useState(false)
    
    return (
        <InputDirection delay={delay} isError={!!error}>
            <label>{label} {!!error && <span>- {error}</span>}</label>
            {children ? children :
            <div>
            <input {...register(name)} type={type === 'password' ? visibilityPassword ? 'text' : 'password' : null } {...rest}/>
            {type ==='password' ? visibilityPassword ? <FaEyeSlash onClick={() => setVisibilityPassword(false)} />   : <FaEye onClick={() => setVisibilityPassword(true)}/>  : null }
            
            </div>
            
        }
        </InputDirection>
    )
}

export default InputContainer