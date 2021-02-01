import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/icons/mainLogo.svg";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding-bottom: 5rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: "Work Sans", sans-serif;
    color: #0d0d0d;
    /* background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%); */
`;

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

const MainLogo = styled.h1`
    font-size: 2.5rem;
    font-family: "Abel", sans-serif;
    flex: 5;

    margin-left: 0.5rem;
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
                <MainLogo>Note Share</MainLogo>
                <Link to="/login">
                    <Button
                        className={
                            "focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50  "
                        }
                    >
                        login
                    </Button>
                </Link>
                <Link to="/register">
                    <Button
                        isSign={true}
                        className={
                            "focus:ring-2 focus:ring-red-500 focus:ring-opacity-50  "
                        }
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
