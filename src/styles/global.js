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
    
    :root {
        --color-primary:#FF577F;
        --color-primary-focus: #FF427F;
        --color-primary-negative: #59323F;

        --grey-4: #121214;
        --grey-3: #212529;
        --grey-2: #343B41;
        --grey-1: #868E96;
        --grey-0: #F8F9FA;

        --success: #3FE864;
        --error: #E83F5B;

        --background: #090909;

    }

    body {
        background-color: var(--background);
        color: var(--grey-0);
        font-size: 1rem;
        font-family: 'Inter', sans-serif;
    }

    span {
        color: var(--grey-1);
    }

    h1, h3 {
        font-weight: 700;
    }

    button {
        cursor: pointer;
    }

    h2 {
        font-weight: 600;
    }
`;
