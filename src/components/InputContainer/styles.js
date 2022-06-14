import styled from "styled-components";
import { css } from "styled-components";
import { keyframes } from "styled-components";

const showUp = keyframes`
    from {
        opacity: 0;
        transform: translateX(50%);
    }

    to {
        opacity: 1;
        transform: translateX(0px);
    }
`;

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

        span {
            ${(props) => props.isError && css`
            color: red;
            `};
        }
    }

    div {
        display: flex;
        background-color: var(--grey-2);
        font-size: 1rem;
        border: ${(props) => props.isError ? '1px solid red' : 'none'};
        border-radius: 5px;
        padding: 0.6rem 1rem;
        animation: ${showUp} 1s;
        animation-delay: ${(props) => props.delay};

        &:focus-within {
            border: 1px solid white;
        }
    }
    

    input, select {
        width: 95%;
        background-color: transparent;
        border: none;   
        &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: var(--text-white);
      box-shadow: 0 0 0 30px var(--grey-2) inset !important;

    }
    }

    input /*, select*/ {
        color: var(--text-white);
    }

    select, input::placeholder {
        color: var(--grey-1);
    }

    
`