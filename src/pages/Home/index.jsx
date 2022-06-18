import { Redirect } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Main from "../../components/Main";
import NavBar from "../../components/Navbar";
import Logo from "../../images/Logo.svg";
import { FaLaptopCode, FaFileCode } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { PageHome } from "./styles";
import FormModal from "../../components/FormModal";
import { schemaRegisterTech, schemaUpdateTech, schemaRegisterWork, schemaUpdateWork } from "./validations";
import { toast, ToastContainer } from "react-toastify";
import { MdLogout } from "react-icons/md";

import 'react-toastify/dist/ReactToastify.css';
import AnimatedPage from "../../components/AnimatedPage";
import ModalConfirmation from "../../components/ModalConfirmation";
import ContentTechnologies from "../../components/ContentTechnologies";
import ContentWorks from "../../components/ContentWorks";
import { Modal } from "../../components/Modal/styles";
import ModalC from "../../components/Modal";


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
  const [openedModalConfirm, setOpenedModalConfirm] = useState(false)
  const [openedModal, setOpenedModal] = useState(false) 
  const [onTechnologies, setOnTechnologies] = useState(true)
  const [works, setWorks] = useState([])
  const [work, setWork] = useState()
  const [mesageModal, setMesage] = useState()
  
  
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
  function deleteFunction() {

    if(onTechnologies) {
      deleteTech()
    } else {
      deleteWork()
    }
    
  }

  function deleteTech() {
    axios.delete(`https://kenziehub.herokuapp.com/users/techs/${tech.id}`, {
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
        setOpenedModalConfirm(false)
        
    }).catch(() => {

      toast.error("Ocorreu algum erro, tente novamente", {
        autoClose:5000,
        theme: "dark"
      })
      //setOpenedModalConfirm(false)
      
    })
  }

  function deleteWork() {
    axios.delete(`https://kenziehub.herokuapp.com/users/works/${work.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {

      loadUserInfo()
        toast.success('Projeto deletado!',{
          autoClose:1000,
          theme: "dark"
        })
        setOpenedForm(false)
        setOpenedModalConfirm(false)
        
    }).catch(() => {

      toast.error("Ocorreu algum erro, tente novamente", {
        autoClose:5000,
        theme: "dark"
      })
      //setOpenedModalConfirm(false)
      
    })
  }



  function loadUserInfo() {
    axios
      .get(`https://kenziehub.herokuapp.com/users/${idUser}`)
      .then((res) => {setUser(res.data)
        setTechs(res.data.techs)
        setWorks(res.data.works)
        
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

  useEffect(() => {
    if(work) {
      
      openModalUpdateWork()
    }
  }, [work])

  function openModalUpdateWork() {
    setOpenedForm(true)
    setTittleForm('Projeto detalhes')
    const fields = [{
      field: 'input',
      label: 'Título',
      name: 'title',
      defaultValue: work.title 
    },{
      field: 'input',
      label: 'Descrição',
      name: 'description',
      defaultValue: work.description 
    },{
      field: 'input',
      label: 'Link do projeto',
      name: 'deploy_url',
      defaultValue: work.deploy_url 
    }]
    
    setFieldsInputs(fields)


    setButtonForm([{
      title: 'Salvar alterações',
      bgColor: "var(--color-primary)",
      type: 'submit'
    }, {
      title: 'Excluir',
      type: 'button',
      onClick: () => setOpenedModalConfirm(true)
    }])
    setOnSubmitFunction({
      f: onSubmitUpdateWorkFunction
    })
    setSchema(schemaUpdateWork)
  }

  function onSubmitUpdateWorkFunction(data) {

    axios.put(`https://kenziehub.herokuapp.com/users/works/${work.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      
      loadUserInfo()
        toast.success('Projeto alterado!',{
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

  function onSubmitRegisterWorkFunction(data) {
    axios.post('https://kenziehub.herokuapp.com/users/works', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setWorks([...works, res.data])
        toast.success('Projeto adicionado!',{
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

  function openModalWorkAdd() {
    
    setOpenedForm(true)
    setTittleForm('Cadastrar projeto')
    setFieldsInputs([{
      field: 'input',
      label: 'Título*',
      name: 'title',
    },{
      field: 'input',
      label: 'Descrição*',
      name: 'description',
    },{
      field: 'input',
      label: 'Link do projeto*',
      name: 'deploy_url',
    }])
    setButtonForm([{
      title: 'Cadastrar Projeto',
      bgColor: "var(--color-primary)",
      type: 'submit'
    }])
    setOnSubmitFunction({
      f: onSubmitRegisterWorkFunction
    })
    setSchema(schemaRegisterWork)
  }

  /*{
	"title": "KenzieHub",
	"description": "I was the backend developer of this project, and i did it using Typescript and NodeJS",
	"deploy_url": "https://kenziehub.me"
}*/

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
      onClick: () => setOpenedModalConfirm(true)
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
        <img onClick={() => setThemeIsDefault(!themeIsDefault)} src={Logo} alt="logo" />
        <div>
        <Button onClick={logout}><MdLogout/></Button>
        <Button onClick={() => setOnTechnologies(true)} bgColor={onTechnologies ? "var(--color-primary)" : null} ><FaLaptopCode/></Button>
        <Button onClick={() => setOnTechnologies(false)} bgColor={!onTechnologies ? "var(--color-primary)" : null}><FaFileCode/></Button>
        </div> 
      </NavBar>
      <Header>
        {" "}
        <h1>Olá, {user.name} </h1> <p>{user.course_module}</p>{" "}
      </Header>
      <main>
        <Main>
         {onTechnologies ?  <ContentTechnologies openModalAdd={openModalAdd} techs={techs} setTech={setTech} /> 
         : <ContentWorks setMesage={setMesage} setOpenedModal={setOpenedModal} openModalAdd={openModalWorkAdd} works={works} setWork={setWork} />}
          


          
        </Main>
      </main>
      <ToastContainer toastStyle={{backgroundColor: "var(--grey-3)"}}/>
      { openedForm ? 
        
          <FormModal setTech={setTech} onSubmitFunction={onSubmitFunction} schema={schema} buttonForm={buttonForm} tittle={tittleForm} fieldsInputs={fieldsInputs} opened={openedForm} setOpened={setOpenedForm}/> : null
      }

      {
        openedModalConfirm ? 
        <ModalConfirmation  mesage={`Deseja mesmo excluir ${onTechnologies ? 'essa tedcnologia' : 'esse projeto'}?`} setOpened={setOpenedModalConfirm} opened={openedModalConfirm} buttons={[{
          title: 'Não',
          onClick: () => setOpenedModalConfirm(false)
        }, {
          bgColor: "var(--color-primary)",
          title: 'Sim',
          type: 'button',
          onClick: () => deleteFunction()
        }]}/> : null
      }
      {
        openedModal ? <ModalC mesage={mesageModal} opened={openedModal} setOpenedModal={setOpenedModal}/> : null
      }
    </PageHome>
    </AnimatedPage>
  );
}

export default Home;
