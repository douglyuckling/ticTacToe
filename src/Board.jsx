import React from 'react'
import BoardSquare from './BoardSquare'

class Board extends React.Component {
    render() {
        const { boardSize, squares, winningLine, placeGamepiece } = this.props;

        let rows = [];
        for (let row = 0; row < boardSize; row++) {
            let cols = [];
            for (let col = 0; col < boardSize; col++) {
                let i = row * boardSize + col;
                cols.push(
                    <BoardSquare
                        key={i}
                        i={i}
                        squares={squares}
                        placeGamepiece={(droppedGamepieceValue) => placeGamepiece(i, droppedGamepieceValue)}
                        winningLine={winningLine}
                    />
                );
            }
            rows.push(<div key={row} className="board-row">{cols}</div>)
        }

        return (
            <div className="game-board">
                {rows}
            </div>
        );
    }
}

export default Board;
