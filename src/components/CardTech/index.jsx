

function CardTech({tech, setTech, Icon}) {
    
    return (
        <li>
             <h3>{tech.title}</h3>
             <div>
               <p>{tech.status}</p>
               <Icon onClick={() => {
              setTech(tech)
            }}/>
               
             </div>
        </li>
    )
}

export default CardTech