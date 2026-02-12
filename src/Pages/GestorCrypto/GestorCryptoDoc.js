import React from 'react';
import { Layout, Typography, Divider, Card, Table } from 'antd';
import Base from '../../Components/Base/Base';
import MermaidDiagram from './MermaidDiagram';
import { useLanguage } from '../../context/LanguageContext';
import './ProjectDescription.css';
import { yearActual } from '../../Utils/constants';

const { Title, Paragraph, Text } = Typography;
const { Header, Content, Footer } = Layout;

const diagramDomain = `erDiagram
    Wallet ||--o{ Transaccion : "tiene"
    Transaccion }o--|| Deposito : "opcional"
    Transaccion }o--|| Operation : "opcional"
    Operation ||--o{ Transaccion : "agrupa"
    ImportLog }o--|| Wallet : "referencia"

    Wallet {
        ObjectId id
        string name
        date createdAt
    }

    Transaccion {
        ObjectId id
        string type
        string moneda
        Decimal128 valor
        date time
        ObjectId wallet
        string importHash
        bool potentialDuplicate
    }

    Deposito {
        ObjectId id
        date time
        Decimal128 importe
        Decimal128 neto
        Decimal128 fee
    }

    Operation {
        ObjectId id
        date time
        string par
        Decimal128 valor1
        Decimal128 valor2
        string type
    }

    ImportLog {
        ObjectId id
        string filename
        string parserType
        int inserted
        int duplicates
    }`;

const diagramContext = `flowchart LR
    Usuario([Usuario])
    Gestor[Gestor de Criptomonedas]
    MongoDB[(MongoDB)]
    Usuario -->|Importa CSV, consulta balances| Gestor
    Gestor -->|Lee/escribe datos| MongoDB`;

const diagramContainers = `flowchart LR
    Usuario([Usuario])
    Frontend[Frontend SPA React Vite]
    Backend[API Backend Node Express]
    DB[(MongoDB)]
    Usuario --> Frontend
    Frontend -->|REST JSON| Backend
    Backend -->|Mongoose| DB`;

const diagramBackend = `flowchart TB
    Routes[Rutas Express]
    WS[WalletService]
    BS[BalanceService]
    IS[ImportService]
    TS[TaxService]
    OS[OperationService]
    Parsers[Parsers CSV]
    Models[Modelos Mongoose]
    Routes --> WS
    Routes --> BS
    Routes --> IS
    Routes --> TS
    Routes --> OS
    IS --> Parsers
    WS --> Models
    BS --> Models
    IS --> Models
    TS --> Models
    OS --> Models`;

const diagramER = `erDiagram
    Wallet ||--o{ Transaccion : wallet
    Transaccion }o--o| Deposito : deposito
    Transaccion }o--o| Operation : operation
    Operation ||--o{ Transaccion : agrupa
    ImportLog }o--o| Wallet : walletId

    Wallet {
        string name
    }
    Transaccion {
        string type
        string moneda
        decimal valor
        date time
        string importHash
    }
    Deposito {
        date time
        decimal importe
        decimal neto
        decimal fee
    }
    Operation {
        string par
        decimal valor1
        decimal valor2
        string type
    }
    ImportLog {
        string filename
        string parserType
        int inserted
        int duplicates
    }`;

const diagramImportSequence = `sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant B as Backend
    participant P as Parser Factory
    participant DB as MongoDB

    U->>F: Sube CSV + walletId
    F->>B: POST /api/import/csv
    B->>P: parseWithDetection(buffer)
    P->>P: detectParserType(headers)
    P->>P: parse(buffer)
    P-->>B: rows, errors, parserType

    loop Por cada fila
        B->>B: buildImportHash(row)
        B->>DB: find transacción por hash
        alt Ya existe
            B->>B: marcar possibleDuplicate
        else No existe
            B->>DB: Crear Deposito si aplica
            B->>DB: Crear Transaccion
        end
    end

    B->>DB: Crear ImportLog
    B-->>F: inserted, possibleDuplicates, errors
    F-->>U: Resumen`;

const diagramPreviewSequence = `sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant B as ImportService
    participant DB as MongoDB

    U->>F: Sube CSV + walletId
    F->>B: POST /api/import/csv
    B->>B: parseWithDetection
    B->>B: buildPreview(walletId, rows)

    loop Por cada fila
        B->>DB: Buscar transacciones
        B->>B: suggestedAction
    end

    B-->>F: preview[]
    F-->>U: Muestra preview

    U->>F: Confirma decisiones
    F->>B: POST .../execute
    B->>DB: Crear Operation/Transacciones
    B->>DB: ImportLog
    B-->>F: results`;

