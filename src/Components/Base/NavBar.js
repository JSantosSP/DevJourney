import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PictureOutlined, HomeOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    label: <Link to="/DevJourney/build">Home</Link>,
    key: 'home',
    icon: <HomeOutlined />
  },
  {
    label: <Link to="/DevJourney/build/apifilm">API films</Link>,
    key: 'films',
    icon: <PictureOutlined />
  },
  {
    label: <Link to="/DevJourney/build/rankapp">Rank App</Link>,
    key: 'rankapp',
    icon: <MobileOutlined />
  },
  {
    label: <Link to="/DevJourney/build/contact">AboutMe</Link>,
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
    if (path === '/DevJourney/build') {
      setCurrent('home');
    } else if (path === '/DevJourney/build/apifilm') {
      setCurrent('films');
    } else if (path === '/DevJourney/build/contact') {
      setCurrent('aboutme');
    }
    else if (path === '/DevJourney/build/rankapp') {
      setCurrent('rankapp');
    }
  }, [location.pathname]);
  return <Menu selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default NavBar;