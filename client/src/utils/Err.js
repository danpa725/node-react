import styled, { css } from "styled-components";

const Err = styled.p`
    font-family: "Do Hyeon";
    font-size: 1rem;

    width: 250px;
    text-align: center;

    ${(props) =>
        props.isAccountPage &&
        css`
            width: 12rem;
            text-align: left;
        `}
`;

export default Err;
