import React from 'react';
import styles from './Bird.module.css'; // Імпорт модуля стилів

const Bird = ({ top }) => {
  console.log("Rendering Bird, top:", top);
  return (
    <div className={styles.bird} style={{ top: `${top}px` }} />
  );
};

export default Bird;