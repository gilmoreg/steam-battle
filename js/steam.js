const SteamID = require('steamid');
import axios from 'axios';
const baseAPIUrl = 'https://protected-dusk-95868.herokuapp.com';

const getIdFromVanity = vanity => {
    const url = `${baseAPIUrl}/vanity/${vanity}`;

    return axios(url).then(response => {
        if(response.data) return response.data.steamid;
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

// TODO some code duplication going on here
// When I tried to get separation though it didn't seem to work - still had to have all the Promise/then/catch
const getOwnedGames = id => {
    return new Promise((resolve,reject) => {
        const url = `${baseAPIUrl}/owned/${id}`;
        axios(url).then(response => {
            if(response.data) resolve(response.data.games);
            else reject('Invalid response from API');
        })
        .catch(error => { reject(`getOwnedGames error: ${error}`) } );
    });
}

const getPlayerAchievements = (id, game) => {
    return new Promise((resolve, reject) => {
        const url = `${baseAPIUrl}/playerachievements/${id}/${game}`;
        axios(url).then(response => {
            if(response.data) resolve(response.data.achievements);
            else reject('Invalid response from API');
        })
        .catch(error => { reject(`getPlayerAchievements error: ${error}`) } );
    })
}

const score = player => {
    // Formula:
    // 1 point per game owned
    // 1 point per hour played - counts double if played in the last two weeks
    //      might need to adjust
    // 1 point per achievement
    return player.owned + Number.parseInt(player.playtime/60) + Number.parseInt(player.recent/60) + player.achievements;
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

export const getPlayerProfile = id => { // todo rename to Profile
    return new Promise((resolve,reject) => {
        const url = `${baseAPIUrl}/player/${id}`;
        axios(url).then(response => {
            if(response.data) resolve(response.data.player[0]);
            else reject('Invalid response from API');
        })
        .catch(error => { reject(`getPlayerData error: ${error}`) } );
    });
}

export const calculateScore = id => {
    let player = { 
        id: id, 
        owned: 0, 
        playtime: 0, 
        recent: 0,
        achievements: 0,
        total: 0
    };
    return new Promise((resolve,reject) => {
        getOwnedGames(id)
            .then(games => {
                // First score: # of games owned (will count games bought but not played)
                player.owned = games.length;
                games.forEach(game => { 
                    // Add game time and achievements to player if they've actually played it
                    if(game.playtime_forever>0) {
                        // Second score: # of minutes played
                        player.playtime += game.playtime_forever;
                        // Third score: # of minutes played in last two weeks
                        if(game.playtime_2weeks) player.recent += game.playtime_2weeks;

                        getPlayerAchievements(id,game.appid)
                            .then(achievements => {
                                // Fourth score: number of achievements
                                if(achievements) player.achievements += achievements;
                                // Calculate and return score
                                player.total = score(player);
                                resolve(player);
                            })
                            .catch(err => reject(err));
                    }
                });
            })
            .catch(err => reject(err));            
    })
}