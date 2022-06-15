import styled from "styled-components";


export const HeaderHome = styled.header`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: var(--background);
    gap: 0.5rem;
    border-bottom: 1px solid var(--grey-2);
    margin-top: 4rem;
    padding: 1rem 15vw;

    @media (max-width:600px) {
        padding: 1rem 10vw;
  }

    @media (max-width:500px) {
        flex-direction: column;
        
    }

`