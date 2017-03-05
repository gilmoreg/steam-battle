import * as Steam from '../steam';

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

export const ERROR = 'ERROR';
export const error = msg => ({
  type: ERROR,
  msg,
});

export const BATTLE = 'BATTLE';
export const battle = ids => (dispatch) => {
  Promise.all([Steam.getSteamID(ids[0]), Steam.getSteamID(ids[1])])
    .then((sids) => {
      if (!sids[0] || !sids[1]) {
        const errorMsg = 'Error: at least one of the Steam IDs is invalid.';
        dispatch(error(errorMsg));
        throw new Error(errorMsg);
      }
      sids.forEach((sid, index) => {
        Steam.getPlayerProfile(sid)
          .then((profile) => {
            // console.log('dispatching fillProfile', sid, profile);
            dispatch(fillProfile(index, profile));
          })
          .catch((err) => {
            dispatch(error(err));
            throw new Error(err);
          });
        Steam.calculateScore(sid)
          .then((score) => {
            // console.log('dispatching setScore', sid, score);
            dispatch(setScore(index, score));
          })
          .catch((err) => {
            dispatch(error(err));
            throw new Error(err);
          });
      });
    })
    .catch((err) => {
      dispatch(error(err));
      throw new Error(err);
    });
};

export const DECLARE_WINNER = 'DECLARE_WINNER';
export const showWinner = winner => ({
  type: DECLARE_WINNER,
  winner,
});
