require('babel-polyfill');
import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import * as Steam from '../steam';
import * as actions from '../actions';

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.randomBattle = this.randomBattle.bind(this);
        this.beginBattle = this.beginBattle.bind(this);
    }

    randomBattle(e) {
        e.preventDefault();
        // Until I implement a random list to import
        ReactDOM.findDOMNode(this.player1input).value = 'solitethos';
        ReactDOM.findDOMNode(this.player2input).value = '76561198036993658';
        this.beginBattle(e);
    }

    beginBattle(e) {
        if(e) e.preventDefault();
        // Need to validate input if this is called first
        const p1id = Steam.getSteamID(ReactDOM.findDOMNode(this.player1input).value);
        const p2id = Steam.getSteamID(ReactDOM.findDOMNode(this.player2input).value);

        // We have both ids, let's start the fight
        Promise.all([p1id,p2id]).then(players => {
            players.forEach((id,index) => {
                Steam.getPlayerProfile(id)
                    .then(profile => {
                        this.props.dispatch(actions.fillProfile(index,profile));
                    })
                    .catch(err => console.log(err));
                Steam.calculateScore(id)
                    .then(score => {
                        this.props.dispatch(actions.setScore(index,score));
                    })
                    .catch(err => console.log(err));
            })
        })
        .catch(err => {
            console.log('beginBattle Promise.all fail', err);
        })
    }

    render() {
        return (
            <form>
                <div className="col-3">
                    <label htmlFor="player1-input">Player 1</label>
                    <input type="text" id="player1-input" ref={(input) => { this.player1input = input; }} />
                </div>
                <div className="col-3">
                    <label htmlFor="player2-input">Player 2</label>
                    <input type="text" id="player2-input" ref={(input) => { this.player2input = input; }} />
                </div>
                <div className="buttons col-12">
                    <button className="button" onClick={this.beginBattle}>Fight</button>
                    <button className="button" onClick={this.randomBattle}>Random</button>
                </div>
            </form>
        );
    } 
}
export default connect()(Form);