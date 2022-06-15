import { Redirect } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Main from "../../components/Main";
import NavBar from "../../components/Navbar";
import Logo from "../../images/Logo.svg";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { PageHome } from "./styles";
import FormModal from "../../components/FormModal";

//import { AnimatedContainer, PageLogin, HeaderLogin } from "./styles";
import { schemaRegisterTech, schemaUpdateTech } from "./validations";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Home({ authenticated, setAuthenticated }) {
  const [token] = useState(
    JSON.parse(localStorage.getItem("@KenzieHub:token")) || ""
  );

  const [idUser] = useState(
    JSON.parse(localStorage.getItem("@KenzieHub:idUser")) || ""
  );
  const [techs, setTechs] = useState([]);
  const [user, setUser] = useState({});
  const [tittleForm, setTittleForm] = useState('')
  const [fieldsInputs, setFieldsInputs] = useState([])
  const [openedForm, setOpenedForm] = useState(false)
  const [buttonForm, setButtonForm] = useState([])
  const [schema, setSchema] = useState(schemaRegisterTech)
  const [tech, setTech] = useState()
  
  
  const onSubmitRegisterTechFunction = (data) => {

    console.log(data)
    axios.post('https://kenziehub.herokuapp.com/users/techs', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setTechs([...techs, res.data])
        toast.success('Tecnologia adicionada!',{
          autoClose:1000,
          theme: "dark"
        })

        setOpenedForm(false)

        
    }).catch(() => {
      
      toast.error("Ocorreu algum erro, talvez você já tenha adicionado essa tecnologia, tente atualizá-la", {
        autoClose:5000, 
        theme: "dark"
      })
      
    })
  }
  
  const [onSubmitFunction, setOnSubmitFunction] = useState({f: (data) => console.log('teste')})
  function deleteFunction(id) {
    axios.delete(`https://kenziehub.herokuapp.com/users/techs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {

      loadUserInfo()
        toast.success('Tecnologia deletada!',{
          autoClose:1000,
          theme: "dark"
        })
        
    }).catch(() => {

      toast.error("Ocorreu algum erro, tente novamente", {
        autoClose:5000,
        theme: "dark"
      })
      
    })
  }



  function loadUserInfo() {
    axios
      .get(`https://kenziehub.herokuapp.com/users/${idUser}`)
      .then((res) => {setUser(res.data)
        setTechs(res.data.techs)
      })
      .catch((err) => {console.log(err)});
  }

  useEffect(() => {
    loadUserInfo();
  }, []);

  useEffect(() => {
    if(tech) {
      openModalUpdate()
    }
  }, [tech])

  if (!authenticated) {
    return <Redirect to="/" />;
  }

  function logout() {
    localStorage.removeItem("@KenzieHub:token");
    localStorage.removeItem("@KenzieHub:idUser");
    setAuthenticated(false);
  }

  const onSubmitUpdateTechFunction = (data) => {
   

    axios.put(`https://kenziehub.herokuapp.com/users/techs/${tech.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      
      loadUserInfo()
        toast.success('Tecnologia alterada!',{
          autoClose:1000,
          theme: "dark"
      })

      setOpenedForm(false)
        
    }).catch((err) => {

      toast.error("Ocorreu algum erro, tente novamente", {
        autoClose:5000,
        theme: "dark"
      })

      
    })
  }

  function openModalAdd() {
    
    setOpenedForm(true)
    setTittleForm('Cadastrar tecnologia')
    setFieldsInputs([{
      field: 'input',
      label: 'Nome*',
      name: 'title', 
    },{
      field: 'select',
      name: 'status',
      label: 'Selecionar status',
      options: [{
        value: 'Iniciante',
        
      }, {
        value: 'Intermediário',
       
      }, {
        value: 'Avançado',
        
      }]
    }])
    setButtonForm([{
      title: 'Cadastrar tecnologia',
      bgColor: "var(--color-primary)",
      type: 'submit'
    }])
    setOnSubmitFunction({
      f: onSubmitRegisterTechFunction
    })
    setSchema(schemaRegisterTech)
  }

  function openModalUpdate() {
    
    setOpenedForm(true)
    setTittleForm('Tecnologia detalhes')
    setFieldsInputs([{
      field: 'input',
      label: 'Nome',
      value: tech.title 
    },{
      field: 'select',
      name: 'status',
      label: 'Selecionar status',
      value: tech.status,
      options: [{
        value: 'Iniciante',
        
      }, {
        value: 'Intermediário',
        
      }, {
        value: 'Avançado',
        
      }]
    }])

    setButtonForm([{
      title: 'Salvar alterações',
      bgColor: "var(--color-primary)",
      type: 'submit'
    }, {
      title: 'Cancelar',
      type: 'button',
      onClick: () => setOpenedForm(false)
    }])
    setOnSubmitFunction({
      f: onSubmitUpdateTechFunction
    })
    setSchema(schemaUpdateTech)
  }



  return (
    <PageHome>
      <NavBar>
        <img src={Logo} alt="logo" /> <Button onClick={logout}>Sair</Button>
      </NavBar>
      <Header>
        {" "}
        <h1>Olá, {user.name} </h1> <p>{user.course_module}</p>{" "}
      </Header>
      <main>
        <Main>
          <div>
            <h3>Tecnologias</h3>
            <Button onClick={openModalAdd} padding="0.2rem 0.5rem">
              <FaPlus />
            </Button>
          </div>
          {techs.length>0 ? 
          <ul>
            
          {techs.map((tech) => (
            <Button key={tech.id} bgColor="var(--grey-4)" padding="0.5rem">
              <li>
                <h3 onClick={() => {
                  setTech(tech)
                  
                }}>{tech.title}</h3>
                <div>
                  <p>{tech.status}</p>
                  <FaTrashAlt onClick={() => deleteFunction(tech.id)}/>
                </div>
              </li>
            </Button>
          ))}
        </ul> : <p>Adicione alguma tecnologia</p>}
        </Main>
      </main>
      <ToastContainer/>
      <FormModal onSubmitFunction={onSubmitFunction} schema={schema} buttonForm={buttonForm} tittle={tittleForm} fieldsInputs={fieldsInputs} opened={openedForm} setOpened={setOpenedForm}>

      </FormModal>
    </PageHome>
  );
}

export default Home;
