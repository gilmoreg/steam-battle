const initialState = {
  players: [{}, {}],
  winner: null,
};

export default function steamBattleReducer(state = initialState, action) {
  switch (action.type) {
    case 'CLEAR_STATE': {
      console.log('CLEAR_STATE');
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
    case 'CLEAR_ERROR': {
      return Object.assign({}, state, {
        players: state.players.map((p, index) => {
          if (action.player === index) {
            const player = Object.assign({}, p);
            delete player.error;
            return player;
          }
          return p;
        }),
      });
    }
    case 'DECLARE_WINNER': {
      return Object.assign({}, state, { winner: action.winner });
    }
    default: {
      return state;
    }
  }
}
