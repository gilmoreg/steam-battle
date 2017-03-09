import * as Steam from '../steam';

export const FILL_ID = 'FILL_ID';
export const fillID = (player, id) => ({
  type: FILL_ID,
  player,
  id,
});

export const FILL_PLAYER = 'FILL_PLAYER';
export const fillPlayer = (player, id) => ({
  type: FILL_PLAYER,
  player,
  id,
});

export const ERROR = 'ERROR';
export const error = (msg, player) => ({
  type: ERROR,
  msg,
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
  new Promise((resolve, reject) => {
    Steam.checkID(id)
      .then((sid) => {
        console.log('getID', player, id, sid);
        dispatch(fillID(player, sid));
        resolve(sid);
      })
      .catch((err) => {
        console.log('erroring', err);
        dispatch(error(err, player));
        reject(err);
      });
  });


export const BATTLE = 'BATTLE';
export const battle = ids => dispatch =>
  new Promise((resolve, reject) => {
    Promise.all([Steam.getPlayer(ids[0]), Steam.getPlayer(ids[1])])
      .then((players) => {
        players.forEach((player, index) => {
          dispatch(fillPlayer(player, index));
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
        reject(err);
      });
  });
