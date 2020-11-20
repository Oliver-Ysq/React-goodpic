import React from "react";
import { observer } from "mobx-react";
import { useStores } from "../stores";
import { Button } from "antd";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #000;
  padding-bottom: 25px;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const FlexUrl = styled.div`
  height: 120px;
  @media (max-width: 500px) {
    height: 60px;
    margin-top: 12px;
  }
  @media (min-width: 500px) {
    line-height: 120px;
  }
`;
const A = styled.a`
  border-bottom: 1px solid;
`;

const MyButton = styled(Button)`
  background: #288388;
  border: none;
  color: #fff;
`;

const ButtonBox = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    height: 50px;
  }
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border: 1px solid #eee;
  margin-left: 10px;
`;

const ListItem = observer((props) => {
  const { HistoryStore } = useStores();
  const deleteItem = (objId) => {
    HistoryStore.deleteItem(objId);
  };
  return (
    <Flex>
      <div>
        <Img src={props.imgsrc} />
      </div>
      <FlexUrl>
        <A target="_blank" rel="noreferrer" href={props.href}>
          {props.href}
        </A>
      </FlexUrl>
      <ButtonBox>
        <MyButton onClick={() => deleteItem(props.objId)}>删除</MyButton>
      </ButtonBox>
    </Flex>
  );
});

export default ListItem;
