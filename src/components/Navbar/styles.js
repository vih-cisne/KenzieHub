import styled from "styled-components";

export const NavHome = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.grey2};
  position: fixed;
  padding: 1rem 15vw;
  background-color: ${(props) => props.theme.grey4};

  @media (max-width:600px) {
        padding: 1rem 10vw;
  }
`;
