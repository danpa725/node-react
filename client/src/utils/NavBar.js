import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const NavContainer = styled.div`
    position: fixed;
    top: 4.5rem;
    right: 0;

    width: 7rem;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    background: whitesmoke;

    display: none;

    ${(props) =>
        props.isClicked &&
        css`
            display: block;
        `}
`;

const NavBtn = styled.button`
    transition: all 0.1s ease-out;

    display: flex;
    align-items: center;
    justify-content: center;
    width: inherit;
    height: 3rem;
    padding: 0.25rem 1rem;
    margin-right: 0.5rem;

    &:active,
    &:focus {
        outline: none;
        /* 클릭시 남는 것들 완전히 제거 */
    }

    & + & {
        border-top: 1.5px solid gray;
    }
    &:hover {
        background: black;
        color: whitesmoke;
    }
    &:last-child {
        border-radius: 0 0 0.5rem 0.5rem;
    }
`;

function NavBar({ display, handleLogOut }) {
    return (
        <NavContainer isClicked={display} className={"shadow-md"}>
            <NavBtn onClick={handleLogOut}>
                <Link to="/">logout</Link>
            </NavBtn>
            <NavBtn>
                <Link to="/accout">account</Link>
            </NavBtn>
            <NavBtn>
                <Link to="/settings">settings</Link>
            </NavBtn>
        </NavContainer>
    );
}

export default NavBar;
