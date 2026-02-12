import React from 'react';
import { Layout, Typography, Divider, Card } from 'antd';
import Base from '../../Components/Base/Base';
import MermaidDiagram from './MermaidDiagram';
import { useLanguage } from '../../context/LanguageContext';
import './ProjectDescription.css';
import { yearActual } from '../../Utils/constants';

const { Title, Paragraph, Text } = Typography;
const { Header, Content, Footer } = Layout;

// Diagramas Mermaid específicos de DuoChallenge

const diagramDomain = `classDiagram
    class User {
      +ObjectId id
      +string name
      +string email
      +string passwordHash
      +string role
      +number totalSetsCompleted
    }

    class Category {
      +ObjectId id
      +string name
      +string description
    }

    class Variable {
      +ObjectId id
      +string name
      +string type
    }

    class UserData {
      +ObjectId id
      +string question
      +string value
      +string type
      +string difficulty
      +string hint
      +ObjectId categoryId
      +ObjectId userId
    }

    class GameSet {
      +ObjectId id
      +ObjectId userId
      +string seed
      +string status
      +Date createdAt
      +ObjectId prizeId
    }

    class Level {
      +ObjectId id
      +ObjectId gameSetId
      +ObjectId userDataId
      +string type
      +string question
      +string answerHash
      +string salt
    }

    class PrizeTemplate {
      +ObjectId id
      +string title
      +string description
      +number weight
    }

    class Prize {
      +ObjectId id
      +ObjectId userId
      +ObjectId templateId
      +bool used
      +Date usedAt
    }

    class GameShare {
      +ObjectId id
      +string code
      +ObjectId creatorId
      +number maxUses
      +Date expiresAt
    }

    User "1" --> "many" UserData
    Category "1" --> "many" UserData
    User "1" --> "many" GameSet
    GameSet "1" --> "many" Level
    User "1" --> "many" Prize
    PrizeTemplate "1" --> "many" Prize
    User "1" --> "many" GameShare`;

const diagramC4Context = `flowchart LR
    userPlayer[Usuario jugador\nApp móvil]
    userAdmin[Usuario admin\nBackoffice web]

    subgraph DuoChallenge[Sistema DuoChallenge]
      backend[(API Backend\nNode.js/Express)]
    end

    db[(MongoDB)]

    userPlayer -->|HTTPS/JSON| backend
    userAdmin -->|HTTPS/JSON| backend
    backend -->|driver Mongoose| db`;

const diagramC4Containers = `flowchart TB
    subgraph ClientSide[Frontends]
      mobile[App móvil\nReact Native + Expo]
      backoffice[Backoffice web\nReact + Vite]
    end

    subgraph ServerSide[Backend]
      api[(API REST\nNode.js + Express)]
    end

    db[(MongoDB\nMongoose)]

    mobile -->|Axios / HTTPS| api
    backoffice -->|Axios / HTTPS| api
    api -->|ODM Mongoose| db`;

const diagramC4Components = `flowchart LR
    subgraph API_Backend[API Backend Node.js]
      routes[Routes\nExpress Router]
      controllers[Controllers\nauth, game, prize, share...]
      services[Services\nGameSetService, LevelService, PrizeService]
      models[Models\nMongoose Schemas]
      middlewares[Middlewares\nauth, upload]
      utils[Utils\nhash, seed]
    end

    db[(MongoDB)]

    routes --> controllers
    controllers --> services
    services --> models
    controllers --> middlewares
    utils --> services
    models --> db`;

const diagramER = `erDiagram
    USER ||--o{ USERDATA : has
    USER ||--o{ GAMESET : plays
    GAMESET ||--o{ LEVEL : contains
    USER ||--o{ PRIZE : owns
    PRIZETEMPLATE ||--o{ PRIZE : instantiates
    CATEGORY ||--o{ USERDATA : classifies
    USER ||--o{ GAMESHARE : creates

    USER {
      ObjectId id
      string email
      string name
      string passwordHash
      string role
    }

    USERDATA {
      ObjectId id
      ObjectId userId
      ObjectId categoryId
      string question
      string value
      string type
    }

    GAMESET {
      ObjectId id
      ObjectId userId
      string seed
      string status
      ObjectId prizeId
    }

    LEVEL {
      ObjectId id
      ObjectId gameSetId
      ObjectId userDataId
      string type
      string answerHash
      string salt
    }

    PRIZETEMPLATE {
      ObjectId id
      string title
      string description
      int weight
    }

    PRIZE {
      ObjectId id
      ObjectId userId
      ObjectId templateId
      bool used
    }

    GAMESHARE {
      ObjectId id
      ObjectId creatorId
      string code
      int maxUses
      datetime expiresAt
    }`;

