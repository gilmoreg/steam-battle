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

export const BATTLE = 'BATTLE';
export const battle = ids => (dispatch) => {
  Promise.all([Steam.getSteamID(ids[0]), Steam.getSteamID(ids[1])])
    .then((sids) => {
      sids.forEach((sid, index) => {
        Steam.getPlayerProfile(sid)
          .then((profile) => {
            console.log('dispatching fillProfile');
            dispatch(fillProfile(index, profile));
          })
          .catch((err) => { console.log(err); });
        Steam.calculateScore(sid)
          .then((score) => {
            console.log('dispatching setScore');
            dispatch(setScore(index, score));
          })
          .catch((err) => { console.log(err); });
      });
    })
    // TODO: see what happens with invalid Steam IDs and prevent the app from continuing
    .catch((err) => { console.log(err); });
};

export const DECLARE_WINNER = 'DECLARE_WINNER';
export const showWinner = winner => ({
  type: DECLARE_WINNER,
  winner,
});
