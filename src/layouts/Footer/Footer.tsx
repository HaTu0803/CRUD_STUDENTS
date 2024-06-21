import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter style={{ textAlign: 'center' ,  margin: '24px 16px 0', background: '#f0f2f5' }}>
      @{new Date().getFullYear()} Created by HTTTU
    </AntFooter>
  );
};

export default Footer;
