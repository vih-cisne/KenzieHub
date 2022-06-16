import styled from "styled-components";

export const MainStyled = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
    div {
        display: flex;
        justify-content: space-between;
    }
    ul {
        display: flex;
        gap: 1rem;
        flex-direction: column;
        background-color: ${(props) => props.theme.grey3};
        padding: 1rem;
    }

    li {
       display: flex;
       padding: 1rem;
       border-radius: 10px;
       background-color: ${(props) => props.theme.grey4};
       gap: 0.5rem;
       justify-content: space-between;
       align-items: center;
       pointer-events: none;
       transition: 0.4s;

       &:hover {
        box-shadow: 0 0 0.8em white;
        transition: 0.4s;
       }

       svg {
           cursor: pointer;
           pointer-events: auto;
       }

       h3 {
           width: 100%;
           text-align: start;
           height: 100%;
       }

       div {
           display: flex;
           gap: 1rem;
       }
    }

    @media (max-width:500px) {

        ul {
            padding: 0.5rem;
        }

        li {
            padding: 0.5rem;
        }    
        
    }

    @media (max-width:300px) {
li {
    padding: 0.2rem;
}

li>div {
    flex-direction: column;
    align-items: flex-end;
}


}

`