import { Work } from "./styles";
import { Link } from 'react-router-dom';
function CardWork({work, setWork, Icon, setOpenedModal, setMesage}) {


    
    return (
        <Work>
             <h3>{work.title}</h3>
             <div>
               <p onClick={() => {
                 setOpenedModal(true)
                 setMesage(work.description)
               }}>Ver descrição</p>
               <a href={work.deploy_url} /*to={{ pathname: work.deploy_url }} target="_blank"*/>Link projeto</a>
               <Icon onClick={() => {
              setWork(work)
            }}/>
               
             </div>
        </Work>
    )
}

export default CardWork