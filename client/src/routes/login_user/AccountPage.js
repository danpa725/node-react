import styled, { css } from "styled-components";
//--------------------------------------------------
import { useEffect, useRef, useState } from "react";
//--------------------------------------------------
import { useDispatch, useSelector } from "react-redux";
//--------------------------------------------------
import { Link, withRouter } from "react-router-dom";
//--------------------------------------------------
import Container from "../../utils/Container";
import Header from "../../utils/Header";
import MainLogo from "../../utils/MainLogo";
import { UserDemo } from "../../assets/iconComponents";
import { useForm } from "react-hook-form";
import Input from "../../utils/Input";
import {
    BTN_STYLE,
    ERR_INPUT_STYLE,
    ERR_TEXT_STYLE,
    INPUT_STYLE,
    CONFIG_BTN_STYLE,
    CONFIG_ERR_BTN_STYLE,
    CONFIG_SAFE_BTN_STYLE,
    CONFIG_SUCCESS_STYLE,
} from "../../utils/ClassName";
import Err from "../../utils/Err";
import { modifyingUser } from "../../_action/user_action";
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

//--------------------------------------------------

function AccountPage() {
    const dispatch = useDispatch();

    const [display, setDisplay] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [update, setUpdate] = useState(0);

    const { userData = "" } = useSelector((state) => ({
        userData: state.userReducer.userData,
    }));

    //! 페이지 렌더시 userData에서 name, email을 추출
    useEffect(() => {
        const setUserData = (userData) => {
            const Data = { name: userData.name, email: userData.email };
            setUserInfo({ ...Data });
        };
        setUserData(userData);
    }, [userData]);

    const { register, watch, getValues } = useForm();

    let nickNameLength = watch("nickName", "").length;

    const handleUserInputChange = (arg) => {
        if (nickNameLength <= 10) {
            setDisplay(!arg);
            setUpdate(0);

            //! 유저가 입력한 경우
            if (nickNameLength > 0) {
                const newName = {
                    name: getValues("nickName"),
                    email: userData.email,
                };

                if (userInfo.name !== newName.name) {
                    setUserInfo({ ...newName });
                    updateUserInfo(newName);
                }
            }
        }
    };

    const updateUserInfo = async (newName) => {
        const response = await dispatch(modifyingUser(newName));
        if (response.payload.updateSuccess) {
            setUpdate(1);
        }
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
                            className={`${CONFIG_BTN_STYLE} ${
                                nickNameLength <= 10
                                    ? CONFIG_SAFE_BTN_STYLE
                                    : CONFIG_ERR_BTN_STYLE
                            }   `}
                            onClick={() => handleUserInputChange(display)}
                        >
                            {!display && "변경"}
                            {display && nickNameLength <= 10 && "확정"}
                            {display && nickNameLength > 10 && "초과"}
                        </ConfigButton>
                    </List>
                    <List isConfig={true} display={display}>
                        {userInfo?.name}
                    </List>

                    <List display={!display}>
                        <Input
                            isAccountPage={true}
                            name="nickName"
                            type="text"
                            defaultValue={userInfo.name}
                            placeholder="New name"
                            ref={register({
                                required: true,
                                minLength: 0,
                                maxLength: 10,
                            })}
                            className={`${BTN_STYLE} ${
                                nickNameLength <= 10
                                    ? INPUT_STYLE
                                    : ERR_INPUT_STYLE
                            }`}
                        />

                        {nickNameLength > 10 && (
                            <Err
                                isAccountPage={true}
                                className={ERR_TEXT_STYLE}
                            >
                                max nick name length is 10
                            </Err>
                        )}
                        {update === 1 && (
                            <Err
                                isAccountPage={true}
                                className={CONFIG_SUCCESS_STYLE}
                            >
                                Update Success 😎
                            </Err>
                        )}
                    </List>

                    <List isTitle={true}>이메일</List>
                    <List isConfig={true}>{userInfo?.email}</List>
                </UserConfigLists>
            </UserConfigContainer>
        </Container>
    );
}

export default withRouter(AccountPage);
