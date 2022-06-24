import { Button, Card, Form, Input, Spin } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../../assets/bg.svg';
import loginCover from '../../assets/login-cover.svg';
import './Login.less';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = async (data) => {
    await fetch('http://localhost:3001/admin/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          localStorage.setItem('Authorization', data.Authorization);
          localStorage.setItem('username', data.email);
        }
        navigate('/jobs', { replace: true });
      })
      .catch(() => {
        navigate('/jobs', { replace: false });
      });
  };

  const onFinish = (values) => {
    setIsLoading(true);
    login(values);
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Spin tip="Đang xử lí" size="large" spinning={isLoading}>
      <div
        className={'main'}
        style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center' }}
      >
        <Card
          className={'login-card'}
          cover={
            <img alt="example" src={loginCover} width="345px" height="118px" />
          }
        >
          <Form
            name="normal_login"
            className="login-form"
            layout={'vertical'}
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Tên đăng nhập"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập tên đăng nhập' },
              ]}
            >
              <Input
                placeholder="Vui lòng nhập tên đăng nhập"
                className={'login-input'}
              />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
            >
              <Input
                type="password"
                placeholder="Vui lòng nhập mật khẩu"
                className={'login-input'}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button login-btn"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Spin>
  );
}
