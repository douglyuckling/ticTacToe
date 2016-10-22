import React from 'react'
import ReactDOM from 'react-dom'

const players = ['X', 'O'];
const boardSize = 3;

function Square(props) {
    const classes = ['square'];
    if (props.winningIndex >= 0) {
        classes.push('partOfWin');
    }
    return (
        <button className={classes.join(' ')} onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(row, col) {
        const i = row * boardSize + col;
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
        for (let row = 0; row < boardSize; row++) {
            let cols = [];
            for (let col = 0; col < boardSize; col++) {
                cols.push(this.renderSquare(row, col));
            }
            rows.push(<div key={row} className="board-row">{cols}</div>)
        }

        return <div>{rows}</div>;
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
        };
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = `Winner: ${winner.who}`
        } else {
            status = `Next player: ${players[this.state.stepNumber % players.length]}`;
        }

        const moves = history.map((step, move) => {
            const desc = move === 0 ? 'Game start' : `${step.who} at (${step.where % 3 + 1}, ${Math.floor(step.where / 3 + 1)})`;
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}
                           onClick={(i) => this.handleClick(i)}
                           winningLine={winner ? winner.line : []}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    handleClick(i) {
        var history = this.state.history.slice(0, this.state.stepNumber + 1);
        var current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const who = players[this.state.stepNumber % players.length];
        squares[i] = who
        this.setState({
            history: history.concat([{
                squares: squares,
                who: who,
                where: i,
            }]),
            stepNumber: history.length
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
        });
    }

}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('container')
);

function generateWinningLines() {
    const winningLines = [];
    var line;

    for (let row = 0; row < boardSize; row++) {
        line = [];
        for (let col = 0; col < boardSize; col++) {
            line.push(row * boardSize + col);
        }
        winningLines.push(line);
    }

    for (let col = 0; col < boardSize; col++) {
        line = [];
        for (let row = 0; row < boardSize; row++) {
            line.push(row * boardSize + col);
        }
        winningLines.push(line);
    }

    line = [];
    for (let row = 0; row < boardSize; row++) {
        let col = row;
        line.push(row * boardSize + col);
    }
    winningLines.push(line);

    line = [];
    for (let row = 0; row < boardSize; row++) {
        let col = boardSize - row - 1;
        line.push(row * boardSize + col);
    }
    winningLines.push(line);

    return winningLines;
}


function calculateWinner(squares) {
    const winningLines = generateWinningLines();
    console.log(winningLines);
    for (let i = 0; i < winningLines.length; i++) {
        const line = winningLines[i];
        if (squares[line[0]]) {
            let allSquaresInLineMatch = true;
            for (let j = 1; j < boardSize; j++) {
                if (squares[line[j]] !== squares[line[0]]) {
                    allSquaresInLineMatch = false;
                    break;
                }
            }
            if (allSquaresInLineMatch) {
                return {who: squares[line[0]], line: line};
            }
        }
    }
    return null;
}
