import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, UserOutlined, EuroOutlined, GlobalOutlined, DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { useLanguage } from '../../context/LanguageContext';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const [current, setCurrent] = useState('home');
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/DevJourney/build') {
      setCurrent('home');
    } else if (path === '/DevJourney/build/contact') {
      setCurrent('aboutme');
    } else if (path === '/DevJourney/build/gestorcrypto') {
      setCurrent('gestorcrypto');
    }
  }, [location.pathname]);

  const languageMenuItems = [
    { key: 'es', label: 'Español', onClick: () => setLanguage('es') },
    { key: 'en', label: 'English', onClick: () => setLanguage('en') },
  ];

  const languageSelector = (
    <Dropdown
      menu={{ items: languageMenuItems, selectedKeys: [language] }}
      trigger={['click']}
      placement="bottomRight"
      className="nav-bar-lang-dropdown"
    >
      <span className="nav-bar-lang-trigger" onClick={(e) => e.stopPropagation()}>
        <GlobalOutlined />
        <span className="nav-bar-lang-label">{language === 'es' ? 'ES' : 'EN'}</span>
        <DownOutlined className="nav-bar-lang-chevron" />
      </span>
    </Dropdown>
  );

  const items = [
    {
      label: <Link to="/DevJourney/build">{t('nav.home')}</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/DevJourney/build/gestorcrypto">{t('nav.gestorCrypto')}</Link>,
      key: 'gestorcrypto',
      icon: <EuroOutlined />,
    },
    {
      label: <Link to="/DevJourney/build/contact">{t('nav.aboutMe')}</Link>,
      key: 'aboutme',
      icon: <UserOutlined />,
      style: { marginLeft: 'auto' },
    },
    {
      key: 'lang',
      label: languageSelector,
      className: 'nav-bar-lang-item',
    },
  ];

  return (
    <div className="nav-bar-wrapper">
      <Menu
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="nav-bar-menu"
      />
    </div>
  );
};

export default NavBar;
