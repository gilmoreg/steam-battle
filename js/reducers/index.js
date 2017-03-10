const initialState = {
  players: [{}, {}],
  winner: null,
};

export default function steamBattleReducer(state = initialState, action) {
  switch (action.type) {
    case 'CLEAR_STATE': {
      return initialState;
    }
    case 'FILL_ID': {
      return Object.assign({}, state, {
        players: state.players.map((p, index) => {
          if (action.player === index) {
            return Object.assign({}, p, { id: action.id });
          }
          return p;
        }),
      });
    }
    case 'FILL_PLAYER': {
      return Object.assign({}, state, {
        players: state.players.map((p, index) => {
          if (action.player === index) {
            return action.data;
          }
          return p;
        }),
      });
    }
    case 'DECLARE_WINNER': {
      return Object.assign({}, state, { winner: action.winner });
    }
    case 'ERROR': {
      return Object.assign({}, state, {
        players: state.players.map((p, index) => {
          if (action.player === index) {
            return Object.assign({}, p, { error: action.msg });
          }
          return p;
        }),
      });
    }
    default: {
      return state;
    }
  }
}
