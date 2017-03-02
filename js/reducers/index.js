import * as actions from '../actions/index';

const initialRepositoryState = {
    players: [],
    winner: null
};

export const steamBattleReducer = (state=initialRepositoryState, action) => {
    switch(action.type) {
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