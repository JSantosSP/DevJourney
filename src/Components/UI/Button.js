import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

/**
 * Primary or secondary CTA button. Supports internal Link or external anchor.
 */
const Button = ({
  children,
  variant = 'primary',
  to,
  href,
  onClick,
  className = '',
  size = 'medium',
}) => {
  const classNames = `dj-btn dj-btn--${variant} dj-btn--${size} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classNames}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classNames} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
