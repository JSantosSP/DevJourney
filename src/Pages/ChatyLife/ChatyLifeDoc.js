import React from 'react';
import { Layout, Typography, Divider, Card } from 'antd';
import Base from '../../Components/Base/Base';
import MermaidDiagram from './MermaidDiagram';
import { useLanguage } from '../../context/LanguageContext';
import './ProjectDescription.css';
import { yearActual } from '../../Utils/constants';

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

// --- Diagramas Mermaid ---

const diagramDomain = `erDiagram
    Usuario ||--o{ Contacto : "tiene"
    Usuario ||--o{ Chat : "participa"
    Chat ||--o{ Mensaje : "contiene"
    Usuario ||--o| ChatTheme : "personaliza por chat"
    Chat }o--|| Usuario : "participant1"
    Chat }o--|| Usuario : "participant2"

    Usuario {
        string uid
        string username
        string profilePhotoUrl
        string fcmToken
        datetime createdAt
    }

    Contacto {
        string id
        string userId
        string contactId
        datetime createdAt
    }

    Chat {
        string id
        string participant1Id
        string participant2Id
        string lastMessage
        datetime lastMessageTime
        int unreadCount1
        int unreadCount2
    }

    Mensaje {
        string id
        string chatId
        string senderId
        string receiverId
        string content
        string type
        string imageUrl
        string audioUrl
        datetime timestamp
        bool isRead
    }

    ChatTheme {
        color myBubbleColor
        color otherBubbleColor
        string wallpaperPath
    }`;

const diagramC4Context = `flowchart LR
    User([Usuario])
    System[ChatyLife]
    User -->|"Mensajería, contactos, notificaciones"| System`;

const diagramC4Containers = `flowchart TB
    subgraph Client["Cliente"]
        App[App Flutter]
    end

    subgraph Firebase["Firebase / Backend"]
        Auth[Firebase Auth]
        Firestore[(Cloud Firestore)]
        FCM[Cloud Messaging]
        CF[Cloud Functions]
    end

    subgraph External["Externos"]
        ImgBB[ImgBB API]
    end

    App -->|"Autenticación"| Auth
    App -->|"CRUD, streams tiempo real"| Firestore
    App -->|"Token FCM"| FCM
    App -->|"Imágenes grandes"| ImgBB
    Firestore -->|"onCreate mensaje"| CF
    CF -->|"Push notification"| FCM
    FCM --> App`;

const diagramC4Components = `flowchart TB
    subgraph FlutterApp["App Flutter"]
        Screens[Pantallas]
        AuthService[AuthService]
        FirestoreService[FirestoreService]
        StorageService[StorageService]
        NotificationService[NotificationService]
        ThemeService[ThemeService]
    end

    Screens --> AuthService
    Screens --> FirestoreService
    Screens --> StorageService
    Screens --> NotificationService
    Screens --> ThemeService
    AuthService --> FirestoreService
    NotificationService --> FirestoreService`;

const diagramER = `erDiagram
    users ||--o{ contacts : "userId"
    users ||--o{ chatThemes : "userId"
    users {
        string uid PK
        string username
        string profilePhotoUrl
        string fcmToken
        datetime createdAt
    }

    contacts {
        string id PK
        string userId FK
        string contactId
        datetime createdAt
    }

    chats {
        string id PK
        string participant1Id FK
        string participant2Id FK
        string lastMessage
        datetime lastMessageTime
        int unreadCount1
        int unreadCount2
    }

    chats ||--o{ messages : "chatId"
    messages {
        string id PK
        string chatId FK
        string senderId FK
        string receiverId FK
        string content
        string type
        string imageUrl
        string audioUrl
        datetime timestamp
        bool isRead
    }

    activeChats {
        string userId PK
    }
    activeChats ||--o{ chats : "chats activos"`;

