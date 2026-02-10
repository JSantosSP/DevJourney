import React from 'react';
import { Layout, Typography, Divider, Card, Table } from 'antd';
import Base from '../../Components/Base/Base';
import MermaidDiagram from './MermaidDiagram';
import { useLanguage } from '../../context/LanguageContext';
import './ProjectDescription.css';
import { yearActual } from '../../Utils/constants';

const { Title, Paragraph, Text } = Typography;
const { Header, Content, Footer } = Layout;

// Diagramas Mermaid específicos de pocketMind
const diagramDomain = `classDiagram
    class Account {
      +int id
      +string name
      +float balance
      +string pais
      +string locale
      +string currency
      +Date createdAt
    }

    class Category {
      +int id
      +string name
    }

    class Transaction {
      +int id
      +int accountId
      +bool type
      +float amount
      +int categoryId
      +string description
      +Date createdAt
    }

    class SavingGroup {
      +int id
      +string name
      +int parentId
      +string color
      +float targetAmount
      +float savedAmount
      +Date createdAt
    }

    class SavingTransaction {
      +int id
      +int savingGroupId
      +float amount
      +bool type
      +Date createdAt
    }

    Account "1" --> "many" Transaction : tiene
    Category "1" --> "many" Transaction : clasifica
    Account "1" --> "many" SavingGroup : agrupa
    SavingGroup "1" --> "many" SavingTransaction : registra`;

const diagramC4Context = `flowchart LR
    user["Usuario"]
    system["pocketMind"]

    user -->|"Usa la app"| system`;

const diagramC4Containers = `flowchart TB
    user["Usuario"]

    subgraph Mobile["pocketMind"]
        app["App RN"]
        domain["Dominio JS"]
        db["SQLite"]
    end

    user -->|"Interacción"| app
    app -->|"Casos de uso"| domain
    domain -->|"Persistencia"| db`;

const diagramC4Components = `flowchart TB
    subgraph Frontend["Frontend"]
        uiScreens["Screens y navegación"]
    end

    subgraph Domain["Capa de dominio (JS)"]
        controllers["Controladores"]
        models["Modelos de dominio"]
    end

    subgraph Data["SQLite DB"]
        dbService["Servicio BBDD"]
    end

    uiScreens -->|invoca casos de uso| controllers
    controllers -->|usa entidades| models
    controllers -->|opera mediante| dbService`;

const diagramER = `erDiagram
    ACCOUNTS {
      int id PK
      string name
      float balance
      string pais
      string locale
      string currency
      datetime created_at
    }

    CATEGORIES {
      int id PK
      string name
    }

    TRANSACTIONS {
      int id PK
      int account_id FK
      boolean type
      float amount
      int category_id FK
      string description
      datetime created_at
    }

    SAVING_GROUPS {
      int id PK
      string name
      int parent_id FK
      string color
      float target_amount
      float saved_amount
      datetime created_at
    }

    SAVING_TRANSACTIONS {
      int id PK
      int saving_group_id FK
      float amount
      boolean type
      datetime created_at
    }

    ACCOUNTS ||--o{ TRANSACTIONS : tiene
    CATEGORIES ||--o{ TRANSACTIONS : clasifica
    ACCOUNTS ||--o{ SAVING_GROUPS : agrupa
    SAVING_GROUPS ||--o{ SAVING_TRANSACTIONS : registra`;

const diagramFlowTransaction = `sequenceDiagram
    participant U as Usuario
    participant S as TransactionScreen
    participant C as accountController
    participant D as database.js
    participant DB as SQLite

    U->>S: Introduce datos de transacción
    S->>C: handleCreateTransaction(accountId, type, amount, categoryId, description)
    C->>D: updateAccountBalance(accountId, type, amount)
    D->>DB: UPDATE accounts SET balance = balance +/- amount
    DB-->>D: OK
    C->>D: createTransaction(...)
    D->>DB: INSERT INTO transactions
    DB-->>D: OK
    D-->>C: éxito
    C-->>S: true
    S-->>U: Muestra saldo actualizado`;

const diagramFlowSaving = `flowchart TD
    A["Crear grupo de ahorro"] --> B["handleCreateSavingGroup"]
    B --> C["INSERT INTO saving_groups"]
    C --> D["Grupo inicializado<br/>saved_amount = 0"]
    D --> E["Registrar transacción<br/> de ahorro"]
    E --> F["handleCreateSavingTransaction"]
    F --> G["INSERT INTO<br/> saving_transactions"]
    G --> H["UPDATE <br/>saving_groups.saved_amount"]`;

