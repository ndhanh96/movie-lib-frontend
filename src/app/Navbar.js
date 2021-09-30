import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkLogin } from '../features/user/userSlice';

import 'antd/dist/antd.css';
import { MenuOutlined } from '@ant-design/icons';
import { Row, Col, Space, Button, Drawer, Input, Image } from 'antd';
import axios from 'axios';

const { Search } = Input;

function Navbar() {
  const [drawerStatus, changeDrawerStatus] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    dispatch(checkLogin());
  });

  return (
    <>
      <Row className='navbar'>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <Row justify='center' align='middle'>
            <Col xs={{ span: 3 }} md={{ span: 0 }}>
              <Button
                onClick={() => changeDrawerStatus(true)}
                icon={<MenuOutlined />}
                style={{ float: 'left' }}
              ></Button>
            </Col>
            <Col xs={{ span: 3 }} md={{ span: 2 }}>
              <Image
                style={{cursor:'pointer', marginTop:'5px'}}
                width='100%'
                preview={false}
                onClick={() => history.push('/')}
                alt='logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png'
              />
            </Col>
            <Col xs={{ span: 0 }} md={{ span: 2 }}>
              <Link to='/nav2'>Nav1</Link>
            </Col>
            <Col xs={{ span: 0 }} md={{ span: 2 }}>
              <Link to='/nav2'>Nav2</Link>
            </Col>
            <Col flex='auto'></Col>
            <Col
              xs={{ span: 14 }}
              md={{ span: 10 }}
              lg={{ span: 8 }}
              className='searchbar'
            >
              <Search
                style={{ height: 'auto' }}
                placeholder='input search text'
                enterButton
              />
            </Col>
            <Col xs={{ span: 3 }} md={{ span: 2 }}>
              {isLogin ? <Logout /> : <Login />}
            </Col>
          </Row>
        </Col>
      </Row>
      <Drawer
        title='Basic Drawer'
        placement='left'
        closable={false}
        onClose={() => {
          changeDrawerStatus(false);
        }}
        visible={drawerStatus}
      >
        <Space direction='vertical'>
          <p>Nav1</p>
          <p>Nav2</p>
        </Space>
      </Drawer>
    </>
  );
}

function Login() {
  return (
    <Link style={{ float: 'right' }} to='/login'>
      Login
    </Link>
  );
}

function Logout() {
  const dispatch = useDispatch();

  return (
    <Link
      onClick={async () => {
        await axios.get('https://demo-store-backend.herokuapp.com/logout', {
          withCredentials: true,
        });
        dispatch(checkLogin());
      }}
      style={{ float: 'right' }}
      to='/logout'
    >
      Logout
    </Link>
  );
}

export default Navbar;
