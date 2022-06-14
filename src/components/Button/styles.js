import styled from "styled-components";
import { keyframes } from "styled-components";

const enabledButton = keyframes`
    0% {
        transform: scale(0.9);
    }

    50% {
        transform: scale(1);
    }

    100% {
      transform: scale(0.9);
    }
`

export const ButtonStyled = styled.button`
  color: var(--grey-0);
  padding: ${(props) => props.padding || "0.5rem 1rem"};
  border: none;
  border-radius: 4px;
  transition: 0.4s;
  background-color: ${(props) => props.bgColor || "var(--grey-3)"};

  &:disabled {
    filter: brightness(0.8);
  }

  animation: ${enabledButton} infinite ${(props) => props.valid ? '2s' : '0s'};

  
  

  
  
  a {
    color: var(--grey-0);
  }
`;


