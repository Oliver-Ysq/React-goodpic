import React from 'react';
import {observer} from "mobx-react";
import {useStores} from "../stores/index";

const Home = observer(() => {
    const {AuthStore, UserStore} = useStores();
    return (<>
        {UserStore.currentUser ? <h1>Hello, {AuthStore.values.username}!</h1> : <>用户未登录</>}
    </>);
});

export default Home;