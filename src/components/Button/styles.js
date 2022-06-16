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
  color: ${(props) => props.theme.grey0};
  padding: ${(props) => props.padding || "0.5rem 1rem"};
  border: none;
  border-radius: 4px;
  transition: 0.4s;
  background-color: ${(props) => props.bgColor || props.theme.grey2};

  &:disabled {
    filter: brightness(0.8);
  }

  &:hover {
    filter: brightness(0.8);
  }

  /*
  primary
background: #FF427F;
background: #59323F;
grey-1
grey-2
*/

  animation: ${enabledButton} infinite ${(props) => props.valid ? '2s' : '0s'};

  
  

  
  
  a {
    color: ${(props) => props.theme.grey0};
  }
`;


