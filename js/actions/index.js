import * as Steam from '../steam';

export const CLEAR_STATE = 'CLEAR_STATE';
export const clearState = () => ({
  type: CLEAR_STATE,
});

export const FILL_ID = 'FILL_ID';
export const fillID = (player, id) => ({
  type: FILL_ID,
  player,
  id,
});

export const FILL_PLAYER = 'FILL_PLAYER';
export const fillPlayer = (player, data) => ({
  type: FILL_PLAYER,
  player,
  data,
});

export const ERROR = 'ERROR';
export const error = (msg, player) => ({
  type: ERROR,
  msg,
  player,
});

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const clearError = player => ({
  type: CLEAR_ERROR,
  player,
});

export const DECLARE_WINNER = 'DECLARE_WINNER';
export const declareWinner = winner => ({
  type: DECLARE_WINNER,
  winner,
});

// Async Actions
export const GET_ID = 'GET_ID';
export const getID = (player, id) => dispatch =>
  new Promise((resolve) => {
    Steam.checkID(id)
      .then((steamPlayer) => {
        dispatch(fillID(player, steamPlayer.id));
        resolve(steamPlayer.id);
      })
      .catch((err) => {
        console.log('erroring', err);
        dispatch(error(err, player));
      });
  });

export const BATTLE = 'BATTLE';
export const battle = ids => dispatch =>
  new Promise((resolve) => {
    dispatch(clearState());
    Promise.all([Steam.getPlayer(ids[0]), Steam.getPlayer(ids[1])])
      .then((players) => {
        players.forEach((player, index) => {
          dispatch(fillPlayer(index, player));
        });
        let winner = 2; // tie
        if (players[0].score.total > players[1].score.total) winner = 0;
        else if (players[0].score.total < players[1].score.total) winner = 1;
        dispatch(declareWinner(winner));
        resolve(winner);
      })
      .catch((err) => {
        console.log('erroring', err);
        dispatch(error(err, null));
      });
  });
