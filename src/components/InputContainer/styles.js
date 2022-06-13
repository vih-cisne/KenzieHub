import styled from "styled-components";

export const InputDirection = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 0.8rem;
    transition: 0.4s;
    color: var(--grey-0);

    label {
        color: var(--grey-0);
        font-size: 0.8rem;
    }

    input, select {
        background-color: var(--grey-2);
        font-size: 1rem;
        border: ${(props) => props.border || 'none'};
        border-radius: 5px;
        padding: 0.6rem 1rem;
        
    }

    input /*, select*/ {
        color: var(--text-white);
    }

    select, input::placeholder {
        color: var(--grey-1);
    }

    
`