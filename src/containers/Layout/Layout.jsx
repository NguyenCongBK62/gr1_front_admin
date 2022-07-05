import { Layout as AntLayout, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import Sidebar from 'components/Slidebar/Sidebar';
import Navbar from 'components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import bg from 'assets/bg.svg';
import 'containers/Layout/style/Layout.less';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { Content } = AntLayout;
  const toastStatus = useSelector((state) => state.ToastStatus.toastStatus);
  console.log(toastStatus);
  useEffect(() => {
    if (toastStatus !== null) {
      if (toastStatus !== 0) {
        toast.success('Thao tác thành công');
      } else if (toastStatus === 0) {
        toast.error('Thao tác thất bại');
      }
    }
  }, [toastStatus]);
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
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
