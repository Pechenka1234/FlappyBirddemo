import React from 'react';
import styles from './Pipe.module.css'; // Імпорт модуля стилів

const Pipe = ({ x, height, type }) => {
  console.log("Rendering Pipe, type:", type, "x:", x, "height:", height);
  return (
    <div
      className={`${styles.pipe} ${styles[type]}`} // Використовуємо styles.pipe і styles[type]
      style={{
        left: `${x}px`,
        height: type === 'top' ? `${height[1]}px` : `${height[0]}px`,
      }}
    />
  );
};

export default Pipe;