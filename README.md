# Steam Battle

A Thinkful React/Redux Capstone Project
by [Grayson Gilmore](https://github.com/gilmoreg/).

[See the live site here](https://gilmoreg.github.io/steam-battle/).

## Screenshots


## Summary
Enter two Steam IDs ([in any of the accepted formats](https://developer.valvesoftware.com/wiki/SteamID)) and see which gamer is more hardcore! Steam Battle will calculate a score based on the number of games owned and hours played; time played in the last two weeks counts for double!

Steam Battle will notify you as you type whether you've got a valid Steam ID. It will not display users who have set their privacy options to hide their games and playtime information.

If you don't know any Steam users you can just hit Random to see a battle between two random players!

## Technical
* This is a React/Redux client-side app.
* Calls to the Steam API are relayed through a Node/Express server running [steam-battle-api](https://github.com/gilmoreg/steam-battle-api) to avoid CORS issues.
* Components, actions, and reducers are tested via Mocha, Chai, and enzyme.

### Dependencies
 * [axios](https://www.npmjs.com/package/axios) for AJAX requests.
 * [moxios](https://github.com/mzabriskie/moxios) for mocking axios calls in tests.