const diagramBalanceFlow = `flowchart LR
    A[GET /api/wallets/:id/balance] --> B[BalanceService]
    B --> C[Transaccion.aggregate]
    C --> D[$match wallet + until]
    D --> E[$group by moneda, $sum valor]
    E --> F[JSON response]`;

const diagramTaxFlow = `flowchart TD
    A["GET /api/wallets/:id/tax"] --> B["TaxService.\ncomputeRealizedGains"]
    B --> C["listByWalletForTax\nWithTransactions"]
    C --> D["Ordenar operaciones time ASC"]
    D --> E{"Patrón?"}
    E -->|"Compra EUR→crypto"| F["Añadir lote"]
    E -->|"Venta crypto→EUR"| G["FIFO + gain/loss"]
    E -->|Convert| H["FIFO origen → lote destino"]
    F --> D
    G --> I["realized[]"]
    H --> I
    I --> J["totalGain, totalLoss, \nnetGainLoss"]`;

const GestorCryptoDoc = () => {
  const { t } = useLanguage();

  const nonFuncColumns = [
    { title: t('crypto.tableArea'), dataIndex: 'area', key: 'area', render: (val) => <Text strong>{val}</Text> },
    { title: t('crypto.tableDecision'), dataIndex: 'decision', key: 'decision' },
  ];
  const nonFuncData = [
    { key: '1', area: t('crypto.nf1Area'), decision: t('crypto.nf1Decision') },
    { key: '2', area: t('crypto.nf2Area'), decision: t('crypto.nf2Decision') },
    { key: '3', area: t('crypto.nf3Area'), decision: t('crypto.nf3Decision') },
    { key: '4', area: t('crypto.nf4Area'), decision: t('crypto.nf4Decision') },
    { key: '5', area: t('crypto.nf5Area'), decision: t('crypto.nf5Decision') },
    { key: '6', area: t('crypto.nf6Area'), decision: t('crypto.nf6Decision') },
  ];

  return (
    <Base>
      <Layout className="project-layout">
        <Header className="project-header">
          <Title level={1} className="project-page-title">{t('crypto.pageTitle')}</Title>
          <Paragraph type="secondary" className="project-page-subtitle">{t('crypto.pageSubtitle')}</Paragraph>
        </Header>
        <Content className="project-content">
          <Card className="project-card project-card-main">
            <Title level={2}>{t('crypto.section1Title')}</Title>
            <Title level={4}>{t('crypto.whatProblem')}</Title>
            <Paragraph>{t('crypto.whatProblemText')}</Paragraph>
            <Title level={4}>{t('crypto.systemType')}</Title>
            <Paragraph>{t('crypto.systemTypeText')}</Paragraph>
            <Title level={4}>{t('crypto.targetAudience')}</Title>
            <Paragraph>{t('crypto.targetAudienceText')}</Paragraph>
            <Title level={4}>{t('crypto.useContext')}</Title>
            <Paragraph>{t('crypto.useContextText')}</Paragraph>

            <Divider />

            <Title level={2}>{t('crypto.section2Title')}</Title>
            <Title level={4}>{t('crypto.funcReqs')}</Title>
            <ul>
              {[
                'crypto.reqWallet', 'crypto.reqCsv', 'crypto.reqTx', 'crypto.reqDup', 'crypto.reqRecon',
                'crypto.reqBalance', 'crypto.reqOps', 'crypto.reqTax', 'crypto.reqObs',
              ].map((key) => {
                const s = t(key);
                const idx = s.indexOf(': ');
                return (
                  <li key={key}>
                    {idx > 0 ? <><strong>{s.slice(0, idx)}:</strong> {s.slice(idx + 2)}</> : s}
                  </li>
                );
              })}
            </ul>
            <Title level={4}>{t('crypto.nonFuncReqs')}</Title>
            <Table columns={nonFuncColumns} dataSource={nonFuncData} pagination={false} size="small" />

            <Divider />

            <Title level={2}>{t('crypto.section3Title')}</Title>
            <Paragraph>
              <strong>{t('crypto.entities')}</strong> {t('crypto.entitiesText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('crypto.relations')}</strong> {t('crypto.relationsText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('crypto.responsibilities')}</strong> {t('crypto.responsibilitiesText')}
            </Paragraph>
            <MermaidDiagram chart={diagramDomain} title={t('crypto.diagramDomain')} />

            <Divider />

            <Title level={2}>{t('crypto.section4Title')}</Title>
            <Title level={4}>{t('crypto.level1')}</Title>
            <MermaidDiagram chart={diagramContext} />
            <Title level={4}>{t('crypto.level2')}</Title>
            <MermaidDiagram chart={diagramContainers} />
            <Title level={4}>{t('crypto.level3')}</Title>
            <MermaidDiagram chart={diagramBackend} />

            <Divider />

            <Title level={2}>{t('crypto.section5Title')}</Title>
            <Paragraph>
              <strong>{t('crypto.type')}</strong> {t('crypto.typeText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('crypto.collections')}</strong> {t('crypto.collectionsText')}
            </Paragraph>
            <MermaidDiagram chart={diagramER} title={t('crypto.diagramER')} />

            <Divider />

            <Title level={2}>{t('crypto.section6Title')}</Title>
            <Card size="small" title={t('crypto.adr1Title')} style={{ marginBottom: 16 }}>
              <Paragraph><strong>{t('crypto.adr1Decision')}</strong> {t('crypto.adr1DecisionText')}</Paragraph>
              <Paragraph><strong>{t('crypto.adr1Context')}</strong> {t('crypto.adr1ContextText')}</Paragraph>
              <Paragraph><strong>{t('crypto.adr1Cons')}</strong> {t('crypto.adr1ConsText')}</Paragraph>
            </Card>
            <Card size="small" title={t('crypto.adr2Title')} style={{ marginBottom: 16 }}>
              <Paragraph><strong>{t('crypto.adr1Decision')}</strong> {t('crypto.adr2DecisionText')}</Paragraph>
              <Paragraph><strong>{t('crypto.adr2Motivo')}</strong> {t('crypto.adr2MotivoText')}</Paragraph>
            </Card>
            <Card size="small" title={t('crypto.adr3Title')} style={{ marginBottom: 16 }}>
              <Paragraph><strong>{t('crypto.adr1Decision')}</strong> {t('crypto.adr3DecisionText')}</Paragraph>
              <Paragraph><strong>{t('crypto.adr2Motivo')}</strong> {t('crypto.adr3MotivoText')}</Paragraph>
            </Card>
            <Card size="small" title={t('crypto.adr4Title')} style={{ marginBottom: 16 }}>
              <Paragraph><strong>{t('crypto.adr1Decision')}</strong> {t('crypto.adr4DecisionText')}</Paragraph>
              <Paragraph><strong>{t('crypto.adr2Motivo')}</strong> {t('crypto.adr4MotivoText')}</Paragraph>
            </Card>
            <Card size="small" title={t('crypto.adr5Title')}>
              <Paragraph><strong>{t('crypto.adr1Decision')}</strong> {t('crypto.adr5DecisionText')}</Paragraph>
              <Paragraph><strong>{t('crypto.adr2Motivo')}</strong> {t('crypto.adr5MotivoText')}</Paragraph>
            </Card>

            <Divider />

            <Title level={2}>{t('crypto.section7Title')}</Title>
            <Title level={4}>{t('crypto.flowDirect')}</Title>
            <MermaidDiagram chart={diagramImportSequence} />
            <Title level={4}>{t('crypto.flowPreview')}</Title>
            <MermaidDiagram chart={diagramPreviewSequence} />
            <Title level={4}>{t('crypto.flowBalance')}</Title>
            <MermaidDiagram chart={diagramBalanceFlow} />
            <Title level={4}>{t('crypto.flowTax')}</Title>
            <MermaidDiagram chart={diagramTaxFlow} />

            <Divider />

            <Title level={2}>{t('crypto.section8Title')}</Title>
            <ul>
              <li>{t('crypto.future1')}</li>
              <li>{t('crypto.future2')}</li>
              <li>{t('crypto.future3')}</li>
              <li>{t('crypto.future4')}</li>
              <li>{t('crypto.future5')}</li>
              <li>{t('crypto.future6')}</li>
            </ul>
          </Card>
        </Content>
        <Footer className="project-footer">
          {t('crypto.footer', { year: yearActual })}
        </Footer>
      </Layout>
    </Base>
  );
};

export default GestorCryptoDoc;
