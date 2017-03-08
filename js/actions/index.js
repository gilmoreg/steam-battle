import * as Steam from '../steam';

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
