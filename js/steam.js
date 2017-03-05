import axios from 'axios';

const SteamID = require('steamid');

const baseAPIUrl = 'https://protected-dusk-95868.herokuapp.com';
// const baseAPIUrl = 'http://localhost:9000'

const getIdFromVanity = vanity =>
  new Promise((resolve, reject) => {
    const url = `${baseAPIUrl}/vanity/${vanity}`;
    axios(url).then((response) => {
      if (response.data) resolve(response.data.steamid);
      reject('getIdFromVanity error: invalid response');
    })
    .catch((error) => {
      reject(`getIdFromVanity error:, ${error}`);
    });
  });

const getOwnedGames = id =>
  new Promise((resolve, reject) => {
    const url = `${baseAPIUrl}/owned/${id}`;
    axios(url).then((response) => {
      if (response.data) resolve(response.data.games);
      else reject('Invalid response from API');
    })
    .catch((error) => { reject(`getOwnedGames error: ${error}`); });
  });

const getPlayerAchievements = (id, game) =>
  new Promise((resolve, reject) => {
    const url = `${baseAPIUrl}/playerachievements/${id}/${game}`;
    axios(url).then((response) => {
      if (response.data) resolve(response.data.achievements);
      else reject('Invalid response from API');
    })
    .catch((error) => { reject(`getPlayerAchievements error: ${error}`); });
  });

const score = player =>
    // Formula:
    // 1 point per game owned
    // 1 point per hour played - counts double if played in the last two weeks
    //      might need to adjust
    // 1 point per achievement
    player.owned + Number.parseInt(player.playtime / 60, 10) +
      Number.parseInt(player.recent / 60, 10) + player.achievements;

export const getPlayerProfile = id =>
  new Promise((resolve, reject) => {
    const url = `${baseAPIUrl}/player/${id}`;
    axios(url).then((response) => {
      if (response.data) resolve(response.data.player[0]);
      else reject('Invalid response from API');
    })
    .catch((error) => { reject(`getPlayerData error: ${error}`); });
  });

export const calculateScore = (id) => {
  const player = {
    id,
    owned: 0,
    playtime: 0,
    recent: 0,
    achievements: 0,
    total: 0,
  };
  const achievementPromises = [];
  return new Promise((resolve, reject) => {
    getOwnedGames(id)
        .then((games) => {
          // First score: # of games owned (will count games bought but not played)
          player.owned = games.length;
          games.forEach((game) => {
            // Add game time and achievements to player if they've actually played it
            if (game.playtime_forever > 0) {
              // Second score: # of minutes played
              player.playtime += game.playtime_forever;
              // Third score: # of minutes played in last two weeks
              if (game.playtime_2weeks) player.recent += game.playtime_2weeks;
              // Get all achievements
              achievementPromises.push(getPlayerAchievements(id, game.appid));
            }
          });
          Promise.all(achievementPromises)
            .then((achievements) => {
              if (achievements) {
                achievements.forEach((a) => {
                  if (a) player.achievements += a;
                });
              }
              // Calculate and return score
              player.total = score(player);
              resolve(player);
            })
          .catch(err => reject(err));
        })
        .catch(err => reject(err));
  });
};

export const getSteamID = id =>
    new Promise((resolve, reject) => {
      try {
        const sid = new SteamID(id);
        resolve(sid.getSteamID64());
      } catch (error) {
        // If SteamID threw an error, this might be a vanity URL
        getIdFromVanity(id)
            .then(sid => resolve(sid))
            .catch(err => reject(`getSteamID ${error} ${err}`));
      }
    });
