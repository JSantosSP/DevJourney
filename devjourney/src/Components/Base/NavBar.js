import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { PictureOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    label: <Link to="/">Home</Link>,
    key: 'home',
    icon: <HomeOutlined />
  },
  {
    label: 'API films',
    key: 'films',
    icon: <PictureOutlined />
  }
];
const NavBar = () => {
  const [current, setCurrent] = useState('home');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default NavBar;