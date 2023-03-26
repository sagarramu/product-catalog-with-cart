import { Layout, Menu } from 'antd';
import React from 'react';
const { Footer } = Layout;
import Link from 'next/link';

const AppFooter = () => {
  return (
    <>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Practical ©2023 Created by Sagar Ramoliya
      </Footer>
    </>
  );
};

export default AppFooter; 