const diagramFlowGameSet = `sequenceDiagram
    participant U as Usuario (App móvil)
    participant M as Mobile App
    participant A as API Backend
    participant S as GameSetService
    participant DB as MongoDB

    U->>M: Clic en "Crear nuevo juego"
    M->>A: POST /gamesets
    A->>S: createGameSet(userId)
    S->>DB: find UserData by userId
    S->>S: generar seed + seleccionar N UserData
    S->>DB: crear GameSet + Levels
    A-->>M: 201 GameSet + niveles

    loop Por cada nivel
      U->>M: Introduce respuesta
      M->>A: POST /levels/{id}/answer
      A->>S: verifyAnswer(levelId, answer)
      S->>DB: obtener Level (hash + salt)
      S->>S: hash(answer + salt) == storedHash?
      S-->>A: resultado (correcto/incorrecto)
      A-->>M: resultado + estado GameSet
    end

    alt Último nivel correcto
      A->>S: assignPrize(gameSetId)
      S->>DB: seleccionar Prize ponderado (weight)
      S->>DB: marcar GameSet como completed
      A-->>M: GameSet completado + premio
    end`;

const diagramFlowShare = `flowchart TD
    A[Usuario A crea juego] --> B[Backend genera GameSet]
    B --> C[Usuario A solicita compartir]
    C --> D[Backend crea GameShare\ncódigo + maxUses + \nexpiresAt]
    D --> E[Usuario A comparte\n código con B]

    E --> F[Usuario B introduce\n código en app]
    F --> G[Backend valida código\nno expirado,\n usos disponibles]
    G --> H[Si válido, asocia B al\n GameSet o crea \ncopia vinculada]
    H --> I[Usuario B juega \nel GameSet compartido]`;

