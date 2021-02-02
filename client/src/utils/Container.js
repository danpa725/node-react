import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${(props) => props.isLoginPage && "center"};

    font-family: "Work Sans", sans-serif, "Nanum Gothic Coding", monospace;
    color: #0d0d0d;
`;

export default Container;
