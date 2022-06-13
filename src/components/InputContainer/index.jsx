import { InputDirection } from "./styles"


export function InputContainer ({children, label,...rest}) {
    
    return (
        <InputDirection>
            <label>{label}</label>
            {children ? children :
            <input {...rest}/>
            
        }
        </InputDirection>
    )
}

export default InputContainer