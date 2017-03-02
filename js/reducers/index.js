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
            
            //Object.assign({},state,
               /* {}) players: state.players.map(p => {
                    console.log('players',p);
                    if(p.steamid===action.data.steamid) return p;
                    return {
                        steamid:action.data.steamid,
                        personaname:action.data.personaname,
                        profileurl:action.data.profileurl,
                        avatarfull:action.data.avatarfull
                    }
                }) */
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