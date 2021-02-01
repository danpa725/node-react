import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/icons/mainLogo.svg";
import Container from "../utils/Container";
import { BTN_STYLE } from "../utils/ClassName";
import MainLogo from "../utils/MainLogo";

const Header = styled.header`
    position: sticky;
    top: 0;

    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;

    border-bottom: 1px solid #0d0d0d;

    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    z-index: 10;
`;

const Button = styled.button`
    transition: all 0.1s ease-in-out;

    width: 90px;
    padding: 0.25rem 1rem;
    margin-right: 0.5rem;

    flex: 1;

    &:hover {
        color: #262626;
        font-weight: 600;

        color: ${(props) => props.isSign && "#F2134F"};

        border-bottom: 2px solid black;
        border-bottom: ${(props) => props.isSign && "2px solid #F2134F"};
    }
    &:active,
    &:focus {
        outline: none;
        /* 클릭시 남는 것들 완전히 제거 */
    }
`;

const ListContainer = styled.ul`
    width: 90%;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, auto));
    gap: 2.5rem;

    margin-top: 1.5rem;
    margin-bottom: 1.5rem;

    align-items: center;
    justify-items: center;

    z-index: 1;
`;

const ListBox = styled.li`
    width: 20rem;
    height: 20rem;

    color: #262626;
    font-size: 1rem;

    background: #262626;

    border: 0.5px solid rgba(255, 255, 255, 0.5);
`;

const BOX_STYLE = "rounded-xl shadow-xl";
// const BTN_STYLE = "focus:ring-2 focus:ring-opacity-50";

export default function LandingPage() {
    const [user, setUser] = useState("");

    const getDataFromServer = async () => {
        const { data } = await axios.get("/api/hellow");
        setUser(data);
        console.log(user);
    };

    useEffect(() => {
        getDataFromServer();
    });

    return (
        <Container>
            <Header>
                <MainLogo isMainPage={true}>Note Share</MainLogo>
                <Link to="/login">
                    <Button className={`${BTN_STYLE} focus:ring-gray-400 `}>
                        login
                    </Button>
                </Link>
                <Link to="/register">
                    <Button
                        isSign={true}
                        className={`${BTN_STYLE} focus:ring-red-500`}
                    >
                        sign in
                    </Button>
                </Link>
            </Header>
            {/* <Logo width={50} height={50} /> */}
            {/* <ListContainer>
                <ListBox className={`${BOX_STYLE}`}>hellow</ListBox>
                <ListBox className={`${BOX_STYLE}`}>hi</ListBox>
                <ListBox className={`${BOX_STYLE}`}>bye</ListBox>
                <ListBox className={`${BOX_STYLE}`}>june</ListBox>
            </ListContainer> */}
        </Container>
    );
}
