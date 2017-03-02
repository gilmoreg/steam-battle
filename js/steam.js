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


export const getOwnedGames = id => {
    return new Promise((resolve,reject) => {
        const url = `${baseAPIUrl}/owned/${id}`;
        axios(url).then(response => {
            if(response.data) resolve(response.data);
            else reject('Invalid response from API');
        })
        .catch(error => { reject(`getOwnedGames error: ${error}`) } );
    });
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