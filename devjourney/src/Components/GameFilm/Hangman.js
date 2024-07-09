import React from 'react';

const Hangman = ({ errors }) => {
  const renderPart = (part) => {
    const strokeColor = "black";
    const strokeWidth = 2;
    
    switch (part) {
      case 1:
        return <line x1="10" y1="200" x2="100" y2="200" stroke={strokeColor} strokeWidth={strokeWidth} />; // base
      case 2:
        return <line x1="10" y1="20" x2="10" y2="200" stroke={strokeColor} strokeWidth={strokeWidth} />; // viga izquierda
      case 3:
        return <line x1="10" y1="20" x2="60" y2="20" stroke={strokeColor} strokeWidth={strokeWidth} />; // viga superior
      case 4:
        return <line x1="60" y1="20" x2="60" y2="50" stroke={strokeColor} strokeWidth={strokeWidth} />; // cuerda
      case 5:
        return <circle cx="60" cy="70" r="20" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />; // cabeza
      case 6:
        return <line x1="60" y1="90" x2="60" y2="140" stroke={strokeColor} strokeWidth={strokeWidth} />; // cuerpo
      case 7:
        return <line x1="60" y1="100" x2="40" y2="120" stroke={strokeColor} strokeWidth={strokeWidth} />; // brazo izquierdo
      case 8:
        return <line x1="60" y1="100" x2="80" y2="120" stroke={strokeColor} strokeWidth={strokeWidth} />; // brazo derecho
      case 9:
        return <line x1="60" y1="140" x2="40" y2="160" stroke={strokeColor} strokeWidth={strokeWidth} />; // pierna izquierda
      case 10:
        return <line x1="60" y1="140" x2="80" y2="160" stroke={strokeColor} strokeWidth={strokeWidth} />; // pierna derecha
      default:
        return null;
    }
  };

  return (
    <svg height="250" width="200" className="hangman">
      {Array.from({ length: errors }, (_, i) => renderPart(i + 1))}
    </svg>
  );
};

export default Hangman;
