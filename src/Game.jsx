import React from 'react'
import ReactDOM from 'react-dom'
import { DragDropContext } from 'react-dnd'
import { default as TouchBackend } from 'react-dnd-touch-backend';
import Board from './Board'
import GamepieceTray from './GamepieceTray'
import CustomDragLayer from './CustomDragLayer'

const players = ['X', 'O'];
const boardSize = 3

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
        const winner = this.calculateWinner(current.squares);
        var nextPlayer = this.getNextPlayer(this.state.stepNumber);

        let status;
        if (winner) {
            status = `Winner: ${winner.who}`;
            nextPlayer = null;
        } else {
            status = `Next player: ${nextPlayer}`;
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
                <CustomDragLayer />
                <div className="gameplay-area">
                    <h1>Tic-Tac-Toe</h1>
                    <Board squares={current.squares}
                           boardSize={boardSize}
                           placeGamepiece={(i, droppedGamepieceValue) => this.placeGamepiece(i, droppedGamepieceValue)}
                           winningLine={winner ? winner.line : []}
                    />
                    <GamepieceTray players={players} nextPlayer={nextPlayer} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    placeGamepiece(i, droppedGamepieceValue) {
        var history = this.state.history.slice(0, this.state.stepNumber + 1);
        var current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = droppedGamepieceValue
        this.setState({
            history: history.concat([{
                squares: squares,
                who: droppedGamepieceValue,
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

    getNextPlayer(stepNumber) {
        return players[stepNumber % players.length];
    }

    calculateWinner(squares) {
        const winningLines = Game.generateWinningLines(boardSize);
        for (let i = 0; i < winningLines.length; i++) {
            const line = winningLines[i];
            if (squares[line[0]]) {
                let allSquaresInLineMatch = true;
                for (let j = 1; j < line.length; j++) {
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

    static generateWinningLines(boardSize) {
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

}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Game);
