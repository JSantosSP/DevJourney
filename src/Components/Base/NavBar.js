import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PictureOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    label: <Link to="/DevJourney">Home</Link>,
    key: 'home',
    icon: <HomeOutlined />
  },
  {
    label: <Link to="/DevJourney/apifilm">API films</Link>,
    key: 'films',
    icon: <PictureOutlined />
  },
  {
    label: <Link to="/DevJourney/contact">AboutMe</Link>,
    key: 'aboutme',
    icon: <UserOutlined />,
    style: { marginLeft: 'auto' } 
  }
];
const NavBar = () => {
  const location = useLocation();
  const [current, setCurrent] = useState('home');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/DevJourney') {
      setCurrent('home');
    } else if (path === '/DevJourney/apifilm') {
      setCurrent('films');
    } else if (path === '/DevJourney/contact') {
      setCurrent('aboutme');
    }
  }, [location.pathname]);
  return <Menu selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default NavBar;