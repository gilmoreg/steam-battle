import * as actions from '../actions/index';

const initialRepositoryState = {
    players: [],
    winner: null
};

export const steamBattleReducer = (state=initialRepositoryState, action) => {
    switch(action.type) {
        case SET_STEAM_ID: {
            // Find a better way
            let tempPlayers = state.players;
            tempPlayers[action.player].id = action.id;
            return Object.assign({}, state, { players: tempPlayers } );
        }
        case STEAM_ERROR: {
            console.log('STEAM_ERROR',action.error);
            return state;
        }
        default: return state;
    }
}

/**
player = {
    id,
    winloss,
    profile,
    persona,
    avatar,
    score {
        total,
        games,
        played,
        playtime,
        recent,
        achievements,
        rares,
        superrares
    }
}
 */