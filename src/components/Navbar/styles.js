import styled from "styled-components";

export const NavHome = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--grey-2);
  position: fixed;
  padding: 1rem 15vw;
  background-color: var(--grey-4);

  @media (max-width:600px) {
        padding: 1rem 10vw;
  }
`;