const DuoChallengeDoc = () => {
  const { t } = useLanguage();
  
  return (
    <Base>
      <Layout className="project-layout">
        <Header className="project-header">
          <Title level={1} className="project-page-title">{t('duochallenge.pageTitle')}</Title>
          <Paragraph type="secondary" className="project-page-subtitle">
            {t('duochallenge.pageSubtitle')}
          </Paragraph>
        </Header>
        <Content className="project-content">
          <Card className="project-card project-card-main">
            {/* 1. Descripción del proyecto */}
            <Title level={2}>{t('duochallenge.section1Title')}</Title>
            <Title level={4}>{t('duochallenge.whatProblem')}</Title>
            <Paragraph>{t('duochallenge.whatProblemText')}</Paragraph>
            <Title level={4}>{t('duochallenge.systemType')}</Title>
            <Paragraph>{t('duochallenge.systemTypeText')}</Paragraph>
            <Title level={4}>{t('duochallenge.targetAudience')}</Title>
            <Paragraph>{t('duochallenge.targetAudienceText')}</Paragraph>
            <Title level={4}>{t('duochallenge.useContext')}</Title>
            <Paragraph>{t('duochallenge.useContextText')}</Paragraph>

            <Divider />

            {/* 2. Requisitos */}
            <Title level={2}>{t('duochallenge.section2Title')}</Title>
            <Title level={4}>{t('duochallenge.funcReqs')}</Title>
            <ul>
              <li>{t('duochallenge.reqUserMgmt')}</li>
              <li>{t('duochallenge.reqUserData')}</li>
              <li>{t('duochallenge.reqGameGen')}</li>
              <li>{t('duochallenge.reqLevelRes')}</li>
              <li>{t('duochallenge.reqPrizes')}</li>
              <li>{t('duochallenge.reqShare')}</li>
              <li>{t('duochallenge.reqBackoffice')}</li>
            </ul>

            <Title level={4}>{t('duochallenge.nonFuncReqs')}</Title>
            <ul>
              <li>{t('duochallenge.nfScalability')}</li>
              <li>{t('duochallenge.nfSecurity')}</li>
              <li>{t('duochallenge.nfPerformance')}</li>
              <li>{t('duochallenge.nfAvailability')}</li>
              <li>{t('duochallenge.nfMaintainability')}</li>
              <li>{t('duochallenge.nfObservability')}</li>
            </ul>

            <Divider />

            {/* 3. Modelado del dominio */}
            <Title level={2}>{t('duochallenge.section3Title')}</Title>
            <Paragraph>
              <strong>{t('duochallenge.entitiesLabel')}</strong> {t('duochallenge.entitiesText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('duochallenge.relationsLabel')}</strong> {t('duochallenge.relationsText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('duochallenge.responsibilitiesLabel')}</strong> {t('duochallenge.responsibilitiesText')}
            </Paragraph>
            <MermaidDiagram chart={diagramDomain} title={t('duochallenge.diagramDomainTitle')} />

            <Divider />

            {/* 4. Arquitectura C4 */}
            <Title level={2}>{t('duochallenge.section4Title')}</Title>
            <Title level={4}>{t('duochallenge.level1Title')}</Title>
            <Paragraph>{t('duochallenge.level1Text')}</Paragraph>
            <MermaidDiagram chart={diagramC4Context} />

            <Title level={4}>{t('duochallenge.level2Title')}</Title>
            <Paragraph>{t('duochallenge.level2Text')}</Paragraph>
            <MermaidDiagram chart={diagramC4Containers} />

            <Title level={4}>{t('duochallenge.level3Title')}</Title>
            <Paragraph>{t('duochallenge.level3Text')}</Paragraph>
            <MermaidDiagram chart={diagramC4Components} />

            <Divider />

            {/* 5. Diseño de base de datos */}
            <Title level={2}>{t('duochallenge.section5Title')}</Title>
            <Paragraph>
              <strong>{t('duochallenge.dbType')}</strong> {t('duochallenge.dbTypeText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('duochallenge.dbJustification')}</strong> {t('duochallenge.dbJustificationText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('duochallenge.dbEntities')}</strong> {t('duochallenge.dbEntitiesText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('duochallenge.dbNorm')}</strong> {t('duochallenge.dbNormText')}
            </Paragraph>
            <MermaidDiagram chart={diagramER} title={t('duochallenge.diagramERTitle')} />

            <Divider />

            {/* 6. Decisiones arquitectónicas */}
            <Title level={2}>{t('duochallenge.section6Title')}</Title>

            <Card size="small" title={t('duochallenge.adr1Title')} style={{ marginBottom: 16 }}>
              <Paragraph><Text strong>{t('duochallenge.adrDec')}</Text> {t('duochallenge.adr1DecText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrCtx')}</Text> {t('duochallenge.adr1CtxText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrAlt')}</Text> {t('duochallenge.adr1AltText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrMot')}</Text> {t('duochallenge.adr1MotText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrCons')}</Text> {t('duochallenge.adr1ConsText')}</Paragraph>
            </Card>

            <Card size="small" title={t('duochallenge.adr2Title')} style={{ marginBottom: 16 }}>
              <Paragraph><Text strong>{t('duochallenge.adrDec')}</Text> {t('duochallenge.adr2DecText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrCtx')}</Text> {t('duochallenge.adr2CtxText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrAlt')}</Text> {t('duochallenge.adr2AltText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrMot')}</Text> {t('duochallenge.adr2MotText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrCons')}</Text> {t('duochallenge.adr2ConsText')}</Paragraph>
            </Card>

            <Card size="small" title={t('duochallenge.adr3Title')} style={{ marginBottom: 16 }}>
              <Paragraph><Text strong>{t('duochallenge.adrDec')}</Text> {t('duochallenge.adr3DecText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrCtx')}</Text> {t('duochallenge.adr3CtxText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrAlt')}</Text> {t('duochallenge.adr3AltText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrMot')}</Text> {t('duochallenge.adr3MotText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrCons')}</Text> {t('duochallenge.adr3ConsText')}</Paragraph>
            </Card>

            <Card size="small" title={t('duochallenge.adr4Title')} style={{ marginBottom: 16 }}>
              <Paragraph><Text strong>{t('duochallenge.adrDec')}</Text> {t('duochallenge.adr4DecText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrCtx')}</Text> {t('duochallenge.adr4CtxText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrAlt')}</Text> {t('duochallenge.adr4AltText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrMot')}</Text> {t('duochallenge.adr4MotText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrCons')}</Text> {t('duochallenge.adr4ConsText')}</Paragraph>
            </Card>

            <Card size="small" title={t('duochallenge.adr5Title')}>
              <Paragraph><Text strong>{t('duochallenge.adrDec')}</Text> {t('duochallenge.adr5DecText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrCtx')}</Text> {t('duochallenge.adr5CtxText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrAlt')}</Text> {t('duochallenge.adr5AltText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrMot')}</Text> {t('duochallenge.adr5MotText')}</Paragraph>
              <Paragraph><Text strong>{t('duochallenge.adrCons')}</Text> {t('duochallenge.adr5ConsText')}</Paragraph>
            </Card>

            <Divider />

            {/* 7. Flujos de procesos clave */}
            <Title level={2}>{t('duochallenge.section7Title')}</Title>
            <Title level={4}>{t('duochallenge.flowGameSetTitle')}</Title>
            <MermaidDiagram chart={diagramFlowGameSet} />
            <Title level={4}>{t('duochallenge.flowShareTitle')}</Title>
            <MermaidDiagram chart={diagramFlowShare} />

            <Divider />

            {/* 8. Estrategia técnica */}
            <Title level={2}>{t('duochallenge.section8Title')}</Title>
            <ul>
              <li>{t('duochallenge.stratDeploy')}</li>
              <li>{t('duochallenge.stratScale')}</li>
              <li>{t('duochallenge.stratCI')}</li>
              <li>{t('duochallenge.stratTesting')}</li>
              <li>{t('duochallenge.stratSecurity')}</li>
              <li>{t('duochallenge.stratObservability')}</li>
            </ul>

            <Divider />

            {/* 9. Posibles mejoras futuras */}
            <Title level={2}>{t('duochallenge.section9Title')}</Title>
            <ul>
              <li>{t('duochallenge.future1')}</li>
              <li>{t('duochallenge.future2')}</li>
              <li>{t('duochallenge.future3')}</li>
              <li>{t('duochallenge.future4')}</li>
              <li>{t('duochallenge.future5')}</li>
            </ul>
          </Card>
        </Content>
        <Footer className="project-footer">
          {t('duochallenge.footer', { year: yearActual })}
        </Footer>
      </Layout>
    </Base>
  );
};

export default DuoChallengeDoc;

