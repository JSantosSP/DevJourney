import React from 'react';
import { Row, Col, Typography, Avatar, Divider } from 'antd';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import Base from '../../Components/Base/Base';
import './ProfilePage.css'; 

const { Title, Paragraph } = Typography;

const ProfilePage = () => {
    return (
        <Base>
            <div className="Profile-container">
                <Row justify="center" style={{ marginBottom: '20px' }}>
                    <Col>
                        <Avatar size={150} src="/ruta/a/tu/imagen.jpg" />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <Title level={2}>Profile</Title>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={16}>
                        <Paragraph>
                        I'm a computer engineering student looking for new challenges and experiences. If you have any opportunities available or would like to discuss potential collaborations, feel free to reach out. I'm eager to learn and grow in the field!
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
