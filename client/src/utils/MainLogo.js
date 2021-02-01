import styled from "styled-components";

const MainLogo = styled.h1`
    font-size: 2.5rem;
    font-family: "Abel", sans-serif;

    margin-left: 0.5rem;

    flex: ${(props) => props.isMainPage && "5"};
`;

export default MainLogo;