const diagramSendMessage = `sequenceDiagram
    participant U as Usuario
    participant App as App Flutter
    participant FS as Firestore
    participant CF as Cloud Function
    participant FCM as FCM

    U->>App: Envía mensaje (texto/imagen/audio)
    App->>App: StorageService.upload (si imagen/audio)
    App->>FS: sendMessage(message)
    FS->>FS: messages.add() + update chat lastMessage
    FS->>FS: incrementUnreadCount(receiverId)

    FS-->>CF: onCreate messages/{messageId}
    CF->>CF: get receiver fcmToken, activeChats
    alt Receptor NO viendo chat
        CF->>FCM: send(payload)
        FCM-->>Receptor: Push notification
    else Receptor viendo chat
        CF->>CF: skip notification
    end

    FS-->>App: snapshot (stream)
    App-->>U: Mensaje visible en tiempo real`;

const diagramAuthFlow = `sequenceDiagram
    participant U as Usuario
    participant App as App Flutter
    participant Auth as Firebase Auth
    participant FS as Firestore

    U->>App: Email + contraseña (registro/login)
    App->>Auth: createUser / signIn
    Auth-->>App: UserCredential

    alt Registro
        App->>FS: createUser(UserModel)
    end

    App->>FS: getUser(uid)
    FS-->>App: UserModel
    App->>App: Guardar FCM token en users/{uid}
    App-->>U: Navegación a ChatsScreen`;

const diagramNotificationDecision = `flowchart TD
    A[Nuevo mensaje en Firestore] --> B[Cloud Function trigger]
    B --> C{Receptor tiene FCM token?}
    C -->|No| D[Fin - no notificación]
    C -->|Sí| E{Receptor en activeChats para este chat?}
    E -->|Sí| D
    E -->|No| F[Enviar notificación push]
    F --> G[Usuario recibe en dispositivo]`;

