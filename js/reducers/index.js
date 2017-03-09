const initialState = {
  players: [{}, {}],
  winner: null,
};

export default function steamBattleReducer(state = initialState, action) {
  switch (action.type) {
    case 'FILL_ID': {
      return Object.assign({}, state, {
        players: state.players.map((p, index) => {
          if (action.player === index) {
            console.log('FILL_ID', action.player, action.id);
            return Object.assign({}, p, { id: action.id });
          }
          return p;
        }),
      });
    }
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
      return Object.assign({}, state, {
        players: state.players.map((p, index) => {
          if (action.player === index) {
            console.log('ERROR', action.player, action.msg);
            return Object.assign({}, p, { error: action.msg });
          }
          return p;
        }),
      });
    }
    default: return state;
  }
}
