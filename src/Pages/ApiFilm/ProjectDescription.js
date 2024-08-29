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
          <Title level={1}>Hangman Movie Game</Title>
        </Header>
        <Content className="project-content">
          <Card className="project-card">
            <Title level={2}>Project Description</Title>
            <Paragraph>
              This project is a web-based game where users try to guess movie titles using a Hangman-style game. The application consists of a frontend built with React and a backend developed using Python with FastAPI. The backend interacts with a MySQL database to fetch and store movie data. Below is a detailed explanation of the various components and their functionalities.
            </Paragraph>
            <Divider />
            <Title level={3}>Frontend: React Components</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Base Component" className="project-card">
                  <Text>This is a higher-order component that serves as the layout for the entire application. It includes common elements such as headers, footers, or navigation bars that are consistent across different pages.</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="GameFilm Component" className="project-card">
                  <Text>This component fetches movie data from the backend and displays a Hangman game where the user tries to guess the movie title. It handles the loading state, error state, and the main game logic.</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="HangmanGame Component" className="project-card">
                  <Text>This component manages the game logic of the Hangman game. It tracks the guessed letters, the number of errors, and the current state of the game (win/lose). It includes functionality for the user to guess letters or the entire word.</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Hangman Component" className="project-card">
                  <Text>This component visualizes the Hangman figure based on the number of incorrect guesses. If the game is won, it shows an image of the movie poster; if not, it shows the Hangman SVG.</Text>
                </Card>
              </Col>
            </Row>
            <Divider />
            <Title level={3}>Backend: FastAPI and MySQL</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="FastAPI" className="project-card">
                  <Text>The backend API is built with FastAPI, a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints. FastAPI is used to handle HTTP requests, interact with the MySQL database, and return JSON responses.</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="MySQL Database" className="project-card">
                  <Text>The database stores information about movies, including titles, overviews, genres, and posters. It is used to fetch the data required by the GameFilm component.</Text>
                </Card>
              </Col>
              <Col span={24}>
                <Card title="API Endpoints" className="project-card">
                  <Text><b>GET /movies:</b> This endpoint retrieves a random movie from the database.</Text><br />
                  <Text><b>POST /moviesList:</b> This endpoint accepts a movie title and returns a list of similar movies or additional movies for the guessing game.</Text>
                </Card>
              </Col>
            </Row>
            <Divider />
            <Title level={3}>How It Works</Title>
            <Paragraph>
              <b>Data Fetching:</b> When the GameFilm component mounts, it makes a request to the /movies endpoint to fetch a random movie. It then makes a POST request to the /moviesList endpoint with the movie title to get a list of related movies.
            </Paragraph>
            <Paragraph>
              <b>Game Logic:</b> The HangmanGame component initializes the game state, including the word to guess and the list of guessed letters. The user interacts with the game by clicking on letters or guessing the entire word. The component updates the state based on user input and checks for win/loss conditions.
            </Paragraph>
            <Paragraph>
              <b>Visual Feedback:</b> The Hangman component renders the Hangman figure dynamically based on the number of incorrect guesses. If the user wins, the movie poster is displayed; if the user loses, the full Hangman figure is shown, and the game is over.
            </Paragraph>
            <Paragraph>
              <b>Reload Functionality:</b> A reload button allows the user to start a new game with a new movie title, refreshing the component state and fetching new data from the API.
            </Paragraph>
          </Card>
        </Content>
        <Footer className="project-footer">Hangman Movie Game ©2024 Created by JSantosSP <a href='https://github.com/JSantosSP/API-Film'>Github</a></Footer>
      </Layout>
    </Base>
  );
};

export default ProjectDescription;
