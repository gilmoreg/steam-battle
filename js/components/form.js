import React from 'react';
import ReactDOM from 'react-dom';
import * as Steam from '../steam';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.randomBattle = this.randomBattle.bind(this);
        this.beginBattle = this.beginBattle.bind(this);
    }

    randomBattle(e) {
        e.preventDefault();
        console.log('random battle time!');
        // Until I implement a random list to import
        ReactDOM.findDOMNode(this.player1input).value = 'solitethos';
        ReactDOM.findDOMNode(this.player2input).value = 'shoxieJESUS';
        this.beginBattle(e);
    }

    beginBattle(e) {
        if(e) e.preventDefault();
        console.log('fight!');
        Steam.getSteamID(ReactDOM.findDOMNode(this.player1input).value)
            .then(sid => console.log('player1',sid))
            .catch(err => console.log(err));
        Steam.getSteamID(ReactDOM.findDOMNode(this.player2input).value)
            .then(sid => console.log('player2',sid))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <form>
                <div className="col-3 blue">
                    <label htmlFor="player1-input">Player 1</label>
                    <input type="text" id="player1-input" ref={(input) => { this.player1input = input; }} />
                </div>
                <div className="col-3 blue">
                    <label htmlFor="player2-input">Player 2</label>
                    <input type="text" id="player2-input" ref={(input) => { this.player2input = input; }} />
                </div>
                <div className="buttons col-12">
                    <button type="submit" className="button">Fight</button>
                    <button className="button" onClick={this.randomBattle}>Random</button>
                </div>
            </form>
        );
    } 
}