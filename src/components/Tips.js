import React from 'react';
import {useStores} from "../stores/index";
import {observer} from "mobx-react";
import styled from 'styled-components'

const Tips = styled.div`
  background: #ff9999;
  padding: 10px;
  margin: 10px 0 30px 0;
  border-radius: 4px;
  color: white;
`

const Component = observer((props) => {
    const { UserStore} = useStores();
    return (
        UserStore.currentUser ? null :
            <Tips>{props.children}</Tips>
    );
});

export default Component;