require('babel-polyfill');
import * as actions from '../actions/index';

const initialRepositoryState = {
    players: [ {}, {} ],
    winner: null
};

export const steamBattleReducer = (state=initialRepositoryState, action) => {
    switch(action.type) {
        case 'FILL_PROFILE': {
            return Object.assign({}, state, {
                players: state.players.map((p,index) => {
                    if(action.player===index) {
                        return {
                            profile: action.profile,
                            score: state.players[index].score
                        }
                    }
                    else return p;
                })
            });
        }
        case 'SET_SCORE': {
            return Object.assign({}, state, {
                players: state.players.map((p,index) => {
                    if(action.player===index) return {
                        profile: state.players[index].profile,
                        score: action.score
                    }
                    else return p;
                })
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