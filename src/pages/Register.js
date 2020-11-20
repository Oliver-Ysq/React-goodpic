import { useStores } from "../stores";
import { Form, Input, Button } from "antd";
import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const MyButton = styled(Button)`
  background: #288388;
  border: none;
  position: absolute;
  right: 0;
  transform: translateX(0);
  @media screen and (max-width: 500px) {
    right: 50%;
    transform: translateX(50%);
  }
`;
const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;
  background: #e9eff2;
  @media (max-width: 500px){
    margin-top: 80px;
}
`;

//用户名校验
const validateUsername = (rule, value) => {
  if (/\W/.test(value)) return Promise.reject("invalid characters existing");
  if (value.length < 4)
    return Promise.reject(
      "length of password should be 4 characters at least."
    );
  if (value.length > 10)
    return Promise.reject("length of password should not more than 10.");
  return Promise.resolve();
};

//密码一致性校验
const confirm = ({ getFieldValue }) => ({
  validator(rule, value) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject("The two passwords that you entered do not match!");
  },
});

//表单布局
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 24,
  },
};

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  @media (max-width: 500px) {
    margin-bottom: 10px;
  }
`;

const Component = () => {
  const { AuthStore } = useStores();
  const history = useHistory();

  const onFinish = (values) => {
    console.log("Success:", values);
    AuthStore.setUsername(values.username);
    AuthStore.setPassword(values.password);
    AuthStore.register()
      .then((user) => {
        console.log("注册成功，进入首页");
        history.push("/");
      })
      .catch((err) => {
        console.log("注册失败，请重试");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Wrapper>
      <Title>注册</Title>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              validator: validateUsername,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 6,
              message: "length of password should be 6 characters at least.",
            },
            {
              max: 20,
              message: "length of password should not more than 20.",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="confirmPassword"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please retype your password!",
            },
            confirm,
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <MyButton type="primary" htmlType="submit">
            Submit
          </MyButton>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Component;
