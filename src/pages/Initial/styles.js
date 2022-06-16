import styled from "styled-components";


export const PageInitial = styled.div`
    display: flex;
    //flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    height: 100vh;
    position: relative;

    .logo {
        position: absolute;
        top: 5vw;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        align-items: flex-start;
        width: 50vw;
        text-align: start;
        padding-left: 5vw;
        
    }

    .lottie {
        width: auto;
        height: 70%;
    }

    div>div {
        display: flex;
    }

    @media (max-width:600px) {

        .logo {
        width: 90vw;
        gap: 0.8rem;
        
    }

    .lottie {
        width: auto;
        height: auto;
    }
        
    }
`