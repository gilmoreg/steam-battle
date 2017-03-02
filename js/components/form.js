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
        ReactDOM.findDOMNode(this.player2input).value = 'shoxieJESUS';
        this.beginBattle(e);
    }

    beginBattle(e) {
        if(e) e.preventDefault();
        // Need to validate input if this is called first
        const p1id = Steam.getSteamID(ReactDOM.findDOMNode(this.player1input).value);
        const p2id = Steam.getSteamID(ReactDOM.findDOMNode(this.player2input).value);
        
        // We have both ids, let's start the fight
        Promise.all([p1id,p2id]).then(ids => {
            let calls = [];
            Steam.getPlayerData(ids)
                .then(data => {
                    this.props.dispatch(actions.fillPlayers(data.players));
                    console.log('state players',this.props.players);
                })

            const player1Games = Steam.getOwnedGames(ids[0]);
            const player2Games = Steam.getOwnedGames(ids[1]);
            Promise.all([player1Games,player2Games])
                .then(data => {
                    console.log("data",data);
                })
                .catch(err => console.log(err));
            
        })
        .catch(err => {
            console.log('beginBattle Promise.all fail', err);
        })
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

const mapStateToProps = (state, props) => ({
    players: state.players
});

export default connect(mapStateToProps)(Form);

/*
player = {
    id,
    winloss,
    profile,
    persona,
    avatar,
    score {
        total,
        games,
        played,
        playtime,
        recent,
        achievements,
        rares,
        superrares
    }
}
 */