const SteamID = require('steamid');
import axios from 'axios';
const baseAPIUrl = 'https://protected-dusk-95868.herokuapp.com';

const getIdFromVanity = vanity => {
    const url = `${baseAPIUrl}/vanity/${vanity}`;

    return axios(url).then(response => {
        if(response.data) {
            return response.data.steamid;
        }
        else {
            console.log('getIdFromVanity error: invalid response');
            return null;
        }
    })
    .catch(error => {
        console.log('getIdFromVanity error:',error);
        return null;
    });
}

export const getSteamID = id => {
    return new Promise((resolve,reject) => {
        try {
            const sid = new SteamID(id);
            resolve(sid.getSteamID64());
        }
        catch(error) {
            // If SteamID threw an error, this might be a vanity URL
            getIdFromVanity(id)
                .then(sid => resolve(sid))
                .catch(err => reject(`getSteamID ${error} ${err}`));
        }
    });
}

export const getPlayerData = ids => { // todo rename to Profile
    return new Promise((resolve,reject) => {
        if(ids.length<2) reject('Incorrect # of ids');
        const url = `${baseAPIUrl}/players/${ids[0]}/${ids[1]}`;
        axios(url).then(response => {
            if(response.data) resolve(response.data);
            else reject('Invalid response from API');
        })
        .catch(error => { reject(`getPlayerData error: ${error}`) } );
    });
}

// TODO some code duplication going on here
const getOwnedGames = id => {
    return new Promise((resolve,reject) => {
        const url = `${baseAPIUrl}/owned/${id}`;
        axios(url).then(response => {
            if(response.data) resolve(response.data);
            else reject('Invalid response from API');
        })
        .catch(error => { reject(`getOwnedGames error: ${error}`) } );
    });
}

const getGameAchievements = id => {
    return new Promise((resolve, reject) => {
        const url = `${baseAPIUrl}/gameachievements/${id}`;
        axios(url).then(response => {
            if(response.data) resolve(response.data);
            else reject('Invalid response from API');
        })
        .catch(error => { reject(`getGameAchievements error: ${error}`) } );
    })
}

export const calculateScore = ids => {
    let player1 = { games: [], owned: 0, playtime: 0, recent: 0 };
    let player2 = Object.assign({}, player1);
    let players = [ player1, player2 ];
    let games = [];

    return new Promise((resolve,reject) => {
        const player1Games = getOwnedGames(ids[0]);
        const player2Games = getOwnedGames(ids[1]);
        Promise.all([player1Games,player2Games])
            .then(data => {
                data.forEach((player,index) => {
                    // Our first score: # of games owned
                    players[index].owned = player.games.length;
                    player.games.forEach(game => {
                        // Add game to array if not exists
                        if(games.findIndex(g => { return g.id === game.appid; }) === -1) {
                            games.push({ id: game.appid} );
                        }
                        // Add game to player if they've actually played it
                        if(game.playtime_forever>0) {
                            players[index].games.push({game: game.appid}); 
                            // Second score: # of minutes played
                            players[index].playtime += game.playtime_forever;
                            // Third score: # of minutes played in last two weeks
                            if(game.playtime_2weeks) players[index].recent += game.playtime_2weeks;
                        }
                    });
                    //console.log('player',players[index]);
                })
                // Get achievements for all games
                let gameAchievements = [];
                games.forEach(game => {
                    game.achievements = [];
                    gameAchievements.push(getGameAchievements(game.id));
                });
                Promise.all(gameAchievements)
                    .then(achievements => {
                        achievements.forEach((a,index) => {
                            if(a.achievements.length>0) {
                                games[index].achievements.push(a.achievements);
                            }
                        })
                        console.log('games',games);
                        // We have games and their achievements; what next?
                        
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    })
}
 
// # of games won't count for much against a count of minutes; might have to use hours instead
            

/*
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