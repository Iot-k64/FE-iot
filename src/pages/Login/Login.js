import { Button, Form, Input } from 'antd';
import React from 'react';
import './Login.css';
import { accounts } from '../../accounts';

export default function Login() {
  const [form] = Form.useForm();
  const handleLogin = (value) => {
    const checkAcc =  accounts.find(account => account.username === value.username && account.pass === value.password);
    if (checkAcc) {
      localStorage.setItem('isLogin', "true");
      window.location.reload();
    }
  }
    return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </div>
        <Form name="login-form" form={form}
        onFinish={handleLogin}
        >
          <p className="form-title">Welcome back</p>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              }
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
