import React from 'react';
import Square from './Square';
import { DRAG_TYPE as GAMEPIECE_DRAG_TYPE } from './Gamepiece';
import { DropTarget } from 'react-dnd';

const squareTarget = {
    canDrop(props, monitor) {
        const { i, squares } = props;
        return !squares[i];
    },

    drop(props, monitor) {
        props.placeGamepiece(monitor.getItem().value);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class BoardSquare extends React.Component {
    render() {
        const { i, squares, winningLine, children, connectDropTarget } = this.props;
        const value = squares[i];
        const partOfWin = winningLine.indexOf(i) >= 0;

        return connectDropTarget(
            <div className="board-square">
                <Square value={value} partOfWin={partOfWin} />
            </div>
        );
    }
}

export default DropTarget(GAMEPIECE_DRAG_TYPE, squareTarget, collect)(BoardSquare);
