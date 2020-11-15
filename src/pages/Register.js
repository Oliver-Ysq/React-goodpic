// import {useStores} from "../stores";
import {Form, Input, Button} from 'antd';
import React from "react";
import styled from 'styled-components'
// const {AuthStore} = useStores()

const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0,0,0,.2);
  border-radius: 4px;
  padding: 20px;
  background: #e9eff2;
`

//用户名校验
const validateUsername = (rule, value) => {
    if (/\W/.test(value)) return Promise.reject('invalid characters existing')
    if (value.length < 4) return Promise.reject('length of password should be 4 characters at least.')
    if (value.length > 10) return Promise.reject('length of password should not more than 10.')
    return Promise.resolve()
}

//密码一致性校验
const confirm = ({getFieldValue}) => ({
    validator(rule, value) {
        if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
        }
        return Promise.reject('The two passwords that you entered do not match!');
    },
})

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
        offset: 6,
        span: 18,
    },
};


const Title = styled.h1`
    text-align: center;
    margin-bottom: 30px;
`

const Component = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                            message: 'Please input your username!',
                        }, {
                            validator: validateUsername
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        }, {
                            min: 6,
                            message: 'length of password should be 6 characters at least.'
                        }, {
                            max: 20,
                            message: 'length of password should not more than 20.'
                        }
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    label="confirmPassword"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please retype your password!',
                        }, confirm
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Wrapper>
    );
};

export default Component