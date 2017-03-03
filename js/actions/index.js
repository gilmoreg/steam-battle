import store from '../store';

export const FILL_PROFILE = 'FILL_PROFILE';
export const fillProfile = (player, profile) => ({
    type: FILL_PROFILE,
    player,
    profile
});

export const SET_SCORE = 'SET_SCORE';
export const setScore = (player, score) => ({
    type: SET_SCORE,
    player,
    score
});

export const DECLARE_WINNER = 'DECLARE_WINNER';
export const showWinner = winner => ({
    type: SHOW_WINNER,
    winner
});

/*

All sorts of calls go in here
Plus the form submit and random

Big deal here is: an action doesn't have to return something to a reducer, but if not it must dispatch another action that does

Other kinds of calls to verify/convert Steam IDs
Those would seem to go on the component though, since they don't have to modify state?
Makes those components hard to test, but that might not be decisive
*/
