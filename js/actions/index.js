export const FILL_PROFILE = 'FILL_PROFILE';
export const fillProfile = (player, profile) => ({
  type: FILL_PROFILE,
  player,
  profile,
});

export const SET_SCORE = 'SET_SCORE';
export const setScore = (player, score) => ({
  type: SET_SCORE,
  player,
  score,
});

export const DECLARE_WINNER = 'DECLARE_WINNER';
export const showWinner = winner => ({
  type: DECLARE_WINNER,
  winner,
});
