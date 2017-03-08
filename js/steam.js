import axios from 'axios';

const ENDPOINT = 'https://protected-dusk-95868.herokuapp.com';
// const ENDPOINT = 'http://localhost:9000';

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
];

const getRandomIDs = () => {
  const id1 = Math.floor(Math.random() * steamIDs.length);
  let id2;
  do {
    id2 = Math.floor(Math.random() * steamIDs.length);
  } while (id1 === id2);
  return [steamIDs[id1], steamIDs[id2]];
};

const checkID = id =>
  new Promise((resolve, reject) => {
    const url = `${ENDPOINT}/checkid/${id}`;
    axios(url)
      .then((sid) => {
        if (sid && sid.data && sid.data.steamid) resolve(sid.data.steamid);
        else reject('checkID: invalid response from API');
      })
      .catch(err => reject(err));
  });

const getPlayer = id =>
  new Promise((resolve, reject) => {
    const url = `${ENDPOINT}/player/${id}`;
    axios(url)
      .then((player) => {
        if (player && player.data && player.data.player) resolve(player.data.player);
        else reject('getPlayer: invalid response from API');
      })
      .catch(err => reject(err));
  });

export { getRandomIDs, checkID, getPlayer };
