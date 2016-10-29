import React from 'react'
import DraggableGamepiece from './DraggableGamepiece'

function GamepieceTray(props) {
    const gamepieces = props.players.map(player => {
        const draggable = player === props.nextPlayer;
        return (
            <DraggableGamepiece key={player} value={player} draggable={draggable} />
        );
    });

    return (
        <div className="gamepiece-tray">
            {gamepieces}
        </div>
    );
}

export default GamepieceTray;
