import { Layout as AntLayout, Spin } from 'antd';
import React, { useState } from 'react';
import Sidebar from 'components/Slidebar/Sidebar';
import Navbar from 'components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import bg from 'assets/bg.svg';
import 'containers/Layout/style/Layout.less';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { Content } = AntLayout;
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className={'main'}
    >
      <Navbar />
      <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      <Content
        className={collapsed ? 'section section-collapsed' : 'section'}
        style={{ marginTop: '100px' }}
      >
        <Spin
          tip=""
          size="large"
          spinning={false}
          className={'full-screen-spin'}
        >
          <Outlet />
        </Spin>
      </Content>
    </div>
  );
}
