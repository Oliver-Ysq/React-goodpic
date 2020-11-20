import React from 'react';
import {observer} from "mobx-react";
import Uploader from '../components/Uploader';
import Tips from '../components/Tips';

const Home = observer(() => {

    return (<>
        <Tips>你好，请先登录再上传哦！</Tips>
        <Uploader/>
    </>);
});

export default Home;