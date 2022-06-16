import styled from "styled-components";


export const PageInitial = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: flex-end;
    gap: 1rem;


    .logo {
        height: 100%;
        width: fit-content;
        display: flex;
        gap: 1rem;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-left: 10%;

        h1 {
            text-align: start;
            
        }
    }
    //justify-content: flex-end;
    

    @media (max-width:600px) {
        flex-direction: column;
        gap: 0;
        
        .logo {
            width: 100%;
            align-items: center;
            justify-content: flex-end;
            padding: 10% 0;

            h1 {
                text-align: center;
                font-size: 1.4rem;
            }

            //height: fit-content;
            
        }
    }
`