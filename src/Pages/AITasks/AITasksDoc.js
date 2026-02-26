import React, { useEffect, useMemo, useState } from 'react';
import { Layout, Typography, Card } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Base from '../../Components/Base/Base';
import MermaidDiagram from '../GestorCrypto/MermaidDiagram';
import '../GestorCrypto/ProjectDescription.css';
import { yearActual } from '../../Utils/constants';

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

function getMarkdownUrl() {
  const base = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
  return `${base}/docs/ai-tasks-arquitectura.md`;
}

export default function AITasksDoc() {
  const [md, setMd] = useState('');
  const [error, setError] = useState(null);

  const url = useMemo(() => getMarkdownUrl(), []);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setMd('');

    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error(`No se pudo cargar la documentación (${res.status})`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setMd(text);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message ?? 'Error al cargar la documentación');
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <Base>
      <Layout className="project-layout">
        <Header className="project-header">
          <Title level={1} className="project-page-title">
            AI Tasks — Arquitectura
          </Title>
          <Paragraph type="secondary" className="project-page-subtitle">
            Documentación técnica orientada a decisiones arquitectónicas (renderizada desde Markdown).
          </Paragraph>
        </Header>

        <Content className="project-content">
          <Card className="project-card project-card-main">
            {error && (
              <Paragraph style={{ color: '#ff7875' }}>
                {error}
              </Paragraph>
            )}
            {!error && !md && (
              <Paragraph type="secondary">Cargando…</Paragraph>
            )}

            {!!md && (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  hr: () => <div className="ant-divider ant-divider-horizontal" />,
                  h2: ({ children }) => <Title level={2}>{children}</Title>,
                  h3: ({ children }) => <Title level={4}>{children}</Title>,
                  h4: ({ children }) => <Title level={4}>{children}</Title>,
                  p: ({ children }) => <Paragraph>{children}</Paragraph>,
                  code: ({ inline, className, children }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const lang = match?.[1];
                    const value = String(children ?? '');

                    if (!inline && lang === 'mermaid') {
                      const chart = value.replace(/\n$/, '');
                      return <MermaidDiagram chart={chart} />;
                    }

                    if (inline) {
                      return <code>{children}</code>;
                    }

                    return (
                      <pre style={{ overflow: 'auto' }}>
                        <code className={className}>{children}</code>
                      </pre>
                    );
                  },
                }}
              >
                {md}
              </ReactMarkdown>
            )}
          </Card>
        </Content>

        <Footer className="project-footer">
          © {yearActual} — DevJourney / AI Tasks
        </Footer>
      </Layout>
    </Base>
  );
}

