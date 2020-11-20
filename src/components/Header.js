import React from 'react';
import styled from 'styled-components';
import {Button} from 'antd';
import {useStores} from "../stores";
import {observer} from 'mobx-react';
import {NavLink, useHistory} from 'react-router-dom';


const Header = styled.header`
    background-color: #102a38;
    padding: 10px 140px;
    display: flex;
    align-items: center;
    color: #fff;
`;
const Logo = styled.img`
    height: 30px;
`;
const StyledLink = styled(NavLink)`
    color: #fff;
    margin-left: 30px;
    &.active{
      border-bottom: 1px solid #fff;
    }
`;
const Login = styled.div`
  margin-left: auto;
`;
const MyButton = styled(Button)`
  margin-left: 20px;
  text-align: center;
  background: #288388;
  border-color: #288388;
`;


const Component = observer(() => {
    const {UserStore, AuthStore} = useStores();
    let history = useHistory();


    const handleLogin = () => {
        console.log('跳转到登录页面');
        history.push("/login");
    };
    const handleLogout = () => {
        AuthStore.logout();
    };
    const handleRegister = () => {
        console.log('跳转道注册页面');
        history.push("/register");
    };
    return (<Header>
        <Logo src="image.png"/>
        <nav>
            <StyledLink to="/" activeClassName="active" exact>首页</StyledLink>
            <StyledLink to="/history" activeClassName="active">图片仓库</StyledLink>
            <StyledLink to="/about" activeClassName="active">关于我</StyledLink>
        </nav>
        <Login>
            {UserStore.currentUser ? (<>
                {UserStore.currentUser.attributes.username}
                <MyButton type="primary" onClick={handleLogout}>注销</MyButton>
            </>) : (<>
                <MyButton type="primary" onClick={handleLogin}>登录</MyButton>
                <MyButton type="primary" onClick={handleRegister}>注册</MyButton>
            </>)}

        </Login>
    </Header>);
});

export default Component;