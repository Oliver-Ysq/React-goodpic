import React, { useRef } from "react";
import { useStores } from "../stores";
import { observer, useLocalStore } from "mobx-react";
import { message, Upload, Spin } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Result = styled.div`
  margin-top: 20px;
  border: 1px dashed #ccc;
  padding: 10px 20px;
  border-radius: 4px;
`;
const H1 = styled.h2`
  margin: 10px 0;
  text-align: center;
  color: rgb(40, 131, 136);
  font-weight: bold;
`;
const Img = styled.img`
  max-width: 300px;
  @media (max-width: 500px) {
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const DL = styled.dl`
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const DT = styled.dt`
  font-size: 20px;
  color: rgb(16, 42, 56);
  margin: 10px auto;
`;

const Myinput = styled.input`
  @media (max-width: 500px) {
    margin-bottom: 10px;
  }
  @media (min-width: 500px) {
    margin-left: 10px;
  }
`;

const InputWrapper = styled.dd`
  display: flex;
  flex-direction: row;
  @media (min-width: 500px) {
    justify-content: flex-start;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;

const { Dragger } = Upload;

const Component = observer(() => {
  const { ImageStore, UserStore } = useStores();
  const wRef = useRef();
  const hRef = useRef();
  const store = useLocalStore(() => ({
    width: null,
    get widthStr() {
      return store.width ? "/w/" + store.width : "";
    },
    setWidth() {
      this.width = wRef.current.value;
    },
    height: null,
    get heightStr() {
      return store.height ? "/h/" + store.height : "";
    },
    setHeight() {
      this.height = hRef.current.value;
    },
    get fullStr() {
      return (
        ImageStore.serverFile.attributes.url.attributes.url +
        "?imageView2/0" +
        store.widthStr +
        store.heightStr
      );
    },
  }));
  const props = {
    showUploadList: false,
    beforeUpload: (file) => {
      if (UserStore.currentUser === null) {
        message.warning("请先登录再上传哦！");
        return false;
      }

      if (!/(svg$)|(png$)|(jpeg$)|(jpg$)|(gif$)/gi.test(file.type)) {
        message.warning("只能上传png/svg/jpg/gif格式的文件哦");
        return false;
      }
      if (file.size > 1024 * 1024) {
        message.warning("图片大小不能超过1M哦");
        return false;
      }

      ImageStore.setFile(file);
      ImageStore.setFilename(file.name);
      ImageStore.upload()
        .then((res) => {
          window.res = res;
          console.log("上传成功");
        })
        .catch((err) => console.log("上传失败"));
      return false;
    },
  };

  return (
    <div>
      <Spin tip="上传中..." spinning={ImageStore.isUploading}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag image file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for /.svg/.png/.jpg/.gif file, and the size is limited in
            1MB.
          </p>
        </Dragger>
      </Spin>
      <div>
        {ImageStore.serverFile !== null ? (
          <Result>
            <H1>上传结果</H1>
            <DL>
              <DT>线上地址</DT>
              <dd>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={ImageStore.serverFile.attributes.url.attributes.url}
                >
                  {ImageStore.serverFile.attributes.url.attributes.url}
                </a>
              </dd>
              {/* <DT>文件名</DT>
              <dd>{ImageStore.filename}</dd> */}
              <DT>图片预览</DT>
              <dd>
                <Img
                  src={ImageStore.serverFile.attributes.url.attributes.url}
                />
              </dd>
              <DT>尺寸定制</DT>
              <InputWrapper>
                <Myinput
                  onChange={() => store.setWidth()}
                  placeholder="max width(not necessary)"
                  ref={wRef}
                />
                <Myinput
                  onChange={() => store.setHeight()}
                  placeholder="max height(not necessary)"
                  ref={hRef}
                />
              </InputWrapper>
              <dd>
                <a target="_blank" rel="noreferrer" href={store.fullStr}>
                  {store.fullStr}
                </a>
              </dd>
            </DL>
          </Result>
        ) : null}
      </div>
    </div>
  );
});

export default Component;
