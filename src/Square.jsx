import React from 'react'
import Gamepiece from './Gamepiece'

function Square(props) {
    const partOfWin = props.partOfWin ? 'partOfWin' : '';
    const gamepiece = props.value ? <Gamepiece value={props.value} /> : null;

    return (
        <div className={`square ${partOfWin}`}>
            {gamepiece}
        </div>
    );
}

export default Square;
