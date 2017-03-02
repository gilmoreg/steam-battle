const SteamID = require('steamid');
const STEAM_API_KEY='2917D94AAC5A277FACFECDCA153702E5';

var httprequest;
function makeRequest(url) {
    httprequest = new XMLHttpRequest();
    httprequest.onreadystatechange = done;
    httprequest.open('GET',url);
    httprequest.send();
}

function done() {
    if (httprequest.readyState === XMLHttpRequest.DONE) {
        console.log(httprequest);
        debugger;
    }
}

const getIdFromVanity = vanity => {
    const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=${vanity}`;
    // Using CORS
    const options = {
        method: 'GET',
        mode: 'cors',
        //headers: headers,
        credentials: 'include'
    }

    makeRequest(url);
    /*
    return fetch(url,options).then(response => {
        console.log('getIdFromVanity',response)
        debugger;
        if(response.response.steamid) return response.response.steamid;
        else {
            console.log('getIdFromVanity error: invalid response');
            return null;
        }
    })
    .catch(error => {
        console.log('getIdFromVanity error:',error);
        return null;
    });*/
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