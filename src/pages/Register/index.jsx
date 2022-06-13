import InputContainer from "../../components/InputContainer"
import { AnimatedContainer, PageRegister, HeaderRegister } from "./styles"
import Logo from '../../images/Logo.svg'
import Button from "../../components/Button"
import { Link } from "react-router-dom"


function Register () {
    return (
        <PageRegister>
            <HeaderRegister>
                <img src={Logo} alt='logo'/>
                <Link to='/login'><Button>
                    Voltar
                </Button>
                </Link>
            </HeaderRegister>
            <AnimatedContainer>
                <form action="">
                    <h2>Crie sua conta</h2>
                    <p>Rapido e grátis, vamos nessa</p>
                    <InputContainer label="Nome" placeholder="Digite aqui seu nome"/>
                    <InputContainer label="Email" placeholder="Digite aqui seu email"/>
                    <InputContainer label="Senha" placeholder="Digite aqui sua senha"/>
                    <InputContainer label="Confirmar senha" placeholder="Digite novamente sua senha"/>
                    <InputContainer label="Bio" placeholder="Fale sobre você"/>
                    <InputContainer label="Contato" placeholder="Opção de contato"/>
                    <InputContainer label="Selecionar módulo">
                        <select>
                            <option>Primeiro módulo</option>
                            <option>Segundo módulo</option>
                            <option>Terceiro módulo</option>

                        </select>

                    </InputContainer>

                    <Button bgColor='var(--color-primary)' padding='1.1rem' disabled>
                        Cadastrar
                    </Button>
                    
                </form>
            </AnimatedContainer>
        </PageRegister>
    )
}

export default Register