import React from 'react';
import { Layout, Row, Col, Avatar, Dropdown, Button, Menu } from 'antd';
import Logo from '../../assets/logo.png';
import './style/Navbar.less';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Header } = Layout;
export default function Navbar() {
  const menu = (
    <Menu mode="inline" className="ant-menu-custom" sub>
      <Menu.Item>
        <Link to="/companyprofile">Quản lí tài khoản</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/login">Đăng xuất</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Header className="header">
        <Row style={{ justifyContent: 'space-between' }}>
          <div className="logo">
            <Col xs={4} sm={4} md={6} lg={8} xl={6}>
              <div className="logo">
                <img src={Logo} height="54px" width="100px" alt="Umat Logo" />
              </div>
            </Col>
          </div>
          <div className="logo">
            <Dropdown
              overlay={menu}
              placement="topRight"
              overlayClassName="user-menu"
              arrow
            >
              <Avatar size="normal" icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Row>
      </Header>
    </>
  );
}
