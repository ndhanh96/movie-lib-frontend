import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { checkLogin } from '../user/userSlice';

import { Row, Col, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function Signup() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const history = useHistory();

  const trySignup = async (values) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/signup',
        {
          username: values.username,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.success);
      if (response.data.success) {
        history.push('/login');
      }
      if(!response.data.success) {
        wrongPassMesg();
      }

    } catch (error) {
      console.log(error);
    }
  };


  const wrongPassMesg = () => {
    message.warning({
      content: 'Signup Failed !!!',
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
        <Col style={{ marginTop: '150px' }} xs={{ span: 10 }} lg={{ span: 6 }}>
          <Form
            name='normal_login'
            className='login-form'
            initialValues={{
              remember: true,
            }}
            onFinish={trySignup}
          >
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Username too sort!',
                  min:4
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
                  message: 'Password too sort!',
                  min:4
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
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Signup;
