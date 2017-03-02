const SteamID = require('steamid');
import axios from 'axios';

const getIdFromVanity = vanity => {
    const url = `https://protected-dusk-95868.herokuapp.com/vanity/${vanity}`;

    return axios(url).then(response => {
        console.log('getIdFromVanity',response)
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