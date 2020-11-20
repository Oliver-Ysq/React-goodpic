import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../stores";
import InfiniteScroll from "react-infinite-scroller";
import { List, Spin } from "antd";
import ListItem from "./ListItem";

const Component = observer(() => {
  const { HistoryStore, UserStore } = useStores();
  const loadMore = () => {
    HistoryStore.find();
  };

  useEffect(() => {
    // eslint-disable-next-line
    console.log(UserStore.currentUser);
    if (!UserStore.currentUser) {
      HistoryStore.reset();
    } else loadMore();

    return () => {
      console.log("卸载");
      HistoryStore.reset();
    };
  }, []);

  return (
    <div>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={loadMore}
        hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
        useWindow={true}
      >
        <List
          dataSource={HistoryStore.list}
          renderItem={(item) => (
            <List.Item key={Math.random()}>
              <ListItem
                imgsrc={item.attributes.url.attributes.url}
                href={item.attributes.url.attributes.url}
                objId={item.id}
              />
            </List.Item>
          )}
        >
          {HistoryStore.isLoading && HistoryStore.hasMore && (
            <div>
              <Spin tip="加载中" />
            </div>
          )}
        </List>
      </InfiniteScroll>
    </div>
  );
});

export default Component;
