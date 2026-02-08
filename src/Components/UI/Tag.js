import React from 'react';
import './Tag.css';

const Tag = ({ children, className = '' }) => (
  <span className={`dj-tag ${className}`.trim()}>{children}</span>
);

export default Tag;
