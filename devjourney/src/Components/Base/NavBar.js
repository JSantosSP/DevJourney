import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PictureOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    label: <Link to="/">Home</Link>,
    key: 'home',
    icon: <HomeOutlined />
  },
  {
    label: <Link to="/apifilm">API films</Link>,
    key: 'films',
    icon: <PictureOutlined />
  }
];
const NavBar = () => {
  const location = useLocation();
  const [current, setCurrent] = useState('home');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setCurrent('home');
    } else if (path === '/apifilm') {
      setCurrent('films');
    }
  }, [location.pathname]);
  return <Menu selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default NavBar;