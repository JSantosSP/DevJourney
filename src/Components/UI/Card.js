import React from 'react';
import './Card.css';

/**
 * Card container for tech stack, traits, etc. Optional icon or title.
 */
const Card = ({ children, className = '', title, icon, hoverable = true }) => (
  <div className={`dj-card ${hoverable ? 'dj-card--hover' : ''} ${className}`.trim()}>
    {(icon || title) && (
      <div className="dj-card__header">
        {icon && <span className="dj-card__icon">{icon}</span>}
        {title && <h3 className="dj-card__title">{title}</h3>}
      </div>
    )}
    <div className="dj-card__body">{children}</div>
  </div>
);

export default Card;
