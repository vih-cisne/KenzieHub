import InputContainer from "../../components/InputContainer";
import { AnimatedContainer, PageLogin, HeaderLogin } from "./styles";
import Logo from "../../images/Logo.svg";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validation";
import axios from "axios"
//import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AnimatedPage from "../../components/AnimatedPage";


function Login({ authenticated, setAuthenticated }) {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const history = useHistory()


  const onSubmitFunction = ({email,password}) => {

    let data = {email, password}

    axios.post('https://kenziehub.herokuapp.com/sessions', data).then((res) => {

        toast.success('Login feito com sucesso!',{
          autoClose:1000,
          theme: "dark"
        })

        setAuthenticated(true)

        const { token } = res.data
        const { id} = res.data.user

        localStorage.setItem("@KenzieHub:token", JSON.stringify(token))
        localStorage.setItem("@KenzieHub:idUser", JSON.stringify(id))

        setTimeout(() => {
          history.push('/home')
        }, 1200);
    }).catch(() => {

      toast.error("Não foi possível realizar o login, verifique email e senha", {
        autoClose:5000,
        theme: "dark"
      })
      
    })
    /*avatar_url: null
bio: "Estou apenas testando"
contact: "email"
course_module: "Terceiro módulo (Introdução ao Backend)"
created_at: "2022-06-14T20:44:08.537Z"
email: "anaCisne@email.com"
id: "8be62db1-d323-4378-b36a-063beb5fb901"
name: "Ana"
updated_at: "2022-06-14T20:44:08.537Z"*/
    /*bio: "fdvf"
confirmPassword: "123456"
contact: "dsgg"
course_module: "Primeiro módulo (Introdução ao Frontend)"
email: "emai@gmail.com"
name: "fgd"
password: "123456"*/
/*{course_module: 'Primeiro módulo (Introdução ao Frontend)', name: 'Vitoria Cisne', email: 'emai@gmail.com', password: '123456', confirmPassword: '123456', …}*/

  }

  if(authenticated) {
    return <Redirect to='/home'/>
}

  return (
    <AnimatedPage>
    <PageLogin>
      <ToastContainer/>
      <HeaderLogin>
        <img src={Logo} alt="logo" />
      </HeaderLogin>
      <AnimatedContainer>
        <form action="" onSubmit={handleSubmit(onSubmitFunction)}>
          <h2>Login</h2>
          
          
          <InputContainer
          delay="200ms"
            label="Email*"
            placeholder="Digite aqui seu email"
            register={register}
            name="email"
            error={errors.email?.message}
          />
          
          <InputContainer
          delay="300ms"
            label="Senha*"
            placeholder="Digite aqui sua senha"
            register={register}
            name="password"
            type="password"
            error={errors.password?.message}
          />


          <Button
            bgColor={
              isValid
                ? "var(--color-primary)"
                : "var(--color-primary-negative)"
            }
            padding="1.1rem"
            valid={isValid}
          >
            Entrar
          </Button>
          <p>Ainda não possui uma conta?</p>
          <Link to="/register">
          <Button bgColor="var(--grey-1)">Cadastre-se</Button>
        </Link>
        </form>
      </AnimatedContainer>
    </PageLogin>
    </AnimatedPage>
  );
}

export default Login;