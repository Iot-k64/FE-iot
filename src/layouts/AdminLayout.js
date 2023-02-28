import { DashboardOutlined, DesktopOutlined, InboxOutlined, PieChartOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  };
}
const items = [
  getItem(
    'Dashboard',
    'dashboard',
    <Link to="/dashboard">
      <DashboardOutlined />{' '}
    </Link>
  ),
  getItem(
    'Container',
    'container',
    <Link to="/container">
      <InboxOutlined />
    </Link>
  ),
  getItem(
    'Product',
    'product',
    <Link to="/product">
      <DesktopOutlined />
    </Link>
  )
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const navigation = useNavigate();

  const handleChangeRoute = (element) => {
    const path = element.keyPath[0];
    navigation(`/${path}`);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)'
          }}
        />
        <Menu
          onClick={handleChangeRoute}
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{ padding: 0, background: colorBgContainer }}
        />
        <Content style={{ margin: '0 16px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
