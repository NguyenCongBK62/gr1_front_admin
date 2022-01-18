import React from 'react';
import { Layout, Row, Col } from 'antd';
import Logo from '../../assets/logo.png';
import './style/Navbar.less';
const { Header } = Layout;
export default function Navbar() {
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
        </Row>
      </Header>
    </>
  );
}
