import React from 'react'
import Square from './Square'

class Board extends React.Component {
    renderSquare(row, col) {
        const i = row * this.props.boardSize + col;
        return (
            <Square value={this.props.squares[i]}
                    key={col}
                    onClick={() => this.props.onClick(i)}
                    winningIndex={this.props.winningLine.indexOf(i)}
            />
        );
    }

    render() {
        let rows = [];
        for (let row = 0; row < this.props.boardSize; row++) {
            let cols = [];
            for (let col = 0; col < this.props.boardSize; col++) {
                cols.push(this.renderSquare(row, col));
            }
            rows.push(<div key={row} className="board-row">{cols}</div>)
        }

        return <div>{rows}</div>;
    }
}

export default Board;
