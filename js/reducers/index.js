import * as actions from '../actions/index';

const initialRepositoryState = {
    players: [],
    winner: null
};

export const steamBattleReducer = (state=initialRepositoryState, action) => {
    switch(action.type) {
        case 'FILL_PLAYERS': {
            console.log('fillplayers',action);
            return Object.assign({},state, {
                players: [
                    action.data[0],
                    action.data[1]
                ]
            });
        }
        case 'SET_SCORE': {
            console.log('setscore',action);
            return Object.assign({},state, {
                players: [
                    action.data[0],
                    action.data[1]
                ]
            });
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