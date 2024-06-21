import React from 'react';
import { Layout, theme } from 'antd';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntHeader style={{ margin: '24px 16px 0', padding: 0, background: colorBgContainer }}>
     ok
    </AntHeader>
  );
};

export default Header;
