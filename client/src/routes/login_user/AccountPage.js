import styled, { css } from "styled-components";
//--------------------------------------------------
import { useEffect, useState } from "react";
//--------------------------------------------------
import { useSelector } from "react-redux";
//--------------------------------------------------
import { Link, withRouter } from "react-router-dom";
//--------------------------------------------------
import Container from "../../utils/Container";
import Header from "../../utils/Header";
import MainLogo from "../../utils/MainLogo";
import { UserDemo } from "../../assets/iconComponents";
import { useForm } from "react-hook-form";
import Input from "../../utils/Input";
import { BTN_STYLE, INPUT_STYLE } from "../../utils/ClassName";
//--------------------------------------------------

const UserConfigContainer = styled.div`
    width: 60%;
    height: 300px;
    margin-top: 2.5rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%);
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 1rem;

    height: 10rem;
`;

const UserConfigLists = styled.ul`
    width: fit-content;
    margin-top: 0.5rem;
    padding: 2.5rem;
    border-left: 1px solid #a6a6a6;
`;

const List = styled.li`
    width: 10rem;
    transition: all ease-out 0.1s;

    padding-bottom: 0.25rem;
    cursor: pointer;
    ${(props) =>
        props.isTitle &&
        css`
            margin-bottom: 0.25rem;
            font-family: "Do Hyeon";

            display: flex;
            flex-direction: row;
            justify-content: space-between;
        `}

    ${(props) =>
        props.isConfig &&
        css`
            text-decoration: underline;

            &:hover {
                color: #03a678;
            }
        `}
    display:${(props) => props.display && "none"};
`;

const ConfigButton = styled.button`
    transition: all ease-out 0.1s;

    width: 5rem;

    color: whitesmoke;
    background: #0d0d0d;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:active,
    &:focus {
        outline: none;
        /* 클릭시 남는 것들 완전히 제거 */
        border: none;
    }
`;

const CONFIG_BTN_STYLE =
    "rounded shadow hover:shadow-lg hover:bg-green-600 focus:ring-2 focus:ring-green-300";
//--------------------------------------------------

function AccountPage() {
    const { userData = "" } = useSelector((state) => ({
        userData: state.userReducer.userData,
    }));
    const { name, email } = userData;

    const { register, handleSubmit, errors, watch } = useForm();
    const [display, setDisplay] = useState(false);

    const toggleClass = (arg) => {
        setDisplay(!arg);
    };

    return (
        <Container>
            <Header>
                <MainLogo>
                    <Link to="/">Note Share</Link>
                </MainLogo>
            </Header>
            <UserConfigContainer className={"shadow-md rounded"}>
                <ImageContainer>
                    <UserDemo />
                    <ConfigButton className={CONFIG_BTN_STYLE}>
                        upload
                    </ConfigButton>
                </ImageContainer>
                <UserConfigLists>
                    <List isTitle={true}>
                        닉네임
                        <ConfigButton
                            className={CONFIG_BTN_STYLE}
                            onClick={() => toggleClass(display)}
                        >
                            {!display ? "변경" : "확정"}
                        </ConfigButton>
                    </List>
                    <List isConfig={true} display={display}>
                        {name}
                    </List>
                    <List display={!display}>
                        <Input
                            isAccountPage={true}
                            name="nickName"
                            type="text"
                            placeholder="New name"
                            ref={register({ required: true, maxLength: 10 })}
                            className={`${BTN_STYLE} ${INPUT_STYLE}`}
                        />
                    </List>
                    <List isTitle={true}>이메일</List>
                    <List isConfig={true}>{email}</List>
                </UserConfigLists>
            </UserConfigContainer>
        </Container>
    );
}

export default withRouter(AccountPage);
