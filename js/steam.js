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

export const getPlayerData = ids => {
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

export const calculateScore = ids => {
    const player1Games = getOwnedGames(ids[0]);
    const player2Games = getOwnedGames(ids[1]);
    Promise.all([player1Games,player2Games])
        .then(data => {
            console.log("data",data);
            // Our first score: # of games owned
            players[0].owned = data[0].games.length;
            players[1].owned = data[1].games.length;
        })
        .catch(err => console.log(err));
}

 
            

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