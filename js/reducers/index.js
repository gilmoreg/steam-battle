const initialRepositoryState = {
  players: [{}, {}],
  winner: null,
  error: null,
};

export default function steamBattleReducer(state = initialRepositoryState, action) {
  switch (action.type) {
    case 'FILL_PROFILE': {
      return Object.assign({}, state, {
        players: state.players.map((p, index) => {
          if (action.player === index) {
            return {
              profile: action.profile,
              score: state.players[index].score,
            };
          }
          return p;
        }),
      });
    }
    case 'SET_SCORE': {
      return Object.assign({}, state, {
        players: state.players.map((p, index) => {
          if (action.player === index) {
            return {
              profile: state.players[index].profile,
              score: action.score,
            };
          }
          return p;
        }),
      });
    }
    case 'ERROR': {
      console.log(action.msg);
      return Object.assign({}, state, { error: action.msg });
    }
    default: return state;
  }
}
