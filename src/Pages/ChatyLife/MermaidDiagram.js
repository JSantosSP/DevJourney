import React, { useEffect, useRef, useState } from 'react';

/**
 * Renderiza un diagrama Mermaid a partir de una cadena de código.
 * Usa la API de mermaid.run() para generar SVG en el cliente.
 */
const MermaidDiagram = ({ chart, title }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const [id] = useState(() => `mermaid-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    if (!chart || !containerRef.current) return;

    let cancelled = false;
    setError(null);

    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: 'neutral',
        });
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Error al renderizar diagrama');
          if (containerRef.current) {
            containerRef.current.innerHTML = `<pre class="mermaid-fallback">${chart}</pre>`;
          }
        }
      }
    };

    render();
    return () => { cancelled = true; };
  }, [chart, id]);

  return (
    <div className="mermaid-diagram-wrapper" style={{ margin: '16px 0', overflow: 'auto', backgroundColor:'white'}}>
      {error && <div style={{ color: '#cf1322', fontSize: 12, marginBottom: 4 }}>{error}</div>}
      <div ref={containerRef} className="mermaid-diagram" />
    </div>
  );
};

export default MermaidDiagram;