const PocketMindDoc = () => {
  const { t } = useLanguage();

  const nonFuncColumns = [
    { title: t('pocket.tableArea'), dataIndex: 'area', key: 'area', render: (val) => <Text strong>{val}</Text> },
    { title: t('pocket.tableDecision'), dataIndex: 'decision', key: 'decision' },
  ];

  const nonFuncData = [
    { key: '1', area: t('pocket.nfAreaScalability'), decision: t('pocket.nfScalability') },
    { key: '2', area: t('pocket.nfAreaSecurity'), decision: t('pocket.nfSecurity') },
    { key: '3', area: t('pocket.nfAreaPerformance'), decision: t('pocket.nfPerformance') },
    { key: '4', area: t('pocket.nfAreaAvailability'), decision: t('pocket.nfAvailability') },
    { key: '5', area: t('pocket.nfAreaMaintainability'), decision: t('pocket.nfMaintainability') },
    { key: '6', area: t('pocket.nfAreaObservability'), decision: t('pocket.nfObservability') },
  ];

  return (
    <Base>
      <Layout className="project-layout">
        <Header className="project-header">
          <Title level={1} className="project-page-title">{t('pocket.pageTitle')}</Title>
          <Paragraph type="secondary" className="project-page-subtitle">
            {t('pocket.pageSubtitle')}
          </Paragraph>
        </Header>
        <Content className="project-content">
          <Card className="project-card project-card-main">
            {/* 1. Descripción */}
            <Title level={2}>{t('pocket.section1Title')}</Title>
            <Title level={4}>{t('pocket.whatProblem')}</Title>
            <Paragraph>{t('pocket.whatProblemText')}</Paragraph>
            <Title level={4}>{t('pocket.systemType')}</Title>
            <Paragraph>{t('pocket.systemTypeText')}</Paragraph>
            <Title level={4}>{t('pocket.targetAudience')}</Title>
            <Paragraph>{t('pocket.targetAudienceText')}</Paragraph>
            <Title level={4}>{t('pocket.useContext')}</Title>
            <Paragraph>{t('pocket.useContextText')}</Paragraph>

            <Divider />

            {/* 2. Requisitos */}
            <Title level={2}>{t('pocket.section2Title')}</Title>
            <Title level={4}>{t('pocket.funcReqs')}</Title>
            <ul>
              {[
                'pocket.reqAccounts',
                'pocket.reqTransactions',
                'pocket.reqCategories',
                'pocket.reqSavingGroups',
                'pocket.reqSavingTx',
                'pocket.reqFreeBalance',
              ].map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
            <Title level={4}>{t('pocket.nonFuncReqs')}</Title>
            <Table columns={nonFuncColumns} dataSource={nonFuncData} pagination={false} size="small" />

            <Divider />

            {/* 3. Dominio */}
            <Title level={2}>{t('pocket.section3Title')}</Title>
            <Paragraph>
              <strong>{t('pocket.entitiesLabel')}</strong> {t('pocket.entitiesText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('pocket.relationsLabel')}</strong> {t('pocket.relationsText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('pocket.responsibilitiesLabel')}</strong> {t('pocket.responsibilitiesText')}
            </Paragraph>
            <MermaidDiagram chart={diagramDomain} title={t('pocket.diagramDomainTitle')} />

            <Divider />

            {/* 4. Arquitectura C4 */}
            <Title level={2}>{t('pocket.section4Title')}</Title>
            <Title level={4}>{t('pocket.level1Title')}</Title>
            <MermaidDiagram chart={diagramC4Context} />
            <Title level={4}>{t('pocket.level2Title')}</Title>
            <MermaidDiagram chart={diagramC4Containers} />
            <Title level={4}>{t('pocket.level3Title')}</Title>
            <MermaidDiagram chart={diagramC4Components} />

            <Divider />

            {/* 5. Base de datos */}
            <Title level={2}>{t('pocket.section5Title')}</Title>
            <Paragraph>
              <strong>{t('pocket.dbType')}</strong> {t('pocket.dbTypeText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('pocket.dbJustification')}</strong> {t('pocket.dbJustificationText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('pocket.dbEntities')}</strong> {t('pocket.dbEntitiesText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('pocket.dbRelations')}</strong> {t('pocket.dbRelationsText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('pocket.dbNorm')}</strong> {t('pocket.dbNormText')}
            </Paragraph>
            <MermaidDiagram chart={diagramER} title={t('pocket.diagramERTitle')} />

            <Divider />

            {/* 6. ADR */}
            <Title level={2}>{t('pocket.section6Title')}</Title>
            <Card size="small" title={t('pocket.adr1Title')} style={{ marginBottom: 16 }}>
              <Paragraph><strong>{t('pocket.adrDec')}</strong> {t('pocket.adr1DecText')}</Paragraph>
              <Paragraph><strong>{t('pocket.adrCtx')}</strong> {t('pocket.adr1CtxText')}</Paragraph>
              <Paragraph><strong>{t('pocket.adrAlt')}</strong> {t('pocket.adr1AltText')}</Paragraph>
              <Paragraph><strong>{t('pocket.adrMot')}</strong> {t('pocket.adr1MotText')}</Paragraph>
              <Paragraph><strong>{t('pocket.adrCons')}</strong> {t('pocket.adr1ConsText')}</Paragraph>
            </Card>
            <Card size="small" title={t('pocket.adr2Title')} style={{ marginBottom: 16 }}>
              <Paragraph><strong>{t('pocket.adrDec')}</strong> {t('pocket.adr2DecText')}</Paragraph>
              <Paragraph><strong>{t('pocket.adrCtx')}</strong> {t('pocket.adr2CtxText')}</Paragraph>
              <Paragraph><strong>{t('pocket.adrAlt')}</strong> {t('pocket.adr2AltText')}</Paragraph>
              <Paragraph><strong>{t('pocket.adrMot')}</strong> {t('pocket.adr2MotText')}</Paragraph>
              <Paragraph><strong>{t('pocket.adrCons')}</strong> {t('pocket.adr2ConsText')}</Paragraph>
            </Card>
            <Card size="small" title={t('pocket.adr3Title')}>
              <Paragraph><strong>{t('pocket.adrDec')}</strong> {t('pocket.adr3DecText')}</Paragraph>
              <Paragraph><strong>{t('pocket.adrCtx')}</strong> {t('pocket.adr3CtxText')}</Paragraph>
              <Paragraph><strong>{t('pocket.adrAlt')}</strong> {t('pocket.adr3AltText')}</Paragraph>
              <Paragraph><strong>{t('pocket.adrMot')}</strong> {t('pocket.adr3MotText')}</Paragraph>
              <Paragraph><strong>{t('pocket.adrCons')}</strong> {t('pocket.adr3ConsText')}</Paragraph>
            </Card>

            <Divider />

            {/* 7. Flujos clave */}
            <Title level={2}>{t('pocket.section7Title')}</Title>
            <Title level={4}>{t('pocket.flowTxTitle')}</Title>
            <MermaidDiagram chart={diagramFlowTransaction} />
            <Title level={4}>{t('pocket.flowSavingTitle')}</Title>
            <MermaidDiagram chart={diagramFlowSaving} />

            <Divider />

            {/* 8. Estrategia técnica */}
            <Title level={2}>{t('pocket.section8Title')}</Title>
            <ul>
              <li>{t('pocket.stratDeploy')}</li>
              <li>{t('pocket.stratScale')}</li>
              <li>{t('pocket.stratCI')}</li>
              <li>{t('pocket.stratTesting')}</li>
              <li>{t('pocket.stratSecurity')}</li>
              <li>{t('pocket.stratObservability')}</li>
            </ul>

            <Divider />

            {/* 9. Futuras mejoras */}
            <Title level={2}>{t('pocket.section9Title')}</Title>
            <ul>
              <li>{t('pocket.future1')}</li>
              <li>{t('pocket.future2')}</li>
              <li>{t('pocket.future3')}</li>
              <li>{t('pocket.future4')}</li>
              <li>{t('pocket.future5')}</li>
            </ul>
          </Card>
        </Content>
        <Footer className="project-footer">
          {t('pocket.footer', { year: yearActual })}
        </Footer>
      </Layout>
    </Base>
  );
};

export default PocketMindDoc;

