import styled, { css } from "styled-components";

const Form = styled.form`
    height: 25rem;
    width: 20rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 10px;

    background: white;

    ${(props) =>
        props.isRegisterPage &&
        css`
            height: 30rem;

            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.5);
        `}
`;

export default Form;
