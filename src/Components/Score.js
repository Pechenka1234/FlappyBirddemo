import React from 'react';
import styles from './Score.module.css'; // Імпорт модуля стилів

const Score = ({ score, userName }) => {
  console.log("Rendering Score, score:", score, "userName:", userName);
  return (
    <div className={styles.score}>
      Гравець: {userName} | Рахунок: {score}
    </div>
  );
};

export default Score;