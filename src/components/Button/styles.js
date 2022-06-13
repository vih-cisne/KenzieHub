import styled from "styled-components";

export const ButtonStyled = styled.button`
  color: var(--grey-0);
  padding: ${(props) => props.padding || "0.5rem 1rem"};
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.bgColor || "var(--grey-3)"};

  &:disabled {
    background-color: var(--color-primary-negative);
  }

  a {
    color: var(--grey-0);
  }
`;
