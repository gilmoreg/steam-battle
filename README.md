# Steam Battle

A Thinkful React/Redux Capstone Project
by [Grayson Gilmore](https://github.com/gilmoreg/).

[See the live site here](https://gilmoreg.github.io/steam-battle/).

## Screenshots
![steam battle montage](https://cloud.githubusercontent.com/assets/18176333/24309924/c9490b84-109b-11e7-8f7a-4d2e4ee1b365.png)

## Summary
Enter two Steam IDs ([in any of the accepted formats](https://developer.valvesoftware.com/wiki/SteamID)) and see which gamer is more hardcore! Steam Battle will calculate a score based on the number of games owned and hours played; time played in the last two weeks counts for double!

Steam Battle will notify you as you type whether you've got a valid Steam ID. It will not display users who have set their privacy options to hide their games and playtime information.

If you don't know any Steam users you can just hit Random to see a battle between two random players!

## Technical
* This is a React/Redux client-side app.
* Uses Thunk middleware to handle async actions.
* Uses React Router hash history for client side routing.
* Calls to the Steam API are relayed through Google Cloud Functions ([steam-battle-serverless](https://github.com/gilmoreg/steam-battle-serverless)) to avoid CORS issues and optimize data for use by the client.
* Components, actions, and reducers are tested via Mocha, Chai, and enzyme.

### Dependencies
 * [axios](https://www.npmjs.com/package/axios) for AJAX requests.
 * [moxios](https://github.com/mzabriskie/moxios) for mocking axios calls in tests.
 * [lodash debounce](https://www.npmjs.com/package/lodash.debounce) to debounce calls to the API when checking for valid IDs.

