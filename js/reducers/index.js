const initialRepositoryState = {
  players: [{}, {}],
  winner: null,
  error: null,
};

export default function steamBattleReducer(state = initialRepositoryState, action) {
  switch (action.type) {
    case 'FILL_PLAYER': {
      return Object.assign({}, state, {
        players: state.players.map((p, index) => {
          if (action.id === index) {
            return action.player;
          }
          return p;
        }),
      });
    }
    case 'DECLARE_WINNER': {
      console.log('WINNER!: ', action.winner);
      return Object.assign({}, state, { winner: action.winner });
    }
    case 'ERROR': {
      console.log(action.msg);
      return Object.assign({}, state, { error: { msg: action.msg, player: action.player } });
    }
    default: return state;
  }
}