const ChatyLifeDoc = () => {
  const { t } = useLanguage();
  return (
    <Base>
      <Layout className="project-layout">
        <Header className="project-header">
          <Title level={1} className="project-page-title">{t('chaty.pageTitle')}</Title>
          <Paragraph type="secondary" className="project-page-subtitle">
            {t('chaty.pageSubtitle')}
          </Paragraph>
        </Header>
        <Content className="project-content">

          <Card className="project-card project-card-main">
            <Title level={2}>{t('chaty.section1Title')}</Title>
            <Title level={4}>{t('chaty.whatProblem')}</Title>
            <Paragraph>{t('chaty.whatProblemText')}</Paragraph>
            <Title level={4}>{t('chaty.systemType')}</Title>
            <Paragraph>{t('chaty.systemTypeText')}</Paragraph>
            <Title level={4}>{t('chaty.targetAudience')}</Title>
            <Paragraph>{t('chaty.targetAudienceText')}</Paragraph>
            <Title level={4}>{t('chaty.useContext')}</Title>
            <Paragraph>{t('chaty.useContextText')}</Paragraph>

            <Divider />

            <Title level={2}>{t('chaty.section2Title')}</Title>
            <Title level={4}>{t('chaty.funcReqs')}</Title>
            <ul>
              <li><strong>Auth:</strong> {t('chaty.funcReq1')}</li>
              <li><strong>Profile:</strong> {t('chaty.funcReq2')}</li>
              <li><strong>Contacts:</strong> {t('chaty.funcReq3')}</li>
              <li><strong>Chats:</strong> {t('chaty.funcReq4')}</li>
              <li><strong>Messages:</strong> {t('chaty.funcReq5')}</li>
              <li><strong>Push:</strong> {t('chaty.funcReq6')}</li>
              <li><strong>Customisation:</strong> {t('chaty.funcReq7')}</li>
            </ul>
            <Title level={4}>{t('chaty.nonFuncReqs')}</Title>
            <ul>
              <li>{t('chaty.nf1')}</li>
              <li>{t('chaty.nf2')}</li>
              <li>{t('chaty.nf3')}</li>
              <li>{t('chaty.nf4')}</li>
              <li>{t('chaty.nf5')}</li>
              <li>{t('chaty.nf6')}</li>
            </ul>

            <Divider />

            <Title level={2}>{t('chaty.section3Title')}</Title>
            <Paragraph>
              <strong>{t('chaty.entitiesLabel')}</strong> {t('chaty.entitiesText')}            </Paragraph>
            <Paragraph>
              <strong>{t('chaty.relationsLabel')}</strong> {t('chaty.relationsText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('chaty.responsibilitiesLabel')}</strong> {t('chaty.responsibilitiesText')}
            </Paragraph>
            <MermaidDiagram chart={diagramDomain} title={t('chaty.diagramDomainTitle')} />

            <Divider />

            <Title level={2}>{t('chaty.section4Title')}</Title>
            <Title level={4}>{t('chaty.level1Title')}</Title>
            <Paragraph>{t('chaty.level1Text')}</Paragraph>
            <MermaidDiagram chart={diagramC4Context} />
            <Title level={4}>{t('chaty.level2Title')}</Title>
            <Paragraph>{t('chaty.level2Text')}</Paragraph>
            <MermaidDiagram chart={diagramC4Containers} />
            <Title level={4}>{t('chaty.level3Title')}</Title>
            <Paragraph>{t('chaty.level3Text')}</Paragraph>
            <MermaidDiagram chart={diagramC4Components} />

            <Divider />

            {/* 5. Diseño de base de datos */}
            <Title level={2}>{t('chaty.section5Title')}</Title>
            <Paragraph>
              <strong>{t('chaty.dbType')}</strong> {t('chaty.dbTypeText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('chaty.dbJustification')}</strong> {t('chaty.dbJustificationText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('chaty.dbEntities')}</strong> {t('chaty.dbEntitiesText')}
            </Paragraph>
            <Paragraph>
              <strong>{t('chaty.dbRelations')}</strong> {t('chaty.dbRelationsText')}</Paragraph>
            <Paragraph>
              <strong>{t('chaty.dbNorm')}</strong> {t('chaty.dbNormText')}
            </Paragraph>
            <MermaidDiagram chart={diagramER} title={t('chaty.diagramERTitle')} />

            <Divider />

            {/* 6. ADR */}
            <Title level={2}>{t('chaty.section6Title')}</Title>

            <Card size="small" title={t('chaty.adr1Title')} style={{ marginBottom: 16 }}>
              <Paragraph><strong>{t('chaty.adr1Dec')}</strong> {t('chaty.adr1DecText')}</Paragraph>
              <Paragraph><strong>{t('chaty.adr1Ctx')}</strong> {t('chaty.adr1CtxText')}</Paragraph>
              <Paragraph><strong>{t('chaty.adr1Alt')}</strong> {t('chaty.adr1AltText')}</Paragraph>
              <Paragraph><strong>{t('chaty.adr1Mot')}</strong> {t('chaty.adr1MotText')}</Paragraph>
              <Paragraph><strong>{t('chaty.adr1Cons')}</strong> {t('chaty.adr1ConsText')}</Paragraph>
            </Card>

            <Card size="small" title={t('chaty.adr2Title')} style={{ marginBottom: 16 }}>
              <Paragraph><strong>{t('chaty.adr1Dec')}</strong> {t('chaty.adr2DecText')}</Paragraph>
              <Paragraph><strong>{t('chaty.adr1Ctx')}</strong> {t('chaty.adr2CtxText')} “nuevo mensaje” </Paragraph>
              <Paragraph><strong>{t('chaty.adr1Alt')}</strong> {t('chaty.adr2AltText')} </Paragraph>
              <Paragraph><strong>{t('chaty.adr1Mot')}</strong> {t('chaty.adr2MotText')} </Paragraph>
              <Paragraph><strong>{t('chaty.adr1Cons')}</strong> {t('chaty.adr2ConsText')} “todos los mensajes de un usuario” </Paragraph>
            </Card>

            <Card size="small" title={t('chaty.adr3Title')} style={{ marginBottom: 16 }}>
              <Paragraph><strong>{t('chaty.adr1Dec')}</strong> {t('chaty.adr3DecText')} Audios: Base64 en Firestore. No usar Firebase Storage para medios de chat.</Paragraph>
              <Paragraph><strong>Contexto:</strong> Reducir coste y complejidad en MVP; límite de 1MB por documento en Firestore.</Paragraph>
              <Paragraph><strong>Alternativas:</strong> Firebase Storage con reglas; otro object storage (S3, Cloud Storage).</Paragraph>
              <Paragraph><strong>Motivo:</strong> Evitar facturación por Storage y simplificar reglas; ImgBB gratuito hasta 32MB; Base64 suficiente para fotos pequeñas y audios cortos.</Paragraph>
              <Paragraph><strong>Consecuencias:</strong> Dependencia de ImgBB; Base64 aumenta tamaño del documento y coste de lecturas; eliminación de medios “temporales” delegada a política ImgBB o a borrado del mensaje en Firestore.</Paragraph>
            </Card>

            <Card size="small" title={t('chaty.adr4Title')} style={{ marginBottom: 16 }}>
              <Paragraph><strong>{t('chaty.adr1Dec')}</strong> {t('chaty.adr4DecText')}</Paragraph>
              <Paragraph><strong>{t('chaty.adr1Ctx')}</strong> {t('chaty.adr4CtxText')}</Paragraph>
              <Paragraph><strong>{t('chaty.adr1Alt')}</strong> {t('chaty.adr4AltText')}</Paragraph>
              <Paragraph><strong>{t('chaty.adr1Mot')}</strong> {t('chaty.adr4MotText')}</Paragraph>
              <Paragraph><strong>{t('chaty.adr1Cons')}</strong> {t('chaty.adr4ConsText')}</Paragraph>
            </Card>

            <Card size="small" title={t('chaty.adr5Title')}>
              <Paragraph><strong>{t('chaty.adr5Dec')}</strong> {t('chaty.adr5DecText')} con IDs ordenados lexicográficamente.</Paragraph>
              <Paragraph><strong>Contexto:</strong> Un solo chat por par de usuarios; evitar duplicados al “abrir conversación”.</Paragraph>
              <Paragraph><strong>Alternativas:</strong> ID aleatorio y consulta por par de participantes; múltiples chats por par.</Paragraph>
              <Paragraph><strong>Motivo:</strong> createOrGetChat es idempotente; una sola lectura por doc(chatId) para verificar existencia; no hay que hacer query por participantes.</Paragraph>
              <Paragraph><strong>Consecuencias:</strong> El ID es predecible; no hay anonimato del identificador de conversación. Adecuado para chat 1-a-1 privado.</Paragraph>
            </Card>

            <Divider />

            {/* 7. Flujos clave */}
            <Title level={2}>{t('chaty.section7Title')}</Title>
            <Title level={4}>{t('chaty.flow1Title')}</Title>
            <Paragraph>{t('chaty.flow1Text')}</Paragraph>
            <MermaidDiagram chart={diagramSendMessage} />
            <Title level={4}>{t('chaty.flow2Title')}</Title>
            <Paragraph>{t('chaty.flow2Text')}</Paragraph>
            <MermaidDiagram chart={diagramAuthFlow} />
            <Title level={4}>{t('chaty.flow3Title')}</Title>
            <Paragraph>{t('chaty.flow3Text')}</Paragraph>
            <MermaidDiagram chart={diagramNotificationDecision} />

            <Divider />

            {/* 8. Estrategia técnica */}
            <Title level={2}>{t('chaty.section8Title')}</Title>
            <ul>
              <li>{t('chaty.strat1')}</li>
              <li>{t('chaty.strat2')}</li>
              <li>{t('chaty.strat3')}</li>
              <li>{t('chaty.strat4')}</li>
              <li>{t('chaty.strat5')}</li>
              <li>{t('chaty.strat6')}</li>
            </ul>

            <Divider />

            {/* 9. Mejoras futuras */}
            <Title level={2}>{t('chaty.section9Title')}</Title>
            <ul>
              <li>{t('chaty.future1')} </li>
              <li>{t('chaty.future2')} </li>
              <li>{t('chaty.future3')} </li>
              <li>{t('chaty.future4')} </li>
              <li>{t('chaty.future5')}</li>
              <li>{t('chaty.future6')} </li>
            </ul>
          </Card>

          <Footer className="project-footer">
            {t('chaty.footer', { year: yearActual })}
          </Footer>
        </Content>
      </Layout>
    </Base>
  );
};

export default ChatyLifeDoc;
