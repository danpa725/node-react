import styled, { css } from "styled-components";

const Input = styled.input`
    transition: all ease-out 0.1s;

    width: 250px;
    height: 1.5rem;

    margin: 0.75rem;

    background: transparent;

    border-bottom: 1.5px solid black;

    &:active,
    &:focus {
        outline: none;
        /* 클릭시 남는 것들 완전히 제거 */
        border: none;
        border-radius: 2.5px;
    }

    ${(props) =>
        props.isBtn &&
        css`
            margin-top: 1rem;
            height: 2rem;

            background: black;

            color: white;

            border: none;
            border-radius: 2.5px;
        `}
    ${(props) =>
        props.isAccountPage &&
        css`
            width: 10rem;

            margin: 0.5rem 0;

            border-bottom: 1.5px solid #03a678;
        `}
`;

export default Input;
