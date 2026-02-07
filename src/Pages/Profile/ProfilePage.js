import React from 'react';
import { Row, Col, Typography, Avatar, Divider } from 'antd';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import Base from '../../Components/Base/Base';
import { useLanguage } from '../../context/LanguageContext';
import './ProfilePage.css';

const { Title, Paragraph } = Typography;

const ProfilePage = () => {
  const { t } = useLanguage();

  return (
    <Base>
      <div className="Profile-container">
        <Row justify="center" style={{ marginBottom: '20px' }}>
          <Col>
            <Avatar size={150} src="/DevJourney/build/joseSantosBusto.jpeg" />
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <Title level={2}>{t('profile.title')}</Title>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={16}>
            <Paragraph>
              {t('profile.description')}
            </Paragraph>
          </Col>
        </Row>
        <Divider />
        <Row justify="center" className="social-links">
          <Col>
            <a href="https://github.com/JSantosSP" target="_blank" rel="noopener noreferrer">
              <GithubOutlined className="large-icon"/>
            </a>
            {' | '}
            <a href="https://linkedin.com/in/jose-santos-palomera" target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined className="large-icon"/>
            </a>
          </Col>
        </Row>
      </div>
    </Base>
  );
};

export default ProfilePage;
