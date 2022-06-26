import { Col, Dropdown, Input, Layout, Row } from 'antd';
import PropTypes from 'prop-types';
import Logo from '../../assets/umat_logo.svg';
import ProfileIcon from 'components/Icons/ProfileIcon';
import SearchIcon from 'components/Icons/SearchIcon';
import './style/Navbar.less';
import UserDropdown from './UserDropdown';

const { Header } = Layout;

export default function Navbar({
  showBackdrop,
  stores,
  role,
  selectedStoreId,
  logout,
  hasReservation,
  toNetReservationPage,
  goAccountList,
}) {
  return (
    <>
      <Header className="header">
        <Row style={{ justifyContent: 'space-between' }}>
          <Col xs={4} sm={4} md={6} lg={8} xl={6}>
            <div className="logo">
              <img src={Logo} height="54px" width="180px" alt="Umat Logo" />
            </div>
          </Col>
          <>
            <Col xs={16} sm={16} md={12} lg={8} xl={12} className="search">
              <Input
                placeholder="予約を検索（名前/名前カナ/携帯番号）"
                suffix={<SearchIcon />}
                className="search-bar"
              />
            </Col>
            <Col xs={4} sm={4} md={6} lg={8} xl={6}>
              <ul className="menu">
                <Dropdown
                  overlay={UserDropdown({
                    logout,
                    stores,
                    selectedStoreId,
                    role,
                    showBackdrop,
                    hasReservation,
                    toNetReservationPage,
                    goAccountList,
                  })}
                  placement="bottomRight"
                  arrow
                  trigger={['click']}
                  // onClick={showBackdrop}
                  onVisibleChange={showBackdrop}
                  overlayClassName={'menu-items-dropdown'}
                >
                  <li className="profile-icon">
                    <ProfileIcon />
                  </li>
                </Dropdown>
              </ul>
            </Col>
          </>
        </Row>
      </Header>
    </>
  );
}

Navbar.propTypes = {
  showBackdrop: PropTypes.func,
  stores: PropTypes.array,
  role: PropTypes.string,
  selectedStoreId: PropTypes.any,
  logout: PropTypes.func,
  hasReservation: PropTypes.any,
  toNetReservationPage: PropTypes.func,
  goAccountList: PropTypes.func,
};
