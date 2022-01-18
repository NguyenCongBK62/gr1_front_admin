import { DashboardOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import './style/Sidebar.less';

export default function Sidebar() {
  return (
    <Sider trigger={null} collapsible className="sidebar">
      <Menu mode="inline" className="ant-menu-custom" sub>
        <Menu.Item>
          <DashboardOutlined />
          <span>ダッシュボード</span>
        </Menu.Item>
        <Menu.Item>
          <DashboardOutlined />
          <span>ダッシュボード</span>
        </Menu.Item>
        <Menu.Item>
          <DashboardOutlined />
          <span>ダッシュボード</span>
        </Menu.Item>
        <Menu.Item>
          <DashboardOutlined />
          <span>ダッシュボード</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
