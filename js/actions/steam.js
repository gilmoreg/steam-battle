const STEAM_API_KEY='2917D94AAC5A277FACFECDCA153702E5';

export const SET_STEAM_ID = 'SET_STEAM_ID';
export const setSteamID = (player, id) => ({
    type: SET_STEAM_ID,
    player,
    id
});

export const STEAM_ERROR = 'STEAM_ERROR';
export const steamError = error => ({
    type: STEAM_ERROR,
    error
});