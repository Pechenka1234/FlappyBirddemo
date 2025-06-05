import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';
import Bird from './Components/Bird';
import Pipe from './Components/Pipe';
import Controls from './Components/Controls';
import Score from './Components/Score';
import UserForm from './Components/UserForm';
import Leaderboard from './Components/Leaderboard';
import { generatePipePairs } from './helpers';
import {
  setBirdTop,
  setPipes,
  setScore,
  setGameRunning,
  setJumpVelocity,
  addToLeaderboard,
} from './features/game/gameSlice';

const App = () => {
  const dispatch = useDispatch();
  const { birdTop, pipes, score, gameRunning, jumpVelocity, userName, maxScore } = useSelector(
    (state) => state.game
  );

  const screenWidth = 1280;
  const screenHeight = 720;
  const pipeDistance = 300;
  const gravity = 0.5;
  const jumpForce = -6;

  useEffect(() => {
    const initialPipes = Array.from({ length: 4 }).map((_, i) => ({
      x: screenWidth + i * pipeDistance,
      id: Math.random(),
      height: generatePipePairs(),
      scored: false,
    }));
    dispatch(setPipes(initialPipes));
  }, [dispatch]);

  useEffect(() => {
    let animationId;
    let hasAddedToLeaderboard = false;

    if (gameRunning) {
      animationId = setInterval(() => {
        dispatch(setBirdTop(birdTop + jumpVelocity + gravity));
        dispatch(setJumpVelocity(jumpVelocity + gravity));

        if (birdTop + jumpVelocity + gravity >= screenHeight || birdTop + jumpVelocity + gravity <= 0) {
          dispatch(setGameRunning(false));
          dispatch(setJumpVelocity(0));
          if (!hasAddedToLeaderboard && userName && maxScore > 0) {
            dispatch(addToLeaderboard({ userName, maxScore }));
            hasAddedToLeaderboard = true;
          }
        }

        dispatch(
          setPipes(
            pipes
              .map((pipe) => ({ ...pipe, x: pipe.x - 5 }))
              .filter((pipe) => pipe.x >= -60)
              .concat(
                Array.from({ length: 4 - pipes.length }).map(() => ({
                  x: screenWidth + pipeDistance,
                  id: Math.random(),
                  height: generatePipePairs(),
                  scored: false,
                }))
              )
          )
        );

        const dangerPipe = pipes.find((p) => p.x >= 20 && p.x <= 120);
        if (dangerPipe) {
          const topLimit = dangerPipe.height[1];
          const botLimit = screenHeight - dangerPipe.height[0];
          if (birdTop <= topLimit || birdTop >= botLimit) {
            dispatch(setGameRunning(false));
            dispatch(setJumpVelocity(0));
            if (!hasAddedToLeaderboard && userName && maxScore > 0) {
              dispatch(addToLeaderboard({ userName, maxScore }));
              hasAddedToLeaderboard = true;
            }
          }
        }

        const scoredPipe = pipes.find((p) => p.x <= 0 && !p.scored);
        if (scoredPipe) {
          dispatch(setScore(score + 1));
          dispatch(
            setPipes(
              pipes.map((p) =>
                p.id === scoredPipe.id ? { ...p, scored: true } : p
              )
            )
          );
        }
      }, 1000 / 60);
    }

    return () => {
      clearInterval(animationId);
      hasAddedToLeaderboard = false;
    };
  }, [gameRunning, pipes, birdTop, jumpVelocity, score, userName, maxScore, dispatch, jumpForce]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const kc = e.keyCode;
      console.log("Key pressed:", kc, "gameRunning:", gameRunning);
  
      if (kc === 32 && gameRunning) {
        console.log("Jump triggered, current birdTop:", birdTop, "Velocity:", jumpVelocity);
        dispatch(setJumpVelocity(jumpForce));
      }
  
      if (kc === 83 && !gameRunning && userName) {
        console.log("Starting game");
        dispatch(setGameRunning(true));
      }
  
      if (kc === 80) {
        console.log("Pausing/Resuming game");
        dispatch(setGameRunning(!gameRunning));
      }
  
      if (kc === 82 && !gameRunning) {
        console.log("Resetting game without logout");
        dispatch(setBirdTop(60));
        dispatch(setScore(0));
        dispatch(setGameRunning(false));
        dispatch(setJumpVelocity(0));
        setTimeout(() => {
          const initialPipes = Array.from({ length: 4 }).map((_, i) => ({
            x: screenWidth + i * pipeDistance,
            id: Math.random(),
            height: generatePipePairs(),
            scored: false,
          }));
          dispatch(setPipes(initialPipes));
        }, 0);
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameRunning, birdTop, jumpVelocity, userName, dispatch, jumpForce]);
  

  return (
    <Router basename="/flappybird-react">
      <div className={styles.app}>
        <Routes>
          <Route
            path="/"
            element={
              !userName ? (
                <>
                  <UserForm />
                  <Leaderboard />
                </>
              ) : (
                <>
                  <Score score={score} userName={userName} />
                  <Controls />
                  <Bird top={birdTop} />
                  {pipes.map((pipe) => (
                    <Fragment key={pipe.id}>
                      <Pipe x={pipe.x} height={pipe.height} type="top" />
                      <Pipe x={pipe.x} height={pipe.height} type="bottom" />
                    </Fragment>
                  ))}
                </>
              )
            }
          />
          <Route
            path="/flappybird-react"
            element={
              !userName ? (
                <>
                  <UserForm />
                  <Leaderboard />
                </>
              ) : (
                <>
                  <Score score={score} userName={userName} />
                  <Controls />
                  <Bird top={birdTop} />
                  {pipes.map((pipe) => (
                    <Fragment key={pipe.id}>
                      <Pipe x={pipe.x} height={pipe.height} type="top" />
                      <Pipe x={pipe.x} height={pipe.height} type="bottom" />
                    </Fragment>
                  ))}
                </>
              )
            }
          />
          <Route path="/controls" element={<Controls />} />
          <Route
            path="/pipe"
            element={
              <>
                {pipes.map((pipe) => (
                  <Fragment key={pipe.id}>
                    <Pipe x={pipe.x} height={pipe.height} type="top" />
                    <Pipe x={pipe.x} height={pipe.height} type="bottom" />
                  </Fragment>
                ))}
              </>
            }
          />
          <Route path="/score" element={<Score score={score} userName={userName} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
