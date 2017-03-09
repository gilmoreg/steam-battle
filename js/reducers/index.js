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
      console.log('WINNER!: ', action.winner);
      return Object.assign({}, state, { winner: action.winner });
    }
    case 'ERROR': {
      console.log('reducing error', action.msg);
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
    default: {
      console.log('No action type found.', action.type);
      return state;
    }
  }
}
