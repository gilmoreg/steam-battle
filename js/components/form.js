import React from 'react';

export default function Form(props) {
    return (
        <form action="/battle">
          <div className="col-3 blue">
            <label htmlFor="player1-input">Player 1</label>
            <input type="text" id="player1-input" />
          </div>
          <div className="col-3 blue">
            <label htmlFor="player2-input">Player 2</label>
            <input type="text" id="player2-input" />
          </div>
          <div className="buttons col-12">
            <button type="submit" className="button">Fight</button>
            <button className="button">Random</button>
          </div>
        </form>
    );
}