module.exports = {
  checkIdGoodResult: {
    steamid: '76561198007908897',
  },
  playerGoodResult: {

  },
  playerBadResult: {

  },
  ownedGames: {
    response: {
      game_count: 2,
      games: [
        {
          appid: 105600,
          playtime_2weeks: 1,
          playtime_forever: 4,
        },
        {
          appid: 282900,
          playtime_forever: 3472,
        },
      ] },
  },
  vanityGoodResponse: {
    response: {
      steamid: '76561198007908897',
      success: 1,
    },
  },
  vanityBadResponse: {
    response: {
      success: 42,
      message: 'No match',
    },
  },
  profileResponse: {
    response: {
      players: [
        {
          steamid: '0000',
          personaname: 'test',
          profileurl: 'test',
          avatarfull: 'test',
        },
      ],
    },
  },
};
