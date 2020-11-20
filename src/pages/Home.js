import React from 'react';
import {observer} from "mobx-react";
import Uploader from '../components/Uploader';
import Tips from '../components/Tips';
import styled from 'styled-components';

const MyUploader = styled(Uploader)`
    margin-top: 10px;
`

const Home = observer(() => {

    return (<>
        <Tips>你好，请先登录再上传哦！</Tips>
        <MyUploader/>
    </>);
});

export default Home;