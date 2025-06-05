import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  birdTop: 60,
  pipes: [],
  score: 0,
  gameRunning: false,
  jumpVelocity: 0,
  userName: '',
  maxScore: 0,
  leaderboard: [], // Додаємо поле для зберігання результатів гравців
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setBirdTop: (state, action) => {
      state.birdTop = action.payload;
    },
    setPipes: (state, action) => {
      state.pipes = action.payload;
    },
    setScore: (state, action) => {
      state.score = action.payload;
      if (action.payload > state.maxScore) {
        state.maxScore = action.payload;
      }
    },
    setGameRunning: (state, action) => {
      state.gameRunning = action.payload;
    },
    setJumpVelocity: (state, action) => {
      state.jumpVelocity = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    resetGame: (state) => {
      state.birdTop = 60;
      state.pipes = [];
      state.score = 0;
      state.gameRunning = false;
      state.jumpVelocity = 0;
    },
    resetMaxScore: (state) => {
      state.maxScore = 0;
    },
    addToLeaderboard: (state, action) => {
      const { userName, maxScore } = action.payload;
      // Додаємо нового гравця до таблиці лідерів
      state.leaderboard = [
        ...state.leaderboard,
        { name: userName, score: maxScore },
      ].sort((a, b) => b.score - a.score).slice(0, 5); // Сортуємо і беремо топ-5
    },
  },
});

export const {
  setBirdTop,
  setPipes,
  setScore,
  setGameRunning,
  setJumpVelocity,
  setUserName,
  resetGame,
  resetMaxScore,
  addToLeaderboard,
} = gameSlice.actions;

export default gameSlice.reducer;