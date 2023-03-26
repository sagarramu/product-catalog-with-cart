import { Layout, Menu } from 'antd';
import React from 'react';
const { Header } = Layout;
import Link from 'next/link';

const AppHeader = (props) => {
  return (
    <>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[props.menutype]} mode="horizontal">
          <Menu.Item key="Productlist">
            <Link href="/">Product List </Link>
          </Menu.Item>
          <Menu.Item key="Cart">
            <Link href="/cart/addtocart">Cart</Link>
          </Menu.Item>
          <Menu.Item key="CompareProduct">
            <Link href="/compareproduct">Product Compare</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </>
  );
};

export default AppHeader; 