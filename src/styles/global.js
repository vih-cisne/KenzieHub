import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
    }

    #root {
        width: 100%;
    }
    
    :root {
        --color-primary:#FF577F;
        --color-primary-focus: #FF427F;
        --color-primary-negative: #59323F;

        --grey-4: #121214;
        --grey-3: #212529;
        --grey-2: #343B41;
        --grey-1: #868E96;
        --grey-0: #F8F9FA;

        --text-white: #fff;


        --success: #3FE864;
        --error: #E83F5B;

        --background: #090909;

    }

    body {
        background-color: var(--background);
        color: var(--grey-0);
        font-size: 1rem;
        font-family: 'Inter', sans-serif;
        min-height: 100vh;
        display: flex;
        text-align: center;
    }

    span {
        color: var(--grey-1);
    }

    h1, h3 {
        font-weight: 700;
    }
    p {
        color: var(--grey-1);
        font-size: 0.8rem;
    }

    button {
        cursor: pointer;
    }

    h2 {
        font-weight: 600;
        font-size: 1.1rem;
    }

    li {
        list-style: none;
    }

    @media (max-width:500px) {
        h2 {
        font-size: 0.8rem;
        }

        h1 {
            font-size: 1.2rem;
        }

        h3 {
            font-size: 0.9rem;
        }
    }
`;
