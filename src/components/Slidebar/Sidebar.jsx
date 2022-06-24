import {
  SolutionOutlined,
  CloudUploadOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import './style/Sidebar.less';

export default function Sidebar() {
  return (
    <Sider trigger={null} collapsible className="sidebar">
      <Menu mode="inline" className="ant-menu-custom" sub>
        <Menu.Item>
          <CloudUploadOutlined />
          <span>Đăng tin tuyển dụng</span>
        </Menu.Item>
        <Menu.Item>
          <UnorderedListOutlined />
          <span>Quản lí bài đăng</span>
        </Menu.Item>
        <Menu.Item>
          <UsergroupAddOutlined />
          <span>Quản lí ứng viên</span>
        </Menu.Item>
        <Menu.Item>
        <SolutionOutlined />
          <span>Quản lí tài khoản</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
