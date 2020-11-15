import React, {useState} from 'react'
import LogoUrl from '../pages/logo.svg'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {Button} from 'antd';

const Header = styled.header`
    background-color: #02101f;
    padding: 10px 100px;
    display: flex;
    align-items: center;
    color: #fff;
`
const Logo = styled.img`
    height: 30px;
`
const StyledLink = styled(NavLink)`
    color: #fff;
    margin-left: 30px;
    &.active{
      border-bottom: 1px solid #fff;
    }
`
const Login = styled.div`
  margin-left: auto;
`
const MyButton = styled(Button)`
  margin-left: 10px;
  text-align: center;
`


function Component() {
    const [isLogin, setIsLogin] = useState(false)
    return (
        <Header>
            <Logo src={LogoUrl}/>
            <nav>
                <StyledLink to="/" activeClassName="active" exact>首页</StyledLink>
                <StyledLink to="/history" activeClassName="active">历史记录</StyledLink>
                <StyledLink to="/about" activeClassName="active">关于我</StyledLink>
            </nav>
            <Login>
                {
                    isLogin ? (<>
                        Oliver <MyButton type="primary" onClick={() => {setIsLogin(false)}}>注销</MyButton>
                    </>) : (<>
                        <MyButton type="primary" onClick={() => {setIsLogin(true)}}>登录
                            {/*<StyledLink to="/login">登录</StyledLink>*/}
                        </MyButton>
                        <MyButton type="primary">注册
                            {/*<StyledLink to="/register">注册</StyledLink>*/}
                        </MyButton>
                    </>)
                }

            </Login>
        </Header>
    )
}

export default Component