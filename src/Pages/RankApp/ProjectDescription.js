import React from 'react';
import { Layout, Typography, Divider, Row, Col, Card } from 'antd';
import Base from '../../Components/Base/Base';
import './ProjectDescription.css';

const { Title, Paragraph, Text } = Typography;
const { Header, Content, Footer } = Layout;

const ProjectDescription = () => {
  return (
    <Base>
      <Layout className="project-layout">
        <Header className="project-header">
          <Title level={1}>Ranking Management</Title>
        </Header>
        <Content className="project-content">
          <Card className="project-card">
            <Title level={2}>Project Description</Title>
            <Paragraph>
              This mobile app is designed to streamline the management of activities and rankings, offering a user-friendly platform for creating, viewing, and interacting with various activities and their associated rankings. Built with React Native, the app features a seamless and intuitive user interface for both creating new activities and managing rankings, providing a powerful tool for users to engage with and track their achievements. The backend, developed using Node.js and Express, ensures robust and scalable data management. Below is a detailed explanation of the various components and their functionalities.
            </Paragraph>
            <Divider />
            <Title level={3}>Frontend: React Native Components</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="CreateActivityScreen" className="project-card">
                  <Text>This screen allows users to create new activities. It includes form fields for the activity name, description, and score, with validation to ensure all fields are filled out before submission. Users can adjust the score using a slider and submit the form to save the activity.</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="LoginScreen" className="project-card">
                  <Text>The login screen facilitates user authentication by checking if a nickname already exists. If the user does not exist, a new user is created. The nickname is then used to navigate to the rank list screen.</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="CreateRankListScreen" className="project-card">
                  <Text>This screen allows users to create a new ranking list. Users can input details such as the ranking name, description, start and end dates, and reward. The dates are selected using a date picker, and the information is submitted to the backend for storage.</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="RankListScreen" className="project-card">
                  <Text>The rank list screen displays a list of rankings associated with the user. It fetches the data from the backend and shows the ranking name and score. Users can tap on a ranking to view its details or create a new ranking using a floating action button.</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="ListActivities" className="project-card">
                  <Text>This component provides a searchable dropdown list of activities based on the user's input. It filters activities from the backend based on the search query and allows users to select an activity from the list.</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Repository" className='project-card'>
                  <Text>You can download the RankApp APK from our GitHub repository. Visit the <a href='https://github.com/JSantosSP/RankApp-frontend/releases'>Releases</a> section and get the APK for version 1.0.0.</Text>
                </Card>
              </Col>
            </Row>
            <Divider />
            <Title level={3}>Backend: Node.js and Express</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Express.js" className="project-card">
                  <Text>The backend API is built with Express.js, a minimalist web framework for Node.js. It handles HTTP requests, interacts with the database, and provides endpoints for managing activities and rankings.</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Database" className="project-card">
                  <Text>The database stores user data, activities, and ranking information. It is used to retrieve and manage data required by the frontend components.</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Repository" className='project-card'>
                  <Text><a href='https://github.com/aterroon/RankApp-backend'>RankApp-backend</a></Text>
                </Card>
              </Col>
            </Row>
            <Divider />
            <Title level={3}>How It Works</Title>
            <Paragraph>
              <b>Data Fetching:</b> When a screen component mounts or the user performs an action, it makes a request to the appropriate backend endpoint to fetch or submit data. For example, the `CreateActivityScreen` posts a new activity to the backend, while `RankListScreen` retrieves the user's ranking data.
            </Paragraph>
            <Paragraph>
              <b>Form Handling:</b> Screens like `CreateActivityScreen` and `CreateRankListScreen` handle user input through forms. They validate input fields, provide feedback, and submit data to the backend for storage.
            </Paragraph>
            <Paragraph>
              <b>Navigation:</b> The app uses React Navigation to transition between screens. For example, after creating a new ranking list, users are navigated back to the rank list screen where the new ranking appears.
            </Paragraph>
            <Paragraph>
              <b>Interactive Components:</b> Components like `ListActivities` provide real-time search and selection functionality. They filter and display results based on user input, enhancing the user experience with responsive and dynamic interactions.
            </Paragraph>
          </Card>
        </Content>
        <Footer className="project-footer">Activity and Ranking Management App ©2024 </Footer>
      </Layout>
    </Base>
  );
};

export default ProjectDescription;
