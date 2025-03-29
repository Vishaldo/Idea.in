import React from 'react';
import './TextContainer.css';

type TextContainerProps = Record<string, never>;

const TextContainer: React.FC<TextContainerProps> = () => {
  return (
    <div className="textbox-container">
      <input type="text" placeholder="Type something..." />
    </div>
  );
};

export default TextContainer;