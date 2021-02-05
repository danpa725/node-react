import { useEffect, useState } from "react";
//-------------------------------------------------------------
import styled from "styled-components";
//-------------------------------------------------------------
import { Link, withRouter } from "react-router-dom";
//-------------------------------------------------------------
import { BTN_STYLE } from "../utils/ClassName";
//-------------------------------------------------------------
import Container from "../utils/Container";
import MainLogo from "../utils/MainLogo";
import NavBar from "../utils/NavBar";
//-------------------------------------------------------------
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../_action/user_action";
import { Login, UserAdd } from "../assets/iconComponents";
//-------------------------------------------------------------

const Header = styled.header`
    position: sticky;
    top: 0;

    width: 100%;
    height: 4.5rem;

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

    width: 105px;
    padding: 0.25rem 1rem;
    margin-right: 0.5rem;

    flex: 1;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.25rem;

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

const ProfileBtn = styled.button`
    transition: 0.1s ease-out all;

    font-weight: 500;

    width: auto;
    height: 50px;

    padding: 0 1rem;
    margin-right: 1rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
    color: white;
    &:hover {
        border: 1px solid white;
    }

    &:active,
    &:focus {
        outline: none;
        /* 클릭시 남는 것들 완전히 제거 */
    }
`;

const PROFILE_STYLE = "rounded-full shadow-sm border hover:shadow-lg";
//-------------------------------------------------------------

function LandingPage() {
    const dispatch = useDispatch();
    const [nickName, setNickName] = useState("");
    const [display, setDisplay] = useState(false);
    const [login, setLogin] = useState(false);

    const onClick = (arg) => {
        setDisplay(!arg);
    };
    const { userData = false } = useSelector((state) => ({
        userData: state.userReducer.userData,
    }));

    const handleLogOut = () => {
        dispatch(logoutUser);

        window.location.reload();
    };

    useEffect(() => {
        setLogin(userData.isAuth);
        const getUserName = (isLogIn) => {
            if (isLogIn) {
                const { name } = userData;
                return name;
            }
        };
        const name = getUserName(userData.isAuth);
        if (name === undefined) {
            setNickName("😎");
        } else {
            setNickName(name);
        }
    }, [userData]);

    return (
        <Container>
            <Header>
                <MainLogo isMainPage={true}>
                    <Link to="/">Note Share</Link>
                </MainLogo>

                {login && (
                    <>
                        <ProfileBtn
                            className={PROFILE_STYLE}
                            onClick={() => onClick(display)}
                        >
                            {nickName}
                        </ProfileBtn>
                        <NavBar display={display} handleLogOut={handleLogOut} />
                    </>
                )}
                {!login && (
                    <>
                        <Link to="/login">
                            <Button
                                className={`${BTN_STYLE} focus:ring-gray-400 `}
                            >
                                login
                                <Login />
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button
                                isSign={true}
                                className={`${BTN_STYLE} focus:ring-red-500`}
                            >
                                sign in
                                <UserAdd />
                            </Button>
                        </Link>
                    </>
                )}
            </Header>
        </Container>
    );
}

export default withRouter(LandingPage);
