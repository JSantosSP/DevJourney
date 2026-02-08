import React from 'react';
import './Section.css';

/**
 * Reusable section wrapper with optional title and id for anchor navigation.
 */
const Section = ({ id, title, subtitle, children, className = '', narrow = false }) => (
  <section id={id} className={`dj-section ${narrow ? 'dj-section--narrow' : ''} ${className}`.trim()}>
    <div className="dj-container dj-section__inner">
      {(title || subtitle) && (
        <header className="dj-section__header">
          {title && <h2 className="dj-section__title">{title}</h2>}
          {subtitle && <p className="dj-section__subtitle">{subtitle}</p>}
        </header>
      )}
      <div className="dj-section__content">{children}</div>
    </div>
  </section>
);

export default Section;
