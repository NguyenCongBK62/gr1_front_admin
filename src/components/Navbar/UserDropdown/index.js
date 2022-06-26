import { Col, Divider, Menu, Row } from 'antd';
import Heading from 'components/Heading';
import LogoutIcon from 'components/Icons/LogoutIcon';
import PropTypes from 'prop-types';

export default function UserDropdown({ logout, showBackdrop }) {
  return (
    <Menu className="user-dropdown">
      <Menu.Item onClick={showBackdrop}>
        <Heading>アカウント名：Công</Heading>
      </Menu.Item>
      <Menu.Item onClick={showBackdrop}>
        <Divider />
        <p style={{ cursor: 'text' }}>ユーザーID: 123456</p>
        <Divider />
      </Menu.Item>
      <Menu.Item onClick={logout}>
        <Row>
          <Col style={{ margin: '16px 5px 0 0' }}>
            <LogoutIcon />{' '}
          </Col>{' '}
          <Col>
            {' '}
            <p>Đăng xuất</p>
          </Col>
        </Row>
      </Menu.Item>
    </Menu>
  );
}

UserDropdown.propTypes = {
  logout: PropTypes.func,
  showBackdrop: PropTypes.func,
};
