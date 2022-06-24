import { Layout as AntLayout } from 'antd';
import React from 'react';
import Sidebar from '../../components/Slidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout({ children }) {
  const { Content } = AntLayout;
  return (
    <div className="main">
      <Navbar />
      <Sidebar />
      <Content
        style={{
          marginTop: '64px',
          marginLeft: '200px',
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          height: '100vh',
        }}
      >
        <Outlet />
      </Content>
    </div>
  );
}
