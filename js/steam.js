import axios from 'axios';

const ENDPOINT = 'https://us-central1-steam-battle-serverless.cloudfunctions.net';

const steamIDs = [
  '76561198004854956',
  '76561198006920295',
  '76561197960710573',
  '76561197991348083',
  '76561197988627193',
  '76561198031554200',
  '76561197989744167',
  '76561198014932880',
  '76561198036976622',
  '76561198057326246',
  '76561198191467981',
  '76561197986603983',
  '76561197982003783',
  '76561198066084037',
  '76561198056603660',
];

/**
 * Get two random Steam IDs
 */
const getRandomIDs = () => {
  const id1 = Math.floor(Math.random() * steamIDs.length);
  let id2;
  do {
    id2 = Math.floor(Math.random() * steamIDs.length);
  } while (id1 === id2);
  return [steamIDs[id1], steamIDs[id2]];
};

/**
 * Test the validity of a Steam ID via the API
 * @param {string} id
 */
const checkID = id =>
  new Promise((resolve, reject) => {
    const url = `${ENDPOINT}/checkid?id=${id}`;
    axios(url)
      .then((player) => {
        if (player && player.data && player.data.id && player.data.profile) {
          resolve({ id: player.data.id, profile: player.data.profile });
        } else reject(`${id} does not appear to be a valid Steam ID.`);
      })
      .catch(() => reject(`${id} does not appear to be a valid Steam ID.`));
  });

/**
 * Get a player object from the API for the given id
 * @param {string} id
 */
const getPlayer = id =>
  new Promise((resolve, reject) => {
    const url = `${ENDPOINT}/player?id=${id}`;
    axios(url)
      .then((player) => {
        if (player && player.data && player.data.player) resolve(player.data.player);
        else reject(`${id} does not appear to be a valid Steam ID.`);
      })
      .catch(() => reject(`${id} does not appear to be a valid Steam ID.`));
  });

export { getRandomIDs, checkID, getPlayer };
