import { Redirect } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Main from "../../components/Main";
import NavBar from "../../components/Navbar";
import Logo from "../../images/Logo.svg";
import { FaPlus, FaEdit } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { PageHome } from "./styles";
import FormModal from "../../components/FormModal";

//import { AnimatedContainer, PageLogin, HeaderLogin } from "./styles";
import { schemaRegisterTech, schemaUpdateTech } from "./validations";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AnimatedPage from "../../components/AnimatedPage";


function Home({ themeIsDefault, setThemeIsDefault, authenticated, setAuthenticated }) {
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
  
  const [onSubmitFunction, setOnSubmitFunction] = useState({f: {}})
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
        setOpenedForm(false)
        
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
    return <Redirect to="/login" />;
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
        value: '',
        text: 'Escolha um status'
      },{
        value: 'Iniciante',
        text: 'Iniciante'
      }, {
        value: 'Intermediário',
        text: 'Intermediário'
       
      }, {
        value: 'Avançado',
        text: 'Avançado'
        
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
    const fields = [{
      field: 'input',
      label: 'Nome',
      value: tech.title 
    },{
      field: 'select',
      name: 'status',
      label: 'Selecionar status',
      options: [{
        value: 'Iniciante',
        text: 'Iniciante'
      }, {
        value: 'Intermediário',
        text: 'Intermediário'
       
      }, {
        value: 'Avançado',
        text: 'Avançado'
        
      }]
    }]
    const index = fields[1].options.findIndex((item) => item.text===tech.status)
    fields[1].options[index].value = ''
    setFieldsInputs(fields)


    setButtonForm([{
      title: 'Salvar alterações',
      bgColor: "var(--color-primary)",
      type: 'submit'
    }, {
      title: 'Excluir',
      type: 'button',
      onClick: () => deleteFunction(tech.id)
    }])
    setOnSubmitFunction({
      f: onSubmitUpdateTechFunction
    })
    setSchema(schemaUpdateTech)
  }



  return (
    <AnimatedPage>
    <PageHome>
      <NavBar>
        <img onClick={() => setThemeIsDefault(!themeIsDefault)} src={Logo} alt="logo" /> <Button onClick={logout}>Sair</Button>
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
           
              <li key={tech.id}>
                <h3>{tech.title}</h3>
                <div>
                  <p>{tech.status}</p>
                  <FaEdit onClick={() => {
                  setTech(tech)
        
                }} />
                </div>
              </li>
            
          ))}
        </ul> : <p>Adicione alguma tecnologia</p>}
        </Main>
      </main>
      <ToastContainer toastStyle={{backgroundColor: "var(--grey-3)"}}/>
      { openedForm ? 
        
          <FormModal setTech={setTech} onSubmitFunction={onSubmitFunction} schema={schema} buttonForm={buttonForm} tittle={tittleForm} fieldsInputs={fieldsInputs} opened={openedForm} setOpened={setOpenedForm}/> : null
      }
    </PageHome>
    </AnimatedPage>
  );
}

export default Home;
