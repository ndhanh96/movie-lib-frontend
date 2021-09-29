import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { checkLogin } from '../user/userSlice';

import { Row, Col, Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function Login() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const history = useHistory();

  const tryLogin = async (values) => {
    try {
      const response = await axios.post(
        'http://randomass.xyz:3001/login',
        {
          username: values.username,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(checkLogin());
      if(!response.data.isLogin) {
        wrongPassMesg();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const wrongPassMesg = () => {
    message.warning({
      content: 'Wassup WRONG password',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  }

  useEffect(() => {
    if (isLogin) {
      history.push('/');
    }
    dispatch(checkLogin());
  }, [isLogin]);

  return (
    <React.Fragment>
      <Row justify='center'>
        <Col style={{ marginTop: '150px' }} xs={{ span: 14 }}  md={{span:8}} lg={{ span: 7 }} xl={{span:5}}>
          <Form
            name='normal_login'
            className='login-form'
            initialValues={{
              remember: true,
            }}
            onFinish={tryLogin}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Username'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                style={{width:'100%'}}
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                Log in
              </Button>
              <div></div>
              {/* Or <a href="/">register now!</a> */}
              Or <Link to='/signup'>register now!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Login;
