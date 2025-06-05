import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName, resetGame, addToLeaderboard } from '../features/game/gameSlice';
import styles from './Controls.module.css';

const Controls = () => {
  const dispatch = useDispatch();
  const { userName, maxScore } = useSelector((state) => state.game);
  console.log("Rendering Controls");

  const handleLogout = () => {
    if (userName && maxScore > 0) {
      dispatch(addToLeaderboard({ userName, maxScore }));
    }
    dispatch(setUserName(''));
    dispatch(resetGame());
  };

  return (
    <div className={styles.controls}>
      <div className={styles.key}>S - Почати гру</div>
      <div className={styles.key}>SPACE - Стрибок</div>
      <div className={styles.key}>P - Пауза/Відновлення</div>
      <div className={styles.key}>R - Почати заново</div>
      <button className={styles.key} onClick={handleLogout}>Вихід з акаунту</button>
    </div>
  );
};

export default Controls;