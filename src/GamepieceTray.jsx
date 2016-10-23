import React from 'react'
import Gamepiece from './Gamepiece'

function GamepieceTray(props) {
    const gamepieces = props.players.map(player => {
        const draggable = player === props.nextPlayer;
        return (
            <Gamepiece key={player} value={player} draggable={draggable} />
        );
    });

    return (
        <div className="gamepiece-tray">
            {gamepieces}
        </div>
    );
}

export default GamepieceTray;
