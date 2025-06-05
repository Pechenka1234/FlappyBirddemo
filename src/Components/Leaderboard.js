import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Leaderboard.module.css';

const Leaderboard = () => {
  const { userName, maxScore, leaderboard } = useSelector((state) => state.game);
  console.log("Rendering Leaderboard, styles:", styles, "userName:", userName, "maxScore:", maxScore, "leaderboard:", leaderboard);

  return (
    <div className={styles.leaderboard}>
      <h3>Топ гравців</h3>
      {leaderboard.length === 0 ? (
        <p>Ще немає результатів</p>
      ) : (
        <ul>
          {leaderboard.map((player, index) => (
            <li key={index}>
              {player.name}: {player.score} балів
            </li>
          ))}
        </ul>
      )}
      {maxScore > 0 && !userName && (
        <p className={styles.userResult}>
          Ваш рекорд: {maxScore} балів
        </p>
      )}
    </div>
  );
};

export default Leaderboard